/*INTERFACE*/
function IFilterDataSource() {}
IFilterDataSource.Interface("IFilterDataSource");
IFilterDataSource.prototype.implicithintevent = new InitializeEvent("Fired whenever implicit hint is available");
IFilterDataSource.prototype.explicithintevent = new InitializeEvent("Fired whenever explicit hint is available");
IFilterDataSource.prototype.fireImplicitHintEvent = function(hint) {
	var h = hint;
	if (h != null) {
		if (typeof h == "string") h = { defaultHint: hint };
	}
	this.implicithintevent.invoke(this, h);
}
IFilterDataSource.prototype.fireExplicitHintEvent = function(hint) {
	var h = hint;
	if (h != null) {
		if (typeof h == "string") h = { defaultHint: hint };
	}
	this.explicithintevent.invoke(this, h);
}
IFilterDataSource.prototype.resetFilterData = function(){}.Description("While the support for this method is optional, when implemented it should fire the appropriate events to advise the selector for its state");
