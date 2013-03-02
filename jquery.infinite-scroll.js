/*
 * Infinite Scroll - jQuery plugin for lazy loading content\infinite scrolling pages
 *
 * Copyright (c) 2013 Nadav Greenberg
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *
 *
 * Version:  0.1
 *
 */
(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.infinitescroll = function(options) {
        var boundFn;
        var settings = {
            threshold       : 0,
            callback        : $.noop,
            showLoading     : false,
            loadingEl       : $('<div>Loading...</div>')
        };
        $.extend(settings, options);

        /* Name the bound function so multiple inits. on same elem will no cause multiple event handlers */
        boundFn = function() {
            var $this = $(this);
            var promise;
            if ($this.scrollTop() + $this.innerHeight() + settings.threshold >= $this[0].scrollHeight) {
                if (settings.showLoading) {
                    $this.append(settings.loadingEl);
                }

                if (settings.showLoading) {
                    promise = settings.callback.apply($this);
                    if (promise && $.isFunction(promise.done)) {
                        promise.done(function() {
                            settings.loadingEl.remove();
                        })
                    } else {
                        settings.loadingEl.remove();
                    }
                }

            }
        };
        $(this).bind('scroll', boundFn);

        return this;
    };

})(jQuery, window, document);