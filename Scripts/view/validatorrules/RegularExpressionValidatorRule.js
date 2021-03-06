////////////// RegularExpressionValidatorRule //////////////////////////////
function RegularExpressionValidatorRule(v) {
	ValidateValue.apply(this, arguments);
}
RegularExpressionValidatorRule.Inherit(ValidateValue, "RegularExpressionValidatorRule");
RegularExpressionValidatorRule.registerValidator("regex");
RegularExpressionValidatorRule.prototype.$expresion = null;
RegularExpressionValidatorRule.prototype.set_expresion = function (v) {
	return this.$expresion = v;
};
RegularExpressionValidatorRule.prototype.set_expression = RegularExpressionValidatorRule.prototype.set_expresion;
RegularExpressionValidatorRule.prototype.get_expresion = function () {
	return this.$expresion;
};
RegularExpressionValidatorRule.prototype.get_expression = RegularExpressionValidatorRule.prototype.get_expresion;

//Regex Flags
RegularExpressionValidatorRule.prototype.$global = 0;
RegularExpressionValidatorRule.prototype.$ignorecase = 0;
RegularExpressionValidatorRule.prototype.$multiline = 0;

RegularExpressionValidatorRule.prototype.set_global = function (v) {
	return this.$global = Number(v);
};
RegularExpressionValidatorRule.prototype.get_global = function () {
	return this.$global;
};

RegularExpressionValidatorRule.prototype.set_ignorecase = function (v) {
	return this.$ignorecase = Number(v);
};
RegularExpressionValidatorRule.prototype.get_ignorecase = function () {
	return this.$ignorecase;
};

RegularExpressionValidatorRule.prototype.set_multiline = function (v) {
	return this.$multiline = Number(v);
};
RegularExpressionValidatorRule.prototype.get_multiline = function () {
	return this.$multiline;
};

RegularExpressionValidatorRule.prototype.get_message = function (lastValue) {
	var msg = this.get_text();
	/* if (msg == null || msg.length == 0) {
		msg = Binding.resources.get("Validation.Regex");
	} */
	if (msg == null || msg.length == 0) {
		msg = "Regular expression: %l is not match";
	}
	return msg.sprintf(lastValue);
};
RegularExpressionValidatorRule.prototype.validateValue = function (validator, value, binding) {
	var result = ValidationResultEnum.correct;
	if (this.isValueEmpty(value) || typeof value != "string") return this.validationResult(result);
	
	var expresion = this.get_expresion();
	var flags = "";
	if (!isNaN(this.get_global()) && this.get_global()) {
		flags += 'g';
	}
	if (!isNaN(this.get_ignorecase()) && this.get_ignorecase()) {
		flags += 'i';
	}
	if (!isNaN(this.get_multiline()) && this.get_multiline()) {
		flags += 'm';
	}

	if (!IsNull(expresion)) {
		var regex = new RegExp(expresion, flags);
		if (!(value.match(regex))) {
			result = ValidationResultEnum.incorrect;
		}
	}
	return this.validationResult(result);
};
var RegularExpressionValidatorControl = RegularExpressionValidatorRule
//////////////////////END/////////////////////////////