


function SimpleHintedSelectorControl() {
	Base.apply(this, arguments);
}
SimpleHintedSelectorControl.Inherit(Base, "SimpleHintedSelectorControl");
SimpleHintedSelectorControl.Implement(IHintedSelector);
SimpleHintedSelectorControl.Implement(IUIControl);
SimpleHintedSelectorControl.Implement(IPartnershipTarget);
SimpleHintedSelectorControl.ImplementIndexedProperty("items", new InitializeArray("Items"), null, "onItemsChanged");
SimpleHintedSelectorControl.ImplementProperty("eligibleitems", new InitializeArray("SelectedItems"), null, "onItemsChanged");
SimpleHintedSelectorControl.prototype.advisePartner = function(partner, prot1, prot2, prot3) {
	var i;
	if (partner != null) {
		for (i = 1; i < arguments.length; i++) {
			var p = arguments[i];
			if (p == "IKeyboardLogicalSource") {
				//partner.keydataevent.add(new Delegate(this,this.handleProcessKeyData));
			} else if (p == "IFilterDataSource") {
				partner.explicithintevent.add(new Delegate(this,this.handleProcessExplicitHintData));
				partner.implicithintevent.add(new Delegate(this,this.handleProcessImplicitHintData));
			} else if (p == "ISelectionConsumer") {
				this.selectionsuggestevent.add(new Delegate(partner, partner.handleSuggestSelection));
			}
		}
	}
}
SimpleHintedSelectorControl.prototype.onItemsChanged = function() {
	this.updateTargets();
}
SimpleHintedSelectorControl.prototype.internalSelectItem = function(sender, item) {
	if (item != null) {
		this.processExplicitHintData({defaultHint: item.id});
	}
}
SimpleHintedSelectorControl.prototype.processExplicitHintData = function(hint) {
	var filter = null;
	if (hint != null && hint.defaultHint != null) filter = hint.defaultHint;
	if (filter == null) {
		//this.fire
	} else {
		var items = this.get_items();
		if (items != null) {
			var matchedItem = items.FirstOrDefault(function(idx, itm) {
				if (itm != null) {
					for (var k in itm) {
						if (itm[k] == filter) return itm;
					}
				}
				return null;
			});
			if (matchedItem != null) {
				this.fireSelectionSuggestEvent(matchedItem);
			}
		} else {
			this.fireSelectionSuggestEvent(null);
		}
	}
}
SimpleHintedSelectorControl.prototype.processImplicitHintData = function(hint) {
	var filter = null;
	if (hint != null && hint.defaultHint != null) filter = hint.defaultHint;
	if (filter == null) {
		//this.fire
	} else {
		var items = this.get_items();
		if (items != null) {
			var matchedItem = items.Select(function(idx, itm) {
				if (itm != null) {
					for (var k in itm) {
						if (itm[k] == filter || (itm[k] != null && (itm[k] + "").indexOf(filter) == 0) ) return itm;
					}
				}
				return null;
			});
			if (matchedItem != null) {
				this.set_eligibleitems(matchedItem);
			}
		} else {
			this.set_eligibleitems(null);
		}
	}
}