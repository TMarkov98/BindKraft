function IFindService() {}
IFindService.Interface("IFindService")
IFindService.RequiredTypes("IStructuralQueryEmiter");
IFindService.prototype.findService = function(_type, reason) { throw "not implemented"; }