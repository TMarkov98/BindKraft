
// +Version: 1.5

/*INTERFACE*/
function IDataItems() {}
IDataItems.Description("Should be implemented by components that work with sets (Arrays) of items (objects). While this is not absolutely required, some implementors of advanced features will check for this Interface and fail if it isn't present.");
IDataItems.Interface("IDataItems");
IDataItems.prototype.get_items = function() { throw "get_items not implemented.";};
IDataItems.prototype.set_items = function(v) { throw "set_items not implemented.";};