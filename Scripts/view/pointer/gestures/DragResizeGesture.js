(function() {
    var PointerGesture  =   Class("PointerGesture"),
        DragVHGesture   =   Class("DragVHGesture");

    function DragResizeGesture(element, resizewidth, pt_mevent) {
        this.$elementRect = Rect.fromBoundingClientRectangle(element);
        
        // DragVHGesture
    }
    DragResizeGesture.Inherit(DragVHGesture, "DragResizeGesture")

    DragResizeGesture.prototype.$elementRect = null;


})();