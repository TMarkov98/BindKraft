function IApplicationState() {}
IApplicationState.Interface("IApplicationState");
IApplicationState.RequiredTypes('IAppBase');
IApplicationState.prototype.setApplicationState = function(state) { 
    throw 'not implemented';    
};