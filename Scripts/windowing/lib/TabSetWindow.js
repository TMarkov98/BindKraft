

/*TabSet*/
function TabSetWindow() {
    PageSetWindow.apply(this, arguments);
}
TabSetWindow.Inherit(PageSetWindow, "TabSetWindow");
TabSetWindow.ImplementActiveProperty("showclosebutton", new InitializeBooleanParameter("Show/hide close button of the window (if there is such in the template).", true), null, null, "manageCloseButton");
TabSetWindow.Defaults({
	templateName: "BindKraft/TabSetTemplate"
});
//TabSetWindow.prototype.templateSource = new URLConnector(mapPath("/Views/Templates/TabSet.html?rand=" + (new Date()).getSeconds() + (new Date()).getMinutes() + (new Date()).getHours()));
// TabSetWindow.prototype.templateSource = new DOMConnector('#TabSetTemplate');
TabSetWindow.prototype.$isinfodisplayactive = false;
TabSetWindow.prototype.$defaultWindowStyles = WindowStyleFlags.Default | WindowStyleFlags.adjustclient | WindowStyleFlags.fillparent;
TabSetWindow.prototype.OnDOMAttached = function () {
    BaseWindow.prototype.OnDOMAttached.apply(this, arguments);
    this.$clientSlotElement = $(this.root).find('[data-key="pages"]');
};
TabSetWindow.prototype.get_clientcontainer = function () {
    return this.$clientSlotElement;
};
TabSetWindow.prototype.init = function () {
    var tabsScrollableMain = $(this.root).find('.scrollable_tabs');
    var nextTab = $(this.root).find('.next_tab');
    var prevTab = $(this.root).find('.prev_tab');
};
TabSetWindow.prototype.finalinit = function() {
    this.manageCloseButton();
}
TabSetWindow.prototype.OnUpdatedTargets = function () {
    var api = $(this.root).find('.scrollable_tabs').data("scrollable");
    if (api != null) api.begin(0);
};
TabSetWindow.prototype.updateTabs = function () {
    PageSetWindow.prototype.updateTabs.apply(this, arguments);
};
TabSetWindow.prototype.addPage = function (page,options) {
    PageSetWindow.prototype.addPage.apply(this, arguments);
};
TabSetWindow.prototype.manageCloseButton = function(){
    var closeButton = $$(this.root).first().select('[data-key="closebutton"]').first();
    if(closeButton){
        this.get_showclosebutton() ? closeButton.show() : closeButton.hide();
    }
};