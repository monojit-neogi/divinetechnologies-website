// When Window Loaded.
(function($, window, document, undefined) {

    'use strict';

    // Check the device for mobile or desktop
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 769 ) { var mobile = true; }
    else{ var mobile = false; }

    //*********************************************
    //  SEARCH INPUT FOCUS OPTIONS ON HOME
    //*********************************************
        $(".home-input input").on("focus", function(){
            if (mobile === true) {
                $("html, body").animate({ scrollTop: $('#aura-search-form').offset().top - 60 + "px" }, 700);
            } else {
                $(".home-input").addClass("active");
            }
        });
        $(".home-input input").blur(function(){
            $(".home-input").removeClass("active");
        });

    //*********************************************
    //  HOME SLIDER BUTTONS
    //*********************************************

        //Next&Prev with external buttons
        $('.custom-slider-next').on("click", function(){ $(".custom-slider.home-slider").slick('slickNext'); });
        $('.custom-slider-prev').on("click", function(){ $(".custom-slider.home-slider").slick('slickPrev'); });

    //*********************************************
    //  #categories SECTION TITLE OPTIONS
    //*********************************************
        // Visible text positions for category tabs
        $(".categories .tab-item").each(function(){
            var item = $(this),
                visibleItem = item.find(".visible-item"),
                hiddenItemH = item.find(".hidden-item").height() / 2;
            $(visibleItem).css({
                "-webkit-transform":"translateY("+ hiddenItemH + "px" + ")",
                "-ms-transform":"translateY("+ hiddenItemH + "px" + ")",
                "transform":"translateY(" + hiddenItemH + "px" + ")"
            });
        });

    //*********************************************
    //  CIRCLE SLIDER WIDTH AND HEIGHT CALCULATER ON BLOG
    //*********************************************

        $.fn.circleSliderHeight = function() {
            $(".aura-blog-slider").each(function(){
                var circle = $(this).find(".left-image"),
                    width = $(circle).outerWidth();
                $(circle).css({"height": width + "px"});
            });
        } 
        $("body").circleSliderHeight();
        $(window).resize(function(){ $("body").circleSliderHeight(); });

    //*********************************************
    //  BLOG SLIDER OPTIONS
    //*********************************************

        //Get Slider
        var $slider = $('.aura-blog-slider');
        //After Slider Load
        $slider.on('init', function(event) {
            $('.slick-active').next().addClass('next');
            var nextItem = $('.slick-slide.next'),
                nextImage = $(nextItem).find(".left-image").data('background'),
                nextTitle = $(nextItem).data('title');
                $('.next-slide-button').css({'background-image': 'url(' + nextImage +')'});
                $('.next-slide-button').find('span').html(nextTitle);
            var prevItem = $('.slick-slide:last-child'),
                prevImage =$(prevItem).find(".left-image").attr('data-background'),
                prevTitle =$(prevItem).data('title');
                $('.prev-slide-button').css({'background-image': 'url(' + prevImage +')'})
                $('.prev-slide-button').find('span').html(prevTitle);
        });

        //Slider Options
        $($slider).slick({
            fade: true,
            dots: false,
            arrows: false,
            autoplay: false,
            pauseOnHover: true,
            infinite: true,
            edgeFriction: 0,
            easing: 'linear',
            touchThreshold: 50,
            speed: 300,
            slidesToShow: 1,
            swipe: false,
            initialSlide: 0,
            touchMove: false,
            draggable: false,
            adaptiveHeight: false,
            variableWidth: false,
            centerMode: false,
            slidesToScroll: 1,
            setPosition: 0
        }).on('reInit afterChange', function(event, slick, nextSlide){
            var total = $('.aura-blog-slider .slide').length,
                nextValue = nextSlide +2,
                firstImage = $(".aura-blog-slider .slide:nth-of-type(1)").find(".left-image").attr('data-background'),
                firstTitle = $(".aura-blog-slider .slide:nth-of-type(1)").data('title'),
                nextItem = $(slick.$slides.get(nextSlide +1)),
                nextImage = $(nextItem).find(".left-image").data('background'),
                nextTitle = $(nextItem).attr('data-title');
                if (nextValue > total) {
                    $('.next-slide-button').css({'background-image': 'url(' + firstImage +')'});
                    $('.next-slide-button').find('span').html(firstTitle);
                } else{
                    $('.next-slide-button').css({'background-image': 'url(' + nextImage +')'});
                    $('.next-slide-button').find('span').html(nextTitle);
                }
                if ($($slider).hasClass('hero-slider')) {
                    var items = $('.hero-slider .animated'),
                        current = $('.hero-slider .slick-current .animated'),
                        nCurrent = $('.hero-slider .slick-slide:not(.slick-current) .animated');
                    Waypoint.refreshAll();
                    $(current).each(function() {
                        var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                        setTimeout(function(){ item.addClass( animation + " visibleme" ); }, animationDelay);
                    });
                    $(nCurrent).each(function() {
                        var item = $(this), animation = item.data('animation');
                        item.removeClass( animation + "visibleme" );
                    });
                    $('.slick-current video').each(function () {this.play();});
                    $('.slick-slide:not(.slick-current) video').each(function () {this.pause();});
                    $($slider).find('.slick-slide.slick-current .slide-img .scale-timer').addClass("scaling");
                }
        }).on('afterChange', function(event, slick, prevSlide){
            var prevItem = $(slick.$slides.get(prevSlide -1)),
                prevImage =$(prevItem).find(".left-image").attr('data-background'),
                prevTitle =$(prevItem).data('title');
            $('.prev-slide-button').css({'background-image': 'url(' + prevImage +')'})
            $('.prev-slide-button').find('span').html(prevTitle);
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            Waypoint.refreshAll();
            $(items).removeClass("visible");
            var nCurrent = $('.hero-slider .slick-slide:not(.slick-current) .animated') ,items = $('.hero-slider .animated');
            $(nCurrent).each(function() {
                var item = $(this), animation = item.data('animation'), animationDelay = item.data('animation-delay');
                $(item).removeClass( animation + " visibleme" );
            });
        });
        //Navigations
        $('.next-slide-button').click(function(e){
            $(".aura-blog-slider").slick('slickNext');
            e.preventDefault();
        });
        //Navigations
        $('.prev-slide-button').click(function(e){
            $(".aura-blog-slider").slick('slickPrev');
            e.preventDefault();
        });

    //*********************************************
    //  CLOCK OPTIONS
    //*********************************************

        var intVal, myclock;
        //clock plugin constructor
        $('#myclock').thooClock({
            size:220,
            showNumerals:true,
            dialColor:'#333',
            dialBackgroundColor:'transparent',
            secondHandColor:'#f3a829',
            minuteHandColor:'#222222',
            hourHandColor:'#222222',
            alarmHandColor:'#FFFFFF',
            alarmHandTipColor:'#026729',
            hourCorrection:'+0',
            brandText:'Quadra',
            brandText2:'Help Center',
            onEverySecond:function(){
                //callback that should be fired every second
            },
            //alarmTime:'15:10',
        });


    //*********************************************
    //  Works on QDR Modal
    //*********************************************
        // init cubeportfolio
        $('#works-without-images').cubeportfolio({
            filters: '#works-without-images-filters',
            layoutMode: 'masonry',
            defaultFilter: '*',
            animationType: 'scaleSides',
            gapHorizontal: 10,
            gapVertical: 10,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 4,
            }, {
                width: 900,
                cols: 3,
            }, {
                width: 640,
                cols: 2,
            }, {
                width: 480,
                cols: 1,
                options: {
                    gapHorizontal: 15,
                    gapVertical: 15,
                }
            }],
            caption: 'zoom',
            displayType: 'fadeIn',
            displayTypeSpeed: 400,
        });


    
// End Function
})(jQuery, window, document);

