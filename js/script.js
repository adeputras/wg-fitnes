(function ($) {
  "use strict";
  $(document).ready(function () {

    //header background
    function bgHeader() {
      if ($(window).width() > 991) {
        var header = $(".section-header");
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 10) {
          header.addClass('bg-header');
        } else {
          header.removeClass('bg-header');
        }
      }
    }
    $(window).scroll(function () {
      bgHeader();
    });

    // Scroll Navigation
    var offsetHeight = $('.section-header').outerHeight();
    console.log(offsetHeight)
    $('.home').scrollspy({
      offset: offsetHeight,
    });

    $('.main-menu a[href^="#"]').on('click', function (event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - offsetHeight
        }, 1000);
      }
      //close menu mobile when click link scrollspy
      if ($('.burger').hasClass('open')) {
        setTimeout(function () {
          closeMenu();
        }, 100);
      }
    });

    $('.scrollto').on('click', function (event) {
      event.preventDefault();
      var href = $(this).attr('href');
      if ($(href).length) {
        $('html, body').stop().animate({
          scrollTop: $(href).offset().top - offsetHeight
        }, 1000);
      }
    });

    //Section Parallax Image
    function parallax() {
      var offset = $('#section-parallax').offset();
      var imgPlx = $('.parallax-image').height() / 2 * 3;
      var scrollPosition = $(window).scrollTop() - offset.top + imgPlx;

      $('.parallax-image').css('top', (0 - (scrollPosition * .25)) + 'px')
    }
    $(window).bind('scroll', function (e) {
      parallax();
    });

    //Section Slider
    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
    $('#section-slider').on('init', function (e, slick) {
      var $firstAnimatingElements = $('#section-slider .slide:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    $('#section-slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('#section-slider .slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      doAnimations($animatingElements);
    });
    $('#section-slider').slick({
      arrows: false,
      pauseOnHover: false,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
      infinite: true,
    });

    //Testimonial Slider
    $('.testimonial-slider').slick({
      pauseOnHover: false,
      //autoplay: true,
      //autoplaySpeed: 4000,
      prevArrow: "<button type='button' class='slick-prev arrow-left'><i class='fa fa-angle-left'></i></button>",
      nextArrow: "<button type='button' class='slick-next arrow-right'><i class='fa fa-angle-right'></i></button>",
      infinite: true,
      responsive: [{
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
          adaptiveHeight: true
        }
      }]
    });

    //Menu Mobile
    $('.burger').on('click', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('open')) {
        openMenu();
      } else {
        closeMenu();
      }

    });

    function openMenu() {
      $('.menu-bg').addClass('animate');
      $('.burger').addClass('open');
      $('.x, .z').addClass('collapse-icon');
      $('.menu-navigation').addClass('animate');
      $('body').css({
        'overflow': 'hidden',
        'height': '100vh'
      });

      setTimeout(function () {
        $('.y').hide();
        $('.x').addClass('rotate30');
        $('.z').addClass('rotate150');
      }, 70);
      setTimeout(function () {
        $('.x').addClass('rotate45');
        $('.z').addClass('rotate135');
      }, 120);
    }

    function closeMenu() {
      $('.menu-navigation').removeClass('animate');
      $('body').css({
        'overflow': '',
        'height': ''
      });

      setTimeout(function () {
        $('.burger').removeClass('open');
        $('.x').removeClass('rotate45').addClass('rotate30');
        $('.z').removeClass('rotate135').addClass('rotate150');
        $('.menu-bg').removeClass('animate');

        setTimeout(function () {
          $('.x').removeClass('rotate30');
          $('.z').removeClass('rotate150');
        }, 50);
        setTimeout(function () {
          $('.y').show();
          $('.x, .z').removeClass('collapse-icon');
        }, 70);
      }, 100);

    }

  });
})(jQuery);