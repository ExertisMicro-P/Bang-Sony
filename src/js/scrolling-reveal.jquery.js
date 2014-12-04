;(function ( $, window, document, undefined ) {

  'use strict';

  var pluginName = "scrollingReveal",
    defaults = {
      revealAfterIndex: 2,
      revealOffset: 150,
      parentSelector: 'div',
      revealSpeed: 500
    };


  // PASSWORD PEEKABOO CLASS DEFINITION
  // ======================

  function ScrollingReveal( element, options, selector ) {
    this.el = element;
    this.$el = $(element);
    this.options = $.extend(true, {}, defaults, options);
    this.selector = selector;
    this._defaults = defaults;
    this._name = pluginName;
    this._init();
  }

  ScrollingReveal.prototype._init = function() {
    // cache the window to prevent re-selection
    this.$window = $(window);

    // find the parent (if parent not called, closest risks matching self)
    this.$parent = this.$el.parent().closest(this.options.parentSelector);

    // cache the index of this element within the context as we'll use this later
    this.index = this.$parent.find(this.selector).index(this.$el);

    if ( this.index > this.options.revealAfterIndex ) {
      this.hide();
      this.bindScrollListener();
    }
  };

  ScrollingReveal.prototype.scrollHandler = function () {
    var offsettedTargetElementYPos = this.$el.offset().top + this.options.revealOffset;
    var bottomOfBrowserWindowYPos = this.$window.scrollTop() + this.$window.height();

    // if the top X (revealOffset option) pixels of the element is in the window then reveal it
    if (offsettedTargetElementYPos < bottomOfBrowserWindowYPos) {
      this.reveal();
      this.unbindScrollListener(); // detach the scroll listener. we won't be needed it again.
    }
  };

  ScrollingReveal.prototype.bindScrollListener = function () {
    // create a namespaced scroll event and limit event listener to 5 calls per second
    this.$window.on('scroll.'+this.index, this._throttle(200, $.proxy(this.scrollHandler, this)));
  };

  ScrollingReveal.prototype.unbindScrollListener = function () {
    // detach the namespaced scroll event
    this.$window.off('scroll.'+this.index, this.scrollHandler);
  };

  ScrollingReveal.prototype.reveal = function() {
     this.$el.fadeTo(this.options.revealSpeed, 1);
  };

  ScrollingReveal.prototype.hide = function() {
    // hide the element as quickly as possible, preserving height
    this.$el.css('opacity', 0);
  };

  // ref: http://blogorama.nerdworks.in/javascriptfunctionthrottlingan/
  ScrollingReveal.prototype._throttle = function (delay, callback) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();
      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };

  // PLUGIN DEFINITION
  // =======================

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    var selector = this.selector;
    this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new ScrollingReveal( this, options, selector ) );
      }
    });

    // chain jQuery functions
    return this;
  };

})( jQuery, window, document );
