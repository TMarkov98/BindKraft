function IDisplayDataSupplier() {}
IDisplayDataSupplier.Interface("IDisplayDataSupplier");
IDisplayDataSupplier.prototype.displaydataevent = new InitializeEvent("Informs the target that display data is available or changed - all data. Args: sender, displaydata as raw object");
IDisplayDataSupplier.prototype.get_displaydata = function() {
	throw "Not implemented";
}
IDisplayDataSupplier.prototype.get_shortdisplaydata = function() {
	return this.get_displaydata();
}