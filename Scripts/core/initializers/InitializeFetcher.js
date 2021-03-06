
/*CLASS*/
function InitializeFetcher(desc, iface, reason, silent) {
    Initialize.apply(this, arguments);
    this.type = "Fetcher";
	this.active = true;
	this.defaultValue = "ServiceFetcher";
    this.fetchInterface = iface;
	this.fetchReason = reason;
	this.fetchSilent = silent;
};
InitializeFetcher.Inherit(Initialize, "InitializeFetcher");
InitializeFetcher.prototype.produceDefaultValue = function (obj) {
    if (this.dontInitialize()) return null;
	var iface_name = Class.getTypeName(this.fetchInterface);
	var reason = this.fetchReason;
	if (iface_name == null) throw "InitializeFetcher requires interface argument e.g. new InitializeFetcher('description', ISomeInterface)"
	return ServiceFetcher.createFetcher(obj, iface_name, reason, this.fetchSilent);
};
InitializeFetcher.prototype.defValueDescription = function () {
	var iface_name = Class.getTypeName(this.fetchInterface) || "unknown";
    return {
        value: "",
        type: "ServiceFetcher(" + iface_name + ") " + (this.fetchSilent?"silent":"nonsilent")
    };
};