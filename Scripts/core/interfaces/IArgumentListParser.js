function IArgumentListParser() {}
IArgumentListParser.Interface("IArgumentListParser");
IArgumentListParser.prototype.get_argumentlistparsetype = function() { return null;}
IArgumentListParser.prototype.parseArgumentList = function(stringargs) { throw "not implemented"; }