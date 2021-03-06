/**
	Translates (picks) the order fields from IParameters source into orders array 
	
*/
function DefaultDataSupplierOrderExtractor(conf) {
	BaseObject.apply(this, arguments);
	this.conf = conf;
}
DefaultDataSupplierOrderExtractor.Inherit(BaseObject, "DefaultDataSupplierOrderExtractor");
DefaultDataSupplierOrderExtractor.Implement(ITranslateParamersToOrdersArray);
DefaultDataSupplierOrderExtractor.prototype.configureOrderParameters = function(conf) { 
	this.conf = conf;
}

DefaultDataSupplierOrderExtractor.prototype.PerformTranslation = function(/*IParameters*/ parameters) {
	if (BaseObject.is(this.conf,"Array")) {
		var arrResult = null;
		for (var i = 0;i < this.conf.length; i++) {
			var order = this.conf[i];
			if (!BaseObject.is(order,"Array")) continue;
			
			var _orderField = order[0]?order[0] + "": null;
			var _orderDir = order[1]?order[1] + "": null;
			if (_orderField == null || /^\s*$/.test(_orderField)) continue;
			var ord, dir;
			
			if (BaseObject.is(parameters, "IParameters")) {
				ord = parameters.get_parameters(_orderField);
				if (ord == null || /^\s*$/.test(ord)) continue;
				if (arrResult == null) arrResult = [];
				dir = parameters.get_parameters(_orderDir);
				if ((/^desc$/i).test(dir)) {
					arrResult.push([ord,-1]);
				} else {
					arrResult.push([ord,1]);
				}
			} else if (typeof parameters == "object") {
				ord = parameters[_orderField];
				if (ord == null || /^\s*$/.test(ord)) continue;
				if (arrResult == null) arrResult = [];
				dir = parameters[_orderDir];
				if ((/^desc$/i).test(dir)) {
					arrResult.push([ord,-1]);
				} else {
					arrResult.push([ord,1]);
				}
			}
		}
		return arrResult;
	} else {
		return null;
	}
}