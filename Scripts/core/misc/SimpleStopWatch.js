(function() {

    // Imports
    var BaseObject = Class("BaseObject"), 
        InitializeEvent = Class("InitializeEvent");

/**
 * 
 */

function SimpleStopWatch() {
	BaseObject.apply(this,arguments);
}
SimpleStopWatch.Inherit(BaseObject,"SimpleStopWatch");

SimpleStopWatch.prototype.$marker = null;
SimpleStopWatch.prototype.$interval = null;
SimpleStopWatch.prototype.$measure = null;
SimpleStopWatch.prototype.$useevents = null;

// Interval id used for setTimeout
SimpleStopWatch.prototype.$timeoutId = null;


// Events
SimpleStopWatch.prototype.intervalexpiredevent = new InitializeEvent("If requested fires when measured interval expires. Would not fire if the interval is stopped. Handle intervalstoppedevent if want tobe sure you will receive event no matter what happens.");
SimpleStopWatch.prototype.intervalstoppedevent = new InitializeEvent("Interval has been stopped or expired. It cannot be used as interval expiration tool anymore");
SimpleStopWatch.prototype.intervalstartedevent = new InitializeEvent("A new interval measurement has been started andevents are requested.");
SimpleStopWatch.prototype.get_date = function() {
	return new Date();
}
SimpleStopWatch.prototype.get_milliseconds = function() {
}
SimpleStopWatch.prototype.clearInterval = function() {
	this.$marker = null;
	this.$interval = null;
	this.$useevents = null;
    this.$measure = null;
    if (this.$timeoutId != null) {
        clearTimeout(this.$timeoutId);
    }
}
SimpleStopWatch.prototype.intervalActive = function() {
	if (this.$interval != null && this.$marker != null) return true;
	return false;
}
SimpleStopWatch.prototype.$expireInterval = new InitializeMethodCallback("Handle mouse movements on the body","handleExpireInterval");
SimpleStopWatch.prototype.handleExpireInterval = function() {
    if (this.intervalActive()) {
        this.$timeoutId = null;
        if (!this.intervalExpired()) {
            var m = (new Date()).getTime();
            var tm = (this.$marker + this.$interval) - m;
            if (tm > 0) {
                this.$timeoutId = setTimeout(this.$expireInterval, tm);
            } else {
                // Expire it anyway
                this.intervalexpiredevent.invoke(this, null);
            }
        } else {
            this.intervalexpiredevent.invoke(this, null);
        }
    }
}

SimpleStopWatch.prototype.startInterval = function(interval, withevents) {
    if (typeof interval == "number" && interval >= 0) {
        this.clearInterval();
        var dt = new Date();
        this.$useevents = withevents
        this.$marker = dt.getTime();
        this.$interval = interval;
        if (this.$useevents) {
            this.$timeoutId =  setTimeout(this.$expireInterval, interval);
            this.intervalstartedevent.invoke(this, null);
        }
    }
}
SimpleStopWatch.prototype.stopInterval = function() {
    if (this.$timeoutId != null) {
        // This can happen only if useevents is true - so we fire an event
        clearTimeout(this.$timeoutId);
        this.intervalstoppedevent(this, null);
    }
    this.$timeoutId = null;
    
    this.clearInterval();
}
SimpleStopWatch.prototype.measure = function() {
	if (this.intervalActive()) {
		this.$measure = (new Date()).getTime() - this.$marker;
		return this.$measure;
	} else {
		return null;
	}
}
SimpleStopWatch.prototype.intervalExpired = function() {
	if (this.intervalActive()) {
		var m = (new Date()).getTime();
		if (m > this.$marker + this.$interval) return true;
		return false;
	} else {
		return null;
	}
}.Returns("null, true, false where null means no interval is set, true - expired, false - still not exired.");

})();