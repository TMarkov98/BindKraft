
/*INTERFACE*/
function IOperationReset() { }
IOperationReset.Interface("IOperationReset");
IOperationReset.prototype.OperationReset = function () { throw "not implemented"; }.Description("Resets everything but handling related info.");
IOperationReset.prototype.OperationClear = function () { throw "not implemented"; }.Description("Resets everything.");
//IOperationReset.RequiredTypes("IOperation");