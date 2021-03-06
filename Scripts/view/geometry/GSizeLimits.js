(function() {

    var GSize = Class("GSize"),
        IGSize = Interface("IGSize"),
        IGPoint = Interface("IGPoint");

    /**
     * GSizeLimits(GSize,GSize)
     * GSizeLimits(number,number,number,number)
     * 
     * 
     */
    function GSizeLimits(a, b,/*optional*/ c, d) {
        var sizeset = false;
        //GSize.apply(this,arguments);
        if (BaseObject.is(a,"IGSize")) {
            if (BaseObject.is(a,"IGSize")) {
                sizeset = true;
                GSize.call(this, a.w,a.h);
                this.set_minsize(b);
            }
            if (BaseObject.is(b,"IGSize")) {
                if (!sizeset) {
                    sizeset = true;
                    GSize.call(this, b.w,b.h);
                }
                this.set_maxsize(b);
            }
            if (!sizeset) GSize.call(this, 0,0);
        } else if (typeof a == "number" && typeof b == "number") {
            GSize.call(this, a,b);
            this.set_minsize(c);
            this.set_maxsize(d);
        } else {
            GSize.apply(this, arguments); // We use FATE algorithm :P
        }
    }
    GSizeLimits.Inherit(GSize,"GSizeLimits");
    GSizeLimits.Implement(IObjectifiable);
    GSizeLimits.prototype.objectifyInstance = function() {
        var o = {
            $__className: "GSizeLimits",
            minsize: IObjectifiable.objectify(this.get_minsize()),
            maxsize: IObjectifiable.objectify(this.get_maxsize())
        }
        IObjectifiable.objectifyToAs(o, this, "GSize");
        return o;
    }
    GSizeLimits.prototype.individualizeInstance = function(v) {
        if (v != null && typeof v == "object" && this.is("GSizeLimits")) {
            Size.prototype.individualizeInstance.call(this,v);
            this.set_minsize(IObjectifiable.instantiate(v.minsize));
            this.set_maxsize(IObjectifiable.instantiate(v.maxsize));
        }
    }
    GSizeLimits.prototype.get_hasminsize = function() {
        return (BaseObject.is(this.$minsize, "IGSize") && this.$minsize.get_isvalid());
    }
    GSizeLimits.prototype.get_hasmaxsize = function() {
        return (BaseObject.is(this.$maxsize, "IGSize") && this.$maxsize.get_isvalid());
    }
    GSizeLimits.prototype.$maxsize = null;
    GSizeLimits.prototype.$minsize = null;
    GSizeLimits.prototype.get_maxsize = function() {
        if (BaseObject.is(this.$maxsize,"IGSize")) {
            return new GSize(this.$maxsize);
        } else {
            return new GSize(this);
        }
    }
    GSizeLimits.prototype.set_maxsize = function(v) {
        if (v == null) {
            this.$maxsize = null;
            return;
        }
        if (BaseObject.is(v,"IGSize") || BaseObject.is(v,"IGPoint") || BaseObject.is(v,"IGRect") || BaseObject.is(v,"object")) {
            this.$maxsize = new GSize(v);
        } else {
            throw "Unsupported type";
        }
    }
    GSizeLimits.prototype.get_minsize = function() {
        if (BaseObject.is(this.$minsize,"IGSize")) {
            return new GSize(this.$minsize);
        } else {
            return new Size(this);
        }
    }
    GSizeLimits.prototype.set_minsize = function(v) {
        if (v == null) {
            this.$minsize = null;
            return;
        }
        if (BaseObject.is(v,"IGSize") || BaseObject.is(v,"IGPoint") || BaseObject.is(v,"IGRect") || BaseObject.is(v,"object")) {
            this.$minsize = new GSize(v);
        } else {
            throw "Unsupported type";
        }
    }
    


})();