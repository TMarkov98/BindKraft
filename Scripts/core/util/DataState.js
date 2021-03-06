(function() {

    var IDataStateManager = Interface("IDataStateManager");

    function DataState() {
        throw "DataState is a static class and cannot be instantiated.";
    }
    DataState.Inherit(BaseObject,"DataState");

    DataState.markDataState = function (el, bDelete, bUnDelete) {
        if (BaseObject.is(el, "Array")) {
            for (var i = 0; i < el.length; this.markDataState(el[i++], bDelete, bUnDelete));
            return;
        }
        if (el != null) {
            var state;
            if (BaseObject.is(el, "IDataStateManager")) {
                state = el.get_DataItemState();
                if (bDelete) {
                    if (typeof state == "undefined" || state == Binding.entityStateValues.Insert) {
                        // Remove any state
                        el.set_DataItemState(null);
                    } else if (state == Binding.entityStateValues.Unchanged || state == Binding.entityStateValues.Update) {
                        //Binding.entityOldStatePropertyName
                        el.set_DataItemState(Binding.entityStateValues.Delete);
                    }
                } else {
                    if (bUnDelete) el.set_DataItemState(Binding.entityStateValues.Undelete);
                    if (typeof state == "undefined") {
                        el.set_DataItemState(Binding.entityStateValues.Insert);
                    } else if (state == Binding.entityStateValues.Unchanged) {
                        el.set_DataItemState(Binding.entityStateValues.Update);
                    }
                }
            } else if (!BaseObject.is(el, "BaseObject")) {
                state = el[Binding.entityStatePropertyName];
                if (bDelete) {
                    if (typeof state == "undefined" || state == Binding.entityStateValues.Insert) {
                        // Remove any state
                        delete el[Binding.entityStatePropertyName];
                        delete el[Binding.entityOldStatePropertyName];
                    } else if (state == Binding.entityStateValues.Unchanged || state == Binding.entityStateValues.Update) {
                        el[Binding.entityOldStatePropertyName] = el[Binding.entityStatePropertyName];
                        el[Binding.entityStatePropertyName] = Binding.entityStateValues.Delete;
                    }
                } else {
                    if (bUnDelete && state == Binding.entityStateValues.Delete) el[Binding.entityStatePropertyName] = el[Binding.entityOldStatePropertyName];
                    if (typeof state == "undefined") {
                        el[Binding.entityStatePropertyName] = Binding.entityStateValues.Insert;
                    } else if (state == Binding.entityStateValues.Unchanged) {
                        el[Binding.entityStatePropertyName] = Binding.entityStateValues.Update;
                    }
                }
            }
        }
    }

})();