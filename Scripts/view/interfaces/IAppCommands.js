/*INTERFACE*/
/**
	The displayable commands - ionvoked by menu items, shortcuts and so on.
*/
function IAppCommands() {}
IAppCommands.Interface("IAppCommands");
IAppCommands.RequiredTypes("IApp");
IAppCommands.prototype.get_appcommands = function() {
	return this.$appcommands;
}
IAppCommands.prototype.set_appcommands = function(v) {
	this.$appcommands = v;
}
IAppCommands.prototype.refreshAppCommands = function() {
	if (this.get_approotwindow() != null) {
		this.get_approotwindow().updateTargets();
	}
}

