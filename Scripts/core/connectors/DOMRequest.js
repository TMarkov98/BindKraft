


/*CLASS*/
function DOMRequest(selector, host) {
    Connector.apply(this, arguments);
    this.isAsync = false;
}
DOMRequest.Inherit(Connector, "DOMRequest");
DOMRequest.prototype.resolve = function (callback) {
    var el;
    var h = null;
    if (BaseObject.is(this.host, "IDOMConnectedObject")) h = this.host.get_connecteddomelement();
    if (h != null) {
        el = h.find(this.$data);
    } else {
        el = $(this.$data);
    }
    this.$resource = el.html();
    if (el.length > 0) return true;
    return false;
};