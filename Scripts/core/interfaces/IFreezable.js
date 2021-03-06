/*
	TODO: For the moment the functionality is duplicated in IFreezableImpl. All usages should be audited and chaned to implementation
		and then interface cleaned up.

*/


/*INTERFACE*/
function IFreezable() {}
IFreezable.Interface("IFreezable");
IFreezable.prototype.$frozeEvents = false;
IFreezable.prototype.areEventsFrozen = function () {
    return this.$frozeEvents; 
};
IFreezable.prototype.get_freezeevents = function(){ return this.$frozeEvents; }
IFreezable.prototype.set_freezeevents = function(v) { this.$frozeEvents = v; }
IFreezable.prototype.freezeEvents = function (obj, func) {
    var oldFroze = this.$frozeEvents;
    this.$frozeEvents = true;
	var result;
	if (BaseObject.is(func, "IInvocationWithArrayArgs")) {
		result = BaseObject.applyCalback(func, Array.createCopyOf(arguments,2));
	} else if (typeof func == "function") {
        result = func.apply(obj, Array.createCopyOf(arguments,2));
    }
    this.$frozeEvents = oldFroze;
	return result;
};
IFreezable.prototype.freezeEventsApply = function (obj, func, args) {
    var oldFroze = this.$frozeEvents;
    this.$frozeEvents = true;
	var result;
	if (BaseObject.is(func, "IInvocationWithArrayArgs")) {
		result = BaseObject.applyCalback(func, args);
	} else if (typeof func == "function") {
        result = func.apply(obj, args);
    }
    this.$frozeEvents = oldFroze;
	return result;
};