/*-----------------------------------------------------------------------------------
/*
/* Init JS (guards + mobile nav toggle + reveal + flexslider)
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
  // --- Plugin presence guards ---
  var hasFitText    = !!$.fn.fitText;
  var hasWaypoints  = !!$.fn.waypoint;
  var hasMagnific   = !!$.fn.magnificPopup;
  var hasFlexslider = !!$.fn.flexslider;

  /*----------------------------------------------------*/
  /* Mobile nav toggle                                  */
  /*----------------------------------------------------*/
  var $navWrap = $('#nav-wrap');
  var $navList = $('#nav');

  if ($navWrap.find('a.mobile-btn').length) {
    $navWrap.on('click', 'a.mobile-btn', function (e) {
      e.preventDefault();
      $navWrap.toggleClass('open')
              .attr('aria-expanded', $navWrap.hasClass('open') ? 'true' : 'false');
    });

    // collapse after clicking a link (mobile)
    $navList.on('click', 'a', function () {
      if ($navWrap.hasClass('open')) $navWrap.removeClass('open').attr('aria-expanded', 'false');
    });
  }

  /*----------------------------------------------------*/
  /* FitText Settings (guarded)                         */
  /*----------------------------------------------------*/
  if (hasFitText) {
    setTimeout(function () {
      $('h1.responsive-headline').fitText(1, {
        minFontSize: '40px',
        maxFontSize: '90px',
      });
    }, 100);
  }

  /*----------------------------------------------------*/
  /* Smooth Scrolling                                   */
  /*----------------------------------------------------*/
  $('.smoothscroll').on('click', function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);
    if (!$target.length) return;

    $('html, body').stop().animate(
      { scrollTop: $target.offset().top },
      800,
      'swing',
      function () { window.location.hash = target; }
    );
  });

  /*----------------------------------------------------*/
  /* Highlight current section in nav (guarded)         */
  /*----------------------------------------------------*/
  var $sections = $('section');
  var $navLinks = $('#nav-wrap a');

  if (hasWaypoints && $sections.length && $navLinks.length) {
    $sections.waypoint({
      handler: function (event, direction) {
        var $active = $(this);
        if (direction === 'up') $active = $active.prev();
        var $activeLink = $('#nav-wrap a[href="#' + $active.attr('id') + '"]');
        $navLinks.parent().removeClass('current');
        $activeLink.parent().addClass('current');
      },
      offset: '35%',
    });
  }

  /*----------------------------------------------------*/
  /* Header height = viewport height (guarded)          */
  /*----------------------------------------------------*/
  var $header = $('header');
  if ($header.length) {
    $header.css({ height: $(window).height() });
    $(window).on('resize', function () {
      $header.css({ height: $(window).height() });
      $('body').css({ width: $(window).width() });
    });
  }

  /*----------------------------------------------------*/
  /* Fade In/Out Primary Navigation (guarded)           */
  /*----------------------------------------------------*/
  var $nav = $('#nav-wrap');
  if ($nav.length && !$nav.find('button.mobile-toggle').length) {
    $(window).on('scroll', function () {
      var h = $header.length ? $header.height() : 0;
      var y = $(window).scrollTop();

      if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
        $nav.fadeOut('fast');
      } else {
        if (y < h * 0.2) {
          $nav.removeClass('opaque').fadeIn('fast');
        } else {
          $nav.addClass('opaque').fadeIn('fast');
        }
      }
    });

    // set initial state
    $(window).trigger('scroll');
  }

  /*----------------------------------------------------*/
  /* Modal Popup (guarded; no-op if plugin missing)     */
  /*----------------------------------------------------*/
  if (hasMagnific) {
    $('.item-wrap a').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      removalDelay: 200,
      showCloseBtn: false,
      mainClass: 'mfp-fade',
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      if ($.magnificPopup) $.magnificPopup.close();
    });
  }

  /*----------------------------------------------------*/
  /* Reveal on scroll (IO with Waypoints fallback)      */
  /*----------------------------------------------------*/
  (function(){
    var $targets = $('section, .portfolio-item, .flexslider, .bars').addClass('reveal');

    function inViewIO(){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
      $targets.each(function(){ io.observe(this); });
    }

    if('IntersectionObserver' in window){ inViewIO(); }
    else if ($.fn.waypoint){
      $targets.waypoint(function(){ $(this.element).addClass('in'); this.destroy(); }, { offset: '80%' });
    } else {
      $targets.addClass('in'); // last resort
    }
  })();

  /*----------------------------------------------------*/
  /* Flexslider (window.load + guarded)                 */
  /*----------------------------------------------------*/
  $(window).on('load', function () {
    if (!hasFlexslider) return;
    var $fx = $('.flexslider');
    if (!$fx.length) return;
    $fx.flexslider({
      namespace: 'flex-',
      controlsContainer: '.flex-container',
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
    });
  });

  /*----------------------------------------------------*/
  /* Contact form (unchanged)                           */
  /*----------------------------------------------------*/
  $('form#contactForm button.submit').click(function () {
    $('#image-loader').fadeIn();

    var contactName = $('#contactForm #contactName').val();
    var contactEmail = $('#contactForm #contactEmail').val();
    var contactSubject = $('#contactForm #contactSubject').val();
    var contactMessage = $('#contactForm #contactMessage').val();

    var data =
      'contactName=' + contactName +
      '&contactEmail=' + contactEmail +
      '&contactSubject=' + contactSubject +
      '&contactMessage=' + contactMessage;

    $.ajax({
      type: 'POST',
      url: 'inc/sendEmail.php',
      data: data,
      success: function (msg) {
        if (msg == 'OK') {
          $('#image-loader').fadeOut();
          $('#message-warning').hide();
          $('#contactForm').fadeOut();
          $('#message-success').fadeIn();
        } else {
          $('#image-loader').fadeOut();
          $('#message-warning').html(msg).fadeIn();
        }
      },
    });
    return false;
  });
});
