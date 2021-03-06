


/*INTERFACE*/
function IAjaxContextParameters() { }
IAjaxContextParameters.Interface("IAjaxContextParameters");
IAjaxContextParameters.prototype.get_ajaxcontextparameter = function (paramKey) { return null; } .Description("Implement local and hierarchy query.");
IAjaxContextParameters.prototype.get_localajaxcontextparameter = function (paramKey) { return null; } .Description("Implement only local query");
// Additional fine tunning members - implementation may be needed if you want more control over the parameter supply
IAjaxContextParameters.prototype.isFinalAuthority = function (paramKey) { return false; } .Description("Return true if the search for the param should stop here. Return for any param or even null if all parameters should not be searched down the hierarchy.");
IAjaxContextParameters.prototype.set_localajaxcontextparameter = function (paramKey, v) { } .Description("Optional. This method is defined in this Interface just for convenienvce and allows (if supported) the parameters to be set on the object");
