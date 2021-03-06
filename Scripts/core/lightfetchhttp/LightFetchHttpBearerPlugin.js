function LightFetchHttpBearerPlugin(/*IQueryTokenStorage*/ tokenStorage) {
    LightFetchHttpPluginBase.apply(this,arguments);
    this.$storage = tokenStorage;
}
LightFetchHttpBearerPlugin.Inherit(LightFetchHttpPluginBase, "LightFetchHttpBearerPlugin");
LightFetchHttpBearerPlugin.prototype.$storage = null;

// Override this in inheriting classes
LightFetchHttpBearerPlugin.prototype.manipulateRequest = function(fetcher, xhr) {
    if (BaseObject.is(this.$storage,"IQueryTokenStorage")) {
        var url = fetcher.get_url();
        if (url != null) url = url.toString();
        var token = this.$storage.getToken(url);
        if (token != null) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    }
}