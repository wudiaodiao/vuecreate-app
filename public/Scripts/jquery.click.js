(function ($) {
    $.fn.clickEx = function () {
        var elem, i = 0;
		for ( ; ( elem = this[i] ) != null; i++ ) {
		    if (document.all) {
                elem.click();
            } else {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                elem.dispatchEvent(evt);
            }
        }
    };
})(jQuery);