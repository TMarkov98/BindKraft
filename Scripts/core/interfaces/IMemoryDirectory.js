function IMemoryDirectory() {}
IMemoryDirectory.Interface("IMemoryDirectory","IMemoryFile");
IMemoryDirectory.prototype.cd = function(path) { throw "not impl";}
IMemoryDirectory.prototype.mkdir = function(path, typechecker) { throw "not impl";}
IMemoryDirectory.prototype.put = function(path, item) { throw "not impl";}