


/*CLASS*/
function InitializeBooleanParameter(desc, defval) {
    InitializeParameter.apply(this, arguments);
    this.type = "Parameter";
    this.paramType = "boolean";
};
InitializeBooleanParameter.Inherit(InitializeParameter, "InitializeBooleanParameter");