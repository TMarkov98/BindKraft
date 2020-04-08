/**
	Default implementation of interrogation procedures. They are called by onsend methods that implement the exaxt procedure
*/
function IAjaxHttpRequestInterogatorsImpl() {}
IAjaxHttpRequestInterogatorsImpl.InterfaceImpl(IAjaxHttpRequestInterogators, "IAjaxHttpRequestInterogatorsImpl");
// PRESENDING UTILITY PROCEDURES
// These implement techniques used by most onsend implementations
/**
	Interrogates the owner and hierarchy/ies behind it for the supported
	contextual parameters, obtaining information about their names and possible values
*/
IAjaxHttpRequestInterogatorsImpl.prototype.determineSupportedContextParameters = function() {
	throw "not impl";
}
/**
	Using the information from determineSupportedContextParameters interrogates the owner for
	the actual values.
*/
IAjaxHttpRequestInterogatorsImpl.prototype.collectContextParameters = function() {
	throw "not impl";
}
/**
	Ask owner through IAjaxQueryStringParams if supported
*/
IAjaxHttpRequestInterogatorsImpl.prototype.collectOownerQueryParameters = function() {
}