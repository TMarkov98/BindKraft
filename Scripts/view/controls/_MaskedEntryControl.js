


// Unfinished!

/*CLASS*/
function MaskedEntryControl() {
	Base.apply(this, arguments);
}
MaskedEntryControl.Inherit(Base, "MaskedEntryControl");
MaskedEntryControl.Implement(IUIControl);
MaskedEntryControl.Implement(ITemplateSource);
MaskedEntryControl.Implement(IItemTemplateSource);
MaskedEntryControl.ImplementProperty("selectedclass",new InitializeStringParameter("CSS class for active element", "selected"));
MaskedEntryControl.ImplementProperty("nonselectedclass",new InitializeStringParameter("CSS class for active element", "nonselected"));
MaskedEntryControl.ImplementProperty("templateName", new InitializeStringParameter("selector for the default outer frame template", null));
MaskedEntryControl.ImplementProperty("itemTemplateName", new InitializeStringParameter("selector for the default item template", null));
MaskedEntryControl.ImplementProperty("partDelimiter", new InitializeStringParameter("Invisible character that splits the psitions into groups. Excaped by doubling.", "|"));
MaskedEntryControl.ImplementProperty("elementdesigner", new Initialize("A callback to apply design to an item's DOM", null));
MaskedEntryControl.prototype.$maskTranslation = new InitializeCloneObject("Masks meaning",{
	"#": { pattern: "\d", predicate: null},
	"_": { pattern: "[\w]", predicate: null},
	".": { pattern: ".", predicate: null },
	"@": { pattern: "[a-zA-Z]", predicate: null}
});
MaskedEntryControl.prototype.defaultElementDesigner = function(el,item) {
}
MaskedEntryControl.prototype.$elementDesigner = function(el, item) {
	var ed = this.get_elementdesigner();
	if (ed == null) {
		return this.defaultElementDesigner(el, item);
	} else if (BaseObject.is(ed, "Delegate")) {
		return ed.invoke(el,item);
	} else {
		return ed.call(this, el, item);
	}
}

MaskedEntryControl.prototype.get_template = function() {
	if (this.root != null) {
		return this.root.jboundTemplate;
	}
	return null;
}.Description("The template of the container for the control. It must contain an element with data-key 'items' where the items will be rendered.");
MaskedEntryControl.prototype.set_template = function(v) {
	if (this.root != null) {
		this.jboundTemplate = v;
	}
}.Description("The template of the container for the control. It must contain an element with data-key 'items' where the items will be rendered.");
MaskedEntryControl.prototype.get_itemTemplate = function(n) {
	if (n == null) return this.root.jboundItemTemplate;
	return null;
}.Description( "Gets the template" )
 .Returns("string or null");
MaskedEntryControl.prototype.set_itemTemplate = function(v) {
	if (arguments.length > 1) {
		if (arguments[0] == null) {
			this.root.jboundItemTemplate = arguments[1];
		}
	} else {
		this.root.jboundItemTemplate = v;
	}
}.Description( "Sets the template" )
 .Param("v","Template class ( html class ) ");
// Slots
MaskedEntryControl.prototype.$itemContainer = null;
MaskedEntryControl.prototype.$init = function() {
	var el = $(this.root);
    var tmlName = this.get_itemTemplateName();
    var tml = (tmlName != null)?$(tmlName):null;
    var tmlLocal = $(this.root).children();
	// This if looks crazy - check and correct it
    if (tmlLocal.length > 0) {
		this.set_itemTemplate(tmlLocal.clone());
	} else if (tml != null && tml.length > 0) {
		this.set_itemTemplate(tml.children().clone());
	} else { // Internal hardcoded defaultStatus
		this.set_itemTemplate($('<span display="inline-block" data-bind-text="{read}"></span>'));
	}
	el.empty();
	// Deal with any static template for the internals (optional - needed if you need more than just a wraper for items).
	tmlName = this.get_templateName();
	tml = (tmlName != null)?$(tmlName):null;
	if (tml != null && tml.length > 0) {
		// We have a template - clone and append it. Then record the location of the items container.
		el.append(tml.children().clone());
		this.$itemContainer = this.child("items");
		if (this.$itemContainer == null || this.$itemContainer.length == 0) {
			// Discard the template if there is no items data-key in it.
			el.empty();
			this.$itemContainer = el; 
		}
	} else {
		// Not template - use the element on which we live as items container.
		this.$itemContainer = el; 
	}
	
	Base.prototype.$init.apply(this, arguments);
}

MaskedEntryControl.prototype.$processMask = function() { // Recreates the control content to reflect the mask.
	this.$itemContainer.Empty();
	if (this.$valueModel != null && this.$valueModel.length > 0) {
		for (var k = 0; k < this.$valueModel.length; k++) {
			if (this.$valueModel[k] != null && this.$valueModel[k].element != null) {
				this.$valueModel[k].Clear();
			}
		}
	}
	this.$valueModel = [];
	var c, d = this.get_partDelimiter();
	var o,bGroupEnd = false;
	if (this.$mask != null && this.$mask.length > 0) {
		for (var i = 0; i < this.$mask.length; i++) {
			c = this.$mask.charAt(i);
			if (c == d) {
				bGroupEnd = true;
				if (i < this.$mask.length - 1) {
					if (this.$mask.charAt(i + 1) == d) {
						// Escape char;
						i++;
						bGroupEnd = false;
					}
				}
			}
			// Process c
			o = {
				mask: c,
				value: null, // the typed char fits here
				writable: true
			};
			if (this.$maskTranslation[c] != null) {
				o.rules = this.$maskTranslation[c];
			} else {
				o.writable = false;
			}
			this.$valueModel.push(o);
			if (bGroupEnd) {
				// TODO: Record the group boundaries
				bGroupEnd = false;
			}
		}
	}
	this.$createChildren();
	this.rebind();
	this.updateTargets();
}
MaskedEntryControl.prototype.$mask = null;

MaskedEntryControl.prototype.get_mask = function() {
	return this.$mask;
}
MaskedEntryControl.prototype.set_mask = function(v) {
	this.$mask = v;
	this.processMask();
}
MaskedEntryControl.prototype.$value = null;
MaskedEntryControl.prototype.$valueModel = null; // contains the view model to which the view is actually bound.
MaskedEntryControl.prototype.get_viewmodel = function() {
	return this.$valueModel;
}
MaskedEntryControl.prototype.get_value = function() {
	return this.$value;
}
MaskedEntryControl.prototype.set_value = function(v) {
	this.$value = v;
}
MaskedEntryControl.prototype.$createChildren = function() {
	var tml = $(this.get_itemTemplate());
	if (tml.length > 0) {
		var el = $(this.$itemContainer);
		el.Empty();
		if (this.$valueModel != null && this.$valueModel.length > 0) {
			for (var i = 0; i < this.$valueModel.length; i++) {
				var model = this.$valueModel[i];
				model.element = ViewBase.cloneTemplate(el, tml); 
			}
		}
		
	}
}