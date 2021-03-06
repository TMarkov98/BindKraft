

(function() {

    var GestureTaskBase = Class("GestureTaskBase");

    function AggregateGestureTask(tasks) {
        GestureTaskBase.apply(this, arguments);
        for (var i = 0; i < arguments.length; i++) {
            var t = arguments[i];
            if (BaseObject.is(t, "GestureTaskBase")) {
                this.$tasks.push(t);
            }
        }
    }
    AggregateGestureTask.Inherit(GestureTaskBase, "AggregateGestureTask");
    AggregateGestureTask.prototype.$tasks = new InitializeArray("The configured tasks");
    AggregateGestureTask.prototype.suggestCursor = function(pt) {
        var c = null;
        for (var i = 0; i < this.$tasks.length; i++) {
            c = this.$tasks[i].suggestCursor(pt);
            if (c != null) return c;
        }
        return c;
    }
    AggregateGestureTask.prototype.applyAt = function(pt) {
        var rop = new Operation();
        var op = new OperationAll(false, 30000);
        for (var i = 0; i < this.$tasks.length; i++) {
            op.attach(this.$tasks[i].applyAt(pt));
        }
        op.then( function(o) {
            var s = o.get_successful();
            if (s.length > 0) {
                rop.CompleteOperation(true, s[0].getOperationResult());
            } else {
                rop.CompleteOperation(false, "unrecognized");
            }
        });
        op.syncSeal();
        return rop;
    }


})();