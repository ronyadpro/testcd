jQuery(document).ready(function ($) {
    (function ($) {
        /*-----------------------
        --> Off Canvas Menu
        

        /**********************
         *Expand Category Menu
         ***********************/

        /**********************
         *Expand Category Mobile Menu
         ***********************/

        /*------------------------
        	--> Search PopUp
        ------------------------*/

        /*------------------------
        	--> Slick Carousel
        ------------------------*/

        /*-------------------------------------
        	--> Sticky Header
        ---------------------------------------*/
        function stickyHeader() {
            var headerHeight = $('.site-header')
                .get(0)
                .getBoundingClientRect().height;
            $(window).on({
                resize: function () {
                    var width = $(window).width();
                    if (width <= 991) {
                        $('.sticky-init').removeClass('fixed-header');
                        if ($('.sticky-init').hasClass('sticky-header')) {
                            $('.sticky-init').removeClass('sticky-header');
                        }
                    } else {
                        $('.sticky-init').addClass('fixed-header');
                    }
                },
                load: function () {
                    var width = $(window).width();
                    if (width <= 991) {
                        $('.sticky-init').removeClass('fixed-header');
                        if ($('.sticky-init').hasClass('sticky-header')) {
                            $('.sticky-init').removeClass('sticky-header');
                        }
                    } else {
                        $('.sticky-init').addClass('fixed-header');
                    }
                }
            });
            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= headerHeight) {
                    $('.fixed-header').addClass('sticky-header');
                } else {
                    $('.fixed-header').removeClass('sticky-header');
                }
            });
        }
        stickyHeader();
    })(jQuery);

    /*--
    	MailChimp
    -----------------------------------*/

    /*-------------------------------------
    	--> Countdown Activation
    ---------------------------------------*/

    /*--
        15: Google Map
    ----------------------------------------------------*/
    // Initialize and add the map
});
