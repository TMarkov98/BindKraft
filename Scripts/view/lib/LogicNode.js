
(function() {
    /**
     * Unfinished and not included
     * 
     */
    function LogicNode() {
        Base.apply(this, arguments);
    }
    LogicNode.Inherit(Base, "LogicNode")
    .Implement(ICustomParameterizationStdImpl, "and1", "and2", "and3","or1", "or2", "or3")
    .ImplementProperty("and1")
    .ImplementProperty("and2")
    .ImplementProperty("and3")
    .ImplementProperty("or1")
    .ImplementProperty("or2")
    .ImplementProperty("or3");

    LogicNode.prototype.and1event = new InitializeEvent("Fired when the result changes ");
    LogicNode.prototype.and2event = new InitializeEvent("Fired when the result changes ");
    LogicNode.prototype.and3event = new InitializeEvent("Fired when the result changes ");
    LogicNode.prototype.or1event = new InitializeEvent("Fired when the result changes ");
    LogicNode.prototype.or2event = new InitializeEvent("Fired when the result changes ");
    LogicNode.prototype.or3event = new InitializeEvent("Fired when the result changes ");

    LogicNode.prototype.$inputs = new InitializeObject("");
    LogicNode.prototype.get_input = function(idx) {
        return this.$inputs[idx];
    }
    LogicNode.prototype.set_input = function(idx,v) {
        this.$inputs[idx] = (v?true:false);

    }

})();