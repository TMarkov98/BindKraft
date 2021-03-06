function SystemTokenStorage() {
    BaseObject.apply(this,arguments);
    this.storage = new KeyedTokenStorage();
}
SystemTokenStorage.Inherit(BaseObject, "SystemTokenStorage");
SystemTokenStorage.prototype.storage = null;

SystemTokenStorage.Default = (function() {
	var instance = null;
	var regCookie = null;
	return function() {
		if (instance == null) {
			instance = new SystemTokenStorage();
			regCookie = LocalAPI.Default().registerAPI ("IQueryTokenStorage", instance.storage);
		}
		return instance;
	};
})();


SystemTokenStorage.Default();
