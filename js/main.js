/*
Theme Name: Nantria
Description: Multi-Purpose HTML Site Template
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/nantria/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 1.0.2
*/

(function($) {
	"use strict";

	// Mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
	}

	function detectIE() {
		if (navigator.userAgent.indexOf('MSIE') != -1)
			var detectIEregexp = /MSIE (\d+\.\d+);/ // test for MSIE x.x
		else // if no "MSIE" string in userAgent
			var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ // test for rv:x.x or rv x.x where Trident string exists

		if (detectIEregexp.test(navigator.userAgent)){ // if some form of IE
			var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
			if (ieversion >= 9) {
				return true;
			}
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}
	
	jQuery.fn.setAllToMaxHeight = function(){
		return this.css({ 'height' : '' }).outerHeight( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).outerHeight() }) ) );
	};
	

	// Preloader
	function initPreloader() {
		var preloaderDelay = 350;
		var	preloaderFadeOutTime = 800;

		function hidePreloader() {
			var preloader = $('#preloader');
			
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();
	}


	// Refresh Waypoints
	var refreshWaypoints_timeout;

	function refreshWaypoints() {
		clearTimeout(refreshWaypoints_timeout);
		refreshWaypoints_timeout = setTimeout(function() {
			Waypoint.refreshAll();
		}, 1000);
	}


	// Animations
	function initAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility':'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});
				
				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}
	}


	// Fullscreen Elements
	function initFullscreenElements() {
		$('.fullscreen-element').each(function(){
			$(this).css('min-height', getWindowHeight());
		});
	}
	

	//	Backgrounds
	function initPageBackground() {

		$(window).stellar({ 
			horizontalScrolling: false,
			verticalOffset: 0,
			responsive: true
		});
		
		$('.player').each(function() {
			$('.player').mb_YTPlayer();
		});
		
		if($('body').hasClass('mobile')) {
			$('.video-wrapper, .player').css('display', 'none');	
		}
		
	}


	// Navigation
	function initNavigation() {
		
		function initOverlayNav() {
			$(document).on('click', '.nav-overlay-toggle', function(e) {
				e.preventDefault();
				$(this).toggleClass('open');
				$('.overlay-nav').toggleClass('open');
			});
		}
		initOverlayNav();
		
		function navClearEvents() {
			
			$(document)
				.off('click', '.nav-toggle')
				.off('click', '.header-widget > a')
				.off('click', '.header-widget[data-trigger="click"] > a')
				.off('click', 'ul.menu li.bt-dropdown > a')
				.off('click', 'ul li.dropdown-submenu > a');
			
			$(document)
				.off('mouseover mouseleave', 'ul.menu li.bt-dropdown');
				
			var navHoverElems = [$('ul.menu li.bt-dropdown'), $('.header-widget[data-trigger="hover"]')];
			var navHoverResult = $();

			$.each(navHoverElems, function() {
				navHoverResult = navHoverResult.add(this);
			});
		
			navHoverResult.off('mouseover mouseleave');
			$('ul li.dropdown-submenu').off('mouseover mouseleave');
			
			$('.nav-toggle, .header-widget, ul.menu li.bt-dropdown, ul li.dropdown-submenu').removeClass('open');
			
		}
		
		function initMobileNav() {

			navClearEvents();
			$('.block-menu').hide();
			$(document).on('click', '.nav-toggle', function(e) {
				e.preventDefault();
				$('.header-widget').removeClass('open');
				$(this).toggleClass('open');
				$('.block-menu').slideToggle(500);
			});
			
			$(document).on('click', '.header-widget > a', function(e) {
				e.preventDefault();
				if($(this).parent('.header-widget').hasClass('open')) {
					$('.header-widget').removeClass('open');
				} else {
					if($('.nav-toggle').hasClass('open')) {
						$('.nav-toggle').removeClass('open');
						$('.block-menu').slideUp(500);
					}
					$('.header-widget').removeClass('open');		
					$(this).parent('.header-widget').addClass('open');
				}
			});
			
			$(document).on('click', 'ul.menu li.bt-dropdown > a', function(e) {
				e.preventDefault();
				if( $(this).parent('li.bt-dropdown').hasClass('open')){
					$(this).parent('li.bt-dropdown').removeClass('open');
					return true;
				} 
				$(this).parent('li.bt-dropdown').addClass('open');
			});
			
			$(document).on('click', 'ul li.dropdown-submenu > a', function(e) {
				e.preventDefault();
				if( $(this).parent('li.dropdown-submenu').hasClass('open')){
					$(this).parent('li.dropdown-submenu').removeClass('open');
					return true;
				}
				$(this).parent('li.dropdown-submenu').addClass('open');
			});

		}

		function initDesktopNav() {
			
			navClearEvents();
			$('.block-menu').show();
			
			$(document).on('click', '.header-widget[data-trigger="click"] > a', function(e) {
				e.preventDefault();
				if($(this).parent('.header-widget').hasClass('open')) {
					$('.header-widget').removeClass('open');
				} else {
					$('.header-widget').removeClass('open');		
					$(this).parent('.header-widget').addClass('open');
				}
			});

			var navHoverElems = [$('ul.menu li.bt-dropdown'), $('.header-widget[data-trigger="hover"]')];
			var navHoverResult = $();

			$.each(navHoverElems, function() {
				navHoverResult = navHoverResult.add(this);
			});
		
			navHoverResult.on({
				mouseover: function (event) {
					if($(this).hasClass('open') && $(this).is(event.target)) {
						return true;
					}
					$('ul.menu li.bt-dropdown').removeClass('open');
					$('.header-widget').removeClass('open');		
					$(this).addClass('open');
				},
				mouseleave: function () {
					if(!$(this).hasClass('open')) {
						return true;
					}
					$(this).removeClass('open');
				}
			});
			
			$('ul li.dropdown-submenu').on({
				mouseover: function (event) {
					if($(this).hasClass('open') && $(this).is(event.target)) {
						return true;
					}
					$(this).addClass('open');
				},
				mouseleave: function () {
					$(this).removeClass('open');
				}
			});
			
		}

		// Header Widget - Hidden
		$(document).on('click', function(e) {
			if($(e.target).closest('.main-header').length)
				return;
			$('.header-widget').removeClass('open');
		});
		
		function wersenaNav() {
			if ( 991 >= getWindowWidth() || $('body').hasClass('mobile')) {
				initMobileNav();
			} else {
				initDesktopNav();
			}
		}
		wersenaNav();
		$(window).on('resize', function () {			
			wersenaNav();
		});
		

		var mainHeader = $('.main-header');
		if(!$('body').hasClass('mobile')) {
			$(window).scroll(function(){

				var scroll = $(this).scrollTop();
				var headerHeight = $('section').first().innerHeight();
				var windowWidth = getWindowWidth();
				if($('#portfolio').length){
					var portfolioPosition = $('#portfolio').offset().top;
				}
				
				$(window).on('resize', function () {
					var scroll = $(this).scrollTop();
					var headerHeight = $('section').first().innerHeight();
					var windowWidth = getWindowWidth();
					if($('#portfolio').length){
						var portfolioPosition = $('#portfolio').offset().top;
					}
				});
				
				if (!mainHeader.hasClass('header-static')) {
					if (windowWidth > 991) {
						if (scroll > 180) {
							mainHeader.addClass('scrolled');
						} else {
							mainHeader.removeClass('scrolled');
						}	
						if (scroll > headerHeight) {
							mainHeader.addClass('header-sticky');
						} else {
							mainHeader.removeClass('header-sticky');
						}
					}
				}
			});
		}
		
		var backToTop = $('.backToTop');
		if(!$('body').hasClass('mobile')) {
			$(window).scroll(function(){

				var scroll = $(this).scrollTop();
				var windowWidth = getWindowWidth();
				
				$(window).on('resize', function () {
					var scroll = $(this).scrollTop();
					var windowWidth = getWindowWidth();
				});				
				
				if (windowWidth > 991) {
					if (scroll > 370) {
						backToTop.addClass('fadein');
					} else {
						backToTop.removeClass('fadein');
					}
				}		
			});
		}
		
	}
	

	// Portfolio
	function initMasonryLayout() {
		if ($('.isotope-container').length) {
			var $isotopeContainer = $('.isotope-container');
			var $columnWidth = $isotopeContainer.data('column-width');
			
			if($columnWidth == null){
				var $columnWidth = '.isotope-item';
			}
			
			$isotopeContainer.isotope({
				filter: '*',
				animationEngine: 'best-available',
				resizable: false,
				itemSelector : '.isotope-item',
				masonry: {
					columnWidth: $columnWidth
				},
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			}, refreshWaypoints());
		}

		$('nav.isotope-filter ul a').on('click', function() {
			var selector = $(this).attr('data-filter');
			$isotopeContainer.isotope({ filter: selector }, refreshWaypoints());
			$('nav.isotope-filter ul a').removeClass('active');
			$(this).addClass('active');
			return false;
		});

	}


	// magnificPopup
	function initMagnificPopup() {
		$('.mfp-image').magnificPopup({
			type:'image',
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true
				},
				closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		});
		
		$('.mfp-iframe').magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: 'v=',
						src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					},
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%?autoplay=1'
					},
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					}
				},
				srcAction: 'iframe_src'
			},
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		$('.mfp-ajax').magnificPopup({
			type: 'ajax',
			ajax: {
				settings: null,
				cursor: 'mfp-ajax-cur',
				tError: '<a href="%url%">The content</a> could not be loaded.'
			},
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
				ajaxContentAdded: function(mfpResponse) {
					initFlexslider();
				}
			}
		});
		
		$('.open-popup-link').magnificPopup({
			type: 'inline',
			midClick: true,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ion-android-close"></i></button>',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
	}
	
	// Flexslider
	function initFlexslider() {
				
		if ($('.bt-slider').length) {			
			$('.bt-slider').each(function() {
				var $flexsSlider = $(this),
					fs_effect = $flexsSlider.data('effect'),
					fs_loop = $flexsSlider.data('loop'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed'),
					fs_pagination = $flexsSlider.data('pagination'),
					fs_direction = $flexsSlider.data('direction'),
					fs_smoothHeight = $flexsSlider.data('smooth-height');
				
				if(fs_effect == null){ fs_effect = 'slide'; }
				if(fs_loop == null){ fs_loop = true; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				if(fs_pagination == null){ fs_pagination = true; }		
				if(fs_direction == null){ fs_direction = true; }
				if(fs_smoothHeight == null){ fs_smoothHeight = false; }
				
				$flexsSlider.flexslider({
					animation: ''+ fs_effect +'',
					animationLoop: fs_loop,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					controlNav: fs_pagination,
					directionNav: fs_direction,
					keyboard: false,
					smoothHeight: fs_smoothHeight
				});
			});
		}
		
		if ($('.thumbs-gallery').length) {			
			$('.thumbs-gallery').each(function() {
				var $flexsSlider = $(this),
					fs_loop = $flexsSlider.data('loop'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed'),
					fs_direction = $flexsSlider.data('direction');
					
				if(fs_loop == null){ fs_loop = false; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				if(fs_direction == null){ fs_direction = false; }
				
				$flexsSlider.flexslider({
					animation: 'slide',
					animationLoop: fs_loop,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					controlNav: 'thumbnails',
					directionNav: fs_direction,
					keyboard: false,
					smoothHeight: true
				});
			});
		}
		
		if ($('.text-slider').length) {
			$('.text-slider').each(function() {
				var $flexsSlider = $(this),
					fs_effect = $flexsSlider.data('effect'),
					fs_loop = $flexsSlider.data('loop'),
					fs_slideshowSpeed = $flexsSlider.data('slideshow-speed'),
					fs_animationSpeed = $flexsSlider.data('animation-speed'),
					fs_pagination = $flexsSlider.data('pagination'),
					fs_direction = $flexsSlider.data('direction'),
					fs_smoothHeight = $flexsSlider.data('smooth-height');
				
				if(fs_effect == null){ fs_effect = 'slide'; }
				if(fs_loop == null){ fs_loop = true; }
				if(fs_slideshowSpeed == null){ fs_slideshowSpeed = 7000; }
				if(fs_animationSpeed == null){ fs_animationSpeed = 700; }
				if(fs_pagination == null){ fs_pagination = true; }
				if(fs_direction == null){ fs_direction = true; }
				if(fs_smoothHeight == null){ fs_smoothHeight = false; }
				
				$flexsSlider.flexslider({
					animation: ''+ fs_effect +'',
					animationLoop: fs_loop,
					slideshowSpeed: fs_slideshowSpeed,
					animationSpeed: fs_animationSpeed,
					controlNav: fs_pagination,
					directionNav: fs_direction,
					keyboard: false,
					smoothHeight: fs_smoothHeight
				});
			});
		}
		
		if ($('.flex-carousel').length) {
			$('.flex-carousel').each(function() {
				var $flexCarousel = $(this),
					fc_effect = $flexCarousel.data('effect'),
					fc_loop = $flexCarousel.data('loop'),
					fc_slideshowSpeed = $flexCarousel.data('slideshow-speed'),
					fc_animationSpeed = $flexCarousel.data('animation-speed'),
					fc_pagination = $flexCarousel.data('pagination'),
					fc_direction = $flexCarousel.data('direction'),
					fc_minItems = $flexCarousel.data('min-items'),
					fc_maxItems = $flexCarousel.data('max-items'),
					fc_move = $flexCarousel.data('move'),
					fc_itemWidth = $flexCarousel.data('item-width'),
					fc_itemMargin = $flexCarousel.data('item-margin');
				
				if(fc_effect == null){ fc_effect = 'slide'; }
				if(fc_loop == null){ fc_loop = true; }
				if(fc_slideshowSpeed == null){ fc_slideshowSpeed = 5000; }
				if(fc_animationSpeed == null){ fc_animationSpeed = 700; }
				if(fc_pagination == null){ fc_pagination = false; }
				if(fc_direction == null){ fc_direction = false; }
				if(fc_minItems == null){ fc_minItems = 1; }
				if(fc_maxItems == null){ fc_maxItems = 4; }
				if(fc_move == null){ fc_move = 1; }
				if(fc_itemWidth == null){ fc_itemWidth = 200; }
				if(fc_itemMargin == null){ fc_itemMargin = 0; }
				
				$flexCarousel.flexslider({
					minItems: fc_minItems,
					maxItems: fc_maxItems,
					move: fc_move,
					itemWidth: fc_itemWidth,
					itemMargin: fc_itemMargin,
					animation: ''+ fc_effect +'',
					slideshow: true,
					slideshowSpeed: fc_slideshowSpeed,
					animationSpeed: fc_animationSpeed,
					controlNav: fc_pagination,
					directionNav: fc_direction,
					keyboard: false
				});
			});
		}
		
	}
	
	function initPlugins() {

		// Smooth Scroll
		$('a.scrollto').smoothScroll({
			offset: -60,
			easing: 'swing',
			speed: 800
		});
		
		$('button.backToTop').off('click');
		
		$('button.backToTop').on('click', function() {
			$.smoothScroll({
				offset: 0,
				easing: 'swing',
				speed: 800
			});
			return false;
		});
	
		// Responsive Video - FitVids
		$('.video-container').fitVids();
	
		// OwlCarousel
		if ($('.bt-owl-carousel').length) {			
			$('.bt-owl-carousel').each(function() {
				var $owlCarousel = $(this),
					owl_items = $owlCarousel.data('items'),
					owl_itemsLg = $owlCarousel.data('items-lg'),
					owl_itemsMd = $owlCarousel.data('items-md'),
					owl_itemsSm = $owlCarousel.data('items-sm'),
					owl_itemsXs = $owlCarousel.data('items-xs'),
					owl_itemsXxs = $owlCarousel.data('items-xxs'),
					owl_slidespeed = $owlCarousel.data('slidespeed'),
					owl_paginationspeed = $owlCarousel.data('paginationspeed'),
					owl_rewindspeed = $owlCarousel.data('rewindspeed'),
					owl_autoplay = $owlCarousel.data('autoplay'),
					owl_stoponhover = $owlCarousel.data('stoponhover'),
					owl_navigation = $owlCarousel.data('navigation'),
					owl_rewindnav = $owlCarousel.data('rewindnav'),
					owl_scrollperpage = $owlCarousel.data('scrollperpage'),
					owl_pagination = $owlCarousel.data('pagination'),
					owl_paginationnumbers = $owlCarousel.data('paginationnumbers'),
					owl_colmargin = $owlCarousel.data('colmargin');
				
				if(owl_items == null ) { owl_items = 4; }
				if(owl_itemsLg == null ) { owl_itemsLg = Number( owl_items); }
				if(owl_itemsMd == null ) { owl_itemsMd = Number( owl_itemsLg); }
				if(owl_itemsSm == null ) { owl_itemsSm = Number( owl_itemsMd); }
				if(owl_itemsXs == null ) { owl_itemsXs = Number( owl_itemsSm); }
				if(owl_itemsXxs == null ) { owl_itemsXxs = Number( owl_itemsXs); }
				if(owl_slidespeed == null){ owl_slidespeed = 700; }
				if(owl_paginationspeed == null){ owl_paginationspeed = 700; }
				if(owl_rewindspeed == null){ owl_rewindspeed = 700; }
				if(owl_autoplay == null){ owl_autoplay = false; }
				if(owl_stoponhover == null){ owl_stoponhover = false; }				
				if(owl_navigation == null){ owl_navigation = true; }
				if(owl_rewindnav == null){ owl_rewindnav = true; }
				if(owl_scrollperpage == null){ owl_scrollperpage = 1; }			
				if(owl_pagination == null){ owl_pagination = true; }
				if(owl_paginationnumbers == null){ owl_paginationnumbers = false; }	
				
				if(owl_colmargin == null){
					$owlCarousel.find('.carousel-item').css({
						'padding-left': 0,
						'padding-right': 0
					});
				} else {
					$owlCarousel.css({
						'margin-left': -owl_colmargin,
						'margin-right': -owl_colmargin
					});
					$owlCarousel.find('.carousel-item').css({
						'padding-left': owl_colmargin,
						'padding-right': owl_colmargin
					});
				}
				
				$owlCarousel.owlCarousel({
					itemsCustom : [
						[0, owl_itemsXxs],
						[480, owl_itemsXs],
						[768, owl_itemsSm],
						[992, owl_itemsMd],
						[1200, owl_itemsLg]
					],
					slideSpeed : owl_slidespeed,
					paginationSpeed : owl_paginationspeed,
					rewindSpeed : owl_rewindspeed,					
					autoPlay : owl_autoplay,
					stopOnHover : owl_stoponhover,
					navigation : owl_navigation,
					navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
					rewindNav : owl_rewindnav,
					scrollPerPage : owl_scrollperpage,
					pagination : owl_pagination,
					paginationNumbers: owl_paginationnumbers	
				});
			});
		}
		
		if ($('.owl-single').length) {			
			$('.owl-single').each(function() {
				var $owlCarousel = $(this),
					owl_loop = $owlCarousel.data('loop'),
					owl_pagination = $owlCarousel.data('pagination'),
					owl_navigation = $owlCarousel.data('navigation'),
					owl_autoplay = $owlCarousel.data('autoplay'),
					owl_stoponhover = $owlCarousel.data('stoponhover'),
					owl_slidespeed = $owlCarousel.data('slidespeed'),
					owl_paginationspeed = $owlCarousel.data('paginationspeed');
				
				if(owl_loop == null){ owl_loop = true; }
				if(owl_pagination == null){ owl_pagination = true; }		
				if(owl_navigation == null){ owl_navigation = true; }
				if(owl_autoplay == null){ owl_autoplay = false; }
				if(owl_stoponhover == null){ owl_stoponhover = true; }
				if(owl_slidespeed == null){ owl_slidespeed = 700; }
				if(owl_paginationspeed == null){ owl_paginationspeed = 700; }
				
				$owlCarousel.owlCarousel({
					singleItem: true,
					loop: owl_loop,
					pagination: owl_pagination,
					navigation: owl_navigation,
					navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
					autoPlay: owl_autoplay,
					stopOnHover: owl_stoponhover,
					slideSpeed: owl_slidespeed,
					paginationSpeed: owl_paginationspeed
				});
			});
		}

		// Countdown
		if ($('.countdown[data-countdown]').length) {			
			$('.countdown[data-countdown]').each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}

		// Count To		
		if( $('.count-block').is(':appeared') ){
			$('.count-to').countTo();
		} else {
			$('.count-to').countTo();
		}

		// Placeholder
		$('input, textarea').placeholder();
		
		// Select2
		$(".js-selectbox").select2({
			minimumResultsForSearch: Infinity
		});
		
		$(".js-selectbox-search").select2();
		
		$(".js-selectbox-multiple").select2();
		
		// Tooltip
		$('[data-toggle="tooltip"]').tooltip();
		
		// Popover
		$('[data-toggle="popover"]').popover();
		
		// Morphext
		$('.text-rotate').Morphext({
			animation: 'fadeIn',
			separator: '|',
			speed: 3000
		});
	
	}
	

	// Mailchimp
	function initMailchimp() {
		$('.mailchimp-form').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);		
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').on('keydown', function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").on('click', function() {
			$("#email").val('');
		});
	}


	// Contact Form
	function initContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.contactform');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() === '' ) {
					$(this).addClass('input-error');
				} else {
					$(this).removeClass('input-error');
				}

			});

			function validateEmail(email) { 
				var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return exp.test(email);
			}

			var emailField = $('.contactform :input[type="email"]');

			if( !validateEmail(emailField.val()) ) {
				emailField.addClass('input-error');
			}

			if ($('.contactform :input').hasClass('input-error')) {
				return false;
			} else {
			
				clearTimeout(form_msg_timeout);
				
				$.post(formAction, formData, function(data) {
					var formSubmitMessageData = data;
					formSubmitMessage.html(formSubmitMessageData);

					formFields.val('');

					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
				});

			}

			return false;

		});

	}
	
	
	// Quick Contact Form
	function initOuickContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.quick-contactform');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() === '' ) {
					$(this).addClass('input-error');
				} else {
					$(this).removeClass('input-error');
				}

			});

			function validateEmail(email) { 
				var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return exp.test(email);
			}

			var emailField = $('.quick-contactform :input[type="email"]');

			if( !validateEmail(emailField.val()) ) {
				emailField.addClass('input-error');
			}

			if ($('.quick-contactform :input').hasClass('input-error')) {
				return false;
			} else {
			
				clearTimeout(form_msg_timeout);
				
				$.post(formAction, formData, function(data) {
					var formSubmitMessageData = data;
					formSubmitMessage.html(formSubmitMessageData);

					formFields.val('');

					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
				});

			}

			return false;

		});

	}
	

	// Map
	function intMaps() {
		if ($('.gmap').length>0) {
			$('.gmap').each(function() {
				var adress = $(this).data('adress');
				var zoom = $(this).data('zoom');
				var map_height = $(this).data('height');
				
				if (map_height){
					$('.gmap').css('height',map_height);
				}
			});
		}
	}
	
	// Custom OnLoad Functions
	function initOnLoadFunctions() {
		
		$('.feature-box-container').each(function(){
			$(this).find('.feature-box').setAllToMaxHeight();
		});
		
		$('.equal-section').each(function(){
			$(this).find('.equal-col').setAllToMaxHeight();
		});
		
		jQuery(window).resize(function(){
			$('.feature-box-container').each(function(){
				$(this).find('.feature-box').setAllToMaxHeight();
			});
			$('.equal-section').each(function(){
				$(this).find('.equal-col').setAllToMaxHeight();
			});
		});
		
	}
	

	// WINDOW.LOAD FUNCTION
	$(window).load(function() {
		initPreloader();
		initMasonryLayout();
		initOnLoadFunctions();
	});
	
	// DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {
		initAnimations();
		initFullscreenElements();
		initPageBackground();
		initNavigation();
		initMagnificPopup();
		initFlexslider();
		initPlugins();
		initMailchimp();
		initContactForm();
		initOuickContactForm();
		intMaps();
	});
	
	// WINDOW.RESIZE FUNCTION
	$(window).on('resize', function () {
		initFullscreenElements();
		initMasonryLayout();
	});

})(jQuery);

//Google Tracking Code
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-18721216-17', 'bluminethemes.com');
ga('send', 'pageview');*/