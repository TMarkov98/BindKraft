


/*CLASS*/
function InitializeArray(desc, defVal) {
    Initialize.apply(this, arguments);
    this.type = "Array";
}
InitializeArray.Inherit(Initialize, "InitializeArray");
InitializeArray.prototype.produceDefaultValue = function (obj) {
    if (this.dontInitialize()) return null;
	var def = Defaults.getValue(this, this.defaultValue);
    if (BaseObject.is(def, "Array")) {
        return Array.createCopyOf(def);
    } else {
        return [];
    }
};
InitializeArray.prototype.defValueDescription = function () {
    var r = {
        value: "",
        type: "array"
    };
    return r;
};