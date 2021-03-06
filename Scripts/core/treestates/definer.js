function _defineTS(proc,tsapi) {
	var _tskinds = {
		conditions: "conditions",
		tseu: "tseu",
		tse: "tse",
		tsm: "tsm",
		tsms: "tsms"
	};
	
	
	var cond = function(name,args) {
		return tsapi.Condition.apply(tsapi, arguments);
	}
	var tseu = function(name,types,conditions) {
		var arrTypes = tsapi.TSEUTypesValid(types);
		if (tsapi.isError(arrTypes)) throw "One or more of the types in TSEU definition are not recognized. Types specified:" + types;
		if (typeof name != "string" || name.length == 0) throw "Name is required for a TSEU definition";
		var conds = [];
		for (var i = 2; i < arguments.length; i++) {
			if (!BaseObject.is(arguments[i], "Delegate")) throw "Conditions must be delegates. Use condition() to create them."; 
			conds.push(arguments[i]);
		}
		var arr = [name,types];
		if (conds.length > 0) {
			conds.$tskind = _tskinds.conditions;
			arr.push(conds);
		}
		arr.$tskind = _tskinds.tseu;
		return arr;
	}
	var tse = function(tseuN) {
		var arr = [];
		for (var i = 0; i < arguments.length; i++) {
			var tseu = arguments[i];
			if (tseu.$tskind != _tskinds.tseu) throw "TSE can contain only TSEU elements";
			arr.push(tseu);
		}
		arr.$tskind = _tskinds.tse;
	}
	var tsm = function(_tse, _tsm) {
		if (BaseObject.is(_tse, "Array") && _tse.$tskind == _tskinds.tse) {
			var arr = [];
			arr.push(_tse);
			if (_tsm != null) {
				if (!BaseObject.is(_tsm, "Array") || _tsm.$tskind != _tskinds.tsm) {
					throw "The second argument of TSM is not a TSM";
				}
				arr.push(_tsm);
			}
			arr.$tskind = _tskinds.tsm;
			return arr;
		} else {
			throw "Empty TSM are not allowed";
		}
	}
	var tsms = function(tsmN) {
		var arr = [];
		for (var i = 0; i < arguments.length; i++) {
			var _tsm = arguments[i];
			if (!BaseObject.is(_tsm, "Array") || _tsm.$tskind != _tskinds.tsm) {
				throw "TSMS can contain only TSM entries";
			}
			arr.push(_tsm);
		}
		arr.$tskind = _tskinds.tsms;
		return arr;
	}
	var result = proc(tsms, tsm, tse, tseu, cond);
	
}