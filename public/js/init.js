/*-----------------------------------------------------------------------------------
/*
/* Init JS (surgical fixes: plugin guards + flexslider on window.load)
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
  // --- Plugin presence guards ---
  var hasFitText    = !!$.fn.fitText;
  var hasWaypoints  = !!$.fn.waypoint;
  var hasMagnific   = !!$.fn.magnificPopup;
  var hasFlexslider = !!$.fn.flexslider;

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

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        'swing',
        function () {
          window.location.hash = target;
        }
      );
  });

  /*----------------------------------------------------*/
  /* Highlight current section in nav (guarded)         */
  /*----------------------------------------------------*/
  var $sections = $('section');
  var $navLinks = $('#nav-wrap a');

  if (hasWaypoints && $sections.length && $navLinks.length) {
    $sections.waypoint(
      {
        handler: function (event, direction) {
          var $active = $(this);
          if (direction === 'up') $active = $active.prev();

          var $activeLink = $('#nav-wrap a[href="#' + $active.attr('id') + '"]');
          $navLinks.parent().removeClass('current');
          $activeLink.parent().addClass('current');
        },
        offset: '35%',
      }
    );
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
  if ($nav.length) {
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
  /* Flexslider (moved to window.load + guarded)        */
  /*----------------------------------------------------*/
  $(window).on('load', function () {
    if (!hasFlexslider) return;
    $('.flexslider').flexslider({
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
      'contactName=' +
      contactName +
      '&contactEmail=' +
      contactEmail +
      '&contactSubject=' +
      contactSubject +
      '&contactMessage=' +
      contactMessage;

    $.ajax({
      type: 'POST',
      url: 'inc/sendEmail.php',
      data: data,
      success: function (msg) {
        // Message was sent
        if (msg == 'OK') {
          $('#image-loader').fadeOut();
          $('#message-warning').hide();
          $('#contactForm').fadeOut();
          $('#message-success').fadeIn();
        }
        // There was an error
        else {
          $('#image-loader').fadeOut();
          $('#message-warning').html(msg);
          $('#message-warning').fadeIn();
        }
      },
    });
    return false;
  });
});
