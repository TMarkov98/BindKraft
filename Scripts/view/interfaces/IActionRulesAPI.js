
/*STATIC CLASS*/
function IActionRulesAPI() {}
IActionRulesAPI.$executing = false;
IActionRulesAPI.executeActionRules = function(startPoint, rules, purpose, contextBuilder,multirules) {
	var finalresult = EActionRulesResult.ok;
	if (this.$executing) return finalresult;
	this.$executing = true; // non-reentrant under any circumstances.
	var _rules = [];
	var rnames = null;
	var r; // Intermediate result local var
	if (typeof rules == "string") {
		rnames = rules.split(",");
	} else if (CObject.is(rules,"Array")) {
		rnames = rules;
	}
	if (rnames != null) {
		var rules_query = new ActionRuleQuery(rnames, purpose, null, multirules);
		if (CObject.is(startPoint, "IStructuralQueryEmiter")) {
			startPoint.throwStructuralQuery(rules_query); // We do not use some parameters yet! TODO: Check how to organize their usage in surface API
		} else if (CObject.isDOM(startPoint) || CObject.isJQuery(startPoint)) {
			CJBUtil.throwStructuralQuery(startPoint, rules_query);
		}
		if (rules_query.rules != null && rules_query.rules.length > 0) {
			_rules = rules_query.rules;
			var context_query = new BuildActionRuleContextQuery(purpose);
			if (CObject.is(startPoint, "IStructuralQueryEmiter")) {
				startPoint.throwStructuralQuery(context_query); // We do not use some parameters yet! TODO: Check how to organize their usage in surface API
			} else if (CObject.isDOM(startPoint) || CObject.isJQuery(startPoint)) {
				CJBUtil.throwStructuralQuery(startPoint, context_query);
			}
			if (CObject.isCallback(contextBuilder)) {
				CObject.callCallback(contextBuilder, context_query.ruleContext);
			} else if (contextBuilder != null && !CObject.is(contextBuilder,"CObject") && typeof contextBuilder == "object") {
				for (var k in contextBuilder) {
					context_query.ruleContext[k] = contextBuilder[k];
				}
			}
			// We have the context and the rules
			
			for (var i = 0; i < _rules.length; i++) {
				if (CObject.isCallback(_rules[i])) {
					r = CObject.callCallback(_rules[i], context_query.ruleContext);
					if (r > finalresult) finalresult = r;
				}
			}
		}
	}
	this.$executing = false;
	return finalresult;
}.Description("Extracts and executes the specified rule(s) rules applicable for the startPoint. The routine first extracts the rule(s), then creates the context (if any rule is found) and executes the rules with that context.")
	.Param("startPoint","The subject of the rules - can be DOM element in a view or any class in the infrastructure hiearachy that supports IStructuralQueryEmiter. The query for rules and context preparation is started from that point.")
	.Param("rules","String, array of strings or a string with comma separated rule names.")
	.Param("purpose", "Optional - can be null or one of the EActionRulePurpose enumeration. When specified only the rules registerd for that purpose explicitly are searched, if null the rules for default purpose are used (usually this is the 'uspecified' purpose)")
	.Param("contextBuilder","Optional - can be null or function, delegate, plain object. If file or delegate is specified it is called with a single parameter - the context and the routine can patch it. If a plain object is specified the properties specified in it replace the corresponding properties in the context.")
	.Param("multirules", "Optional - can be null. If true is specified (explicitly), the rule search will behave differently and each rule name can produce more than a single rule - e.g. rules registered with  the same name on different levels will be all extracted. If omitted only the first (closest) rule with any given name will be found")
	.Returns("The maximum (most erroneous) value reported by any of the executed rules - see EActionRulesResult enumeration");

