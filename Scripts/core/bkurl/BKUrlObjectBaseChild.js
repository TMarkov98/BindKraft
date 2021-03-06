/*
	An extension of the BKUrlObjectBase to cover the needs of a child/part - adds a parent property.
*/

function BKUrlObjectBaseChild() {
	BKUrlObjectBase.apply(this,arguments);
}
BKUrlObjectBaseChild.Inherit(BKUrlObjectBase,"BKUrlObjectBaseChild");
BKUrlObjectBaseChild.Implement(IBKUrlPart);
// IBKUrlPart
BKUrlObjectBaseChild.prototype.$parent = null;
BKUrlObjectBaseChild.prototype.get_parent = function() { 
	return this.$parent;
}
BKUrlObjectBaseChild.prototype.set_parent = function(v) { 
	if (v == null) {
		this.$parent = null;
		return true;
	} else {
		if (BaseObject.is(v,"IBKUrlObject")) {
			this.$parent = v;
			return true;
		} else {
			if (this.get_throwonerror()) {
				throw "The parent does not conform to the required type IBKUrlObject";
			}
			return false;
		}
	}
}