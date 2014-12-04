/*!
 * Project Name: microp-sony-microsite
 * Author: Bang
 */
(function($, window, document, undefined) {
    "use strict";
    var pluginName = "scrollingReveal", defaults = {
        revealAfterIndex: 2,
        revealOffset: 150,
        parentSelector: "div",
        revealSpeed: 500
    };
    function ScrollingReveal(element, options, selector) {
        this.el = element;
        this.$el = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.selector = selector;
        this._defaults = defaults;
        this._name = pluginName;
        this._init();
    }
    ScrollingReveal.prototype._init = function() {
        this.$window = $(window);
        this.$parent = this.$el.parent().closest(this.options.parentSelector);
        this.index = this.$parent.find(this.selector).index(this.$el);
        if (this.index > this.options.revealAfterIndex) {
            this.hide();
            this.bindScrollListener();
        }
    };
    ScrollingReveal.prototype.scrollHandler = function() {
        var offsettedTargetElementYPos = this.$el.offset().top + this.options.revealOffset;
        var bottomOfBrowserWindowYPos = this.$window.scrollTop() + this.$window.height();
        if (offsettedTargetElementYPos < bottomOfBrowserWindowYPos) {
            this.reveal();
            this.unbindScrollListener();
        }
    };
    ScrollingReveal.prototype.bindScrollListener = function() {
        this.$window.on("scroll." + this.index, this._throttle(200, $.proxy(this.scrollHandler, this)));
    };
    ScrollingReveal.prototype.unbindScrollListener = function() {
        this.$window.off("scroll." + this.index, this.scrollHandler);
    };
    ScrollingReveal.prototype.reveal = function() {
        this.$el.fadeTo(this.options.revealSpeed, 1);
    };
    ScrollingReveal.prototype.hide = function() {
        this.$el.css("opacity", 0);
    };
    ScrollingReveal.prototype._throttle = function(delay, callback) {
        var previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();
            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };
    $.fn[pluginName] = function(options) {
        var selector = this.selector;
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new ScrollingReveal(this, options, selector));
            }
        });
        return this;
    };
})(jQuery, window, document);