(function($) {
	$(document).ready(function(){
	
		// SET COOKIE CURRENCY =====================================================================================
		var currencyCookie = $.cookie('currency');
		if ( currencyCookie == undefined ) {
			Currency.cookie.write(theme.shopCurrency);
		}


		// CURRENCY SELECTOR ========================================================================================
		if ( typeof theme.shopCurrency != 'undefined' ) {

			var shopCurrency = theme.shopCurrency;

			// Sometimes merchants change their shop currency, let's tell our JavaScript file
			Currency.money_with_currency_format[shopCurrency] = theme.moneyFormatCurrency;
			Currency.money_format[shopCurrency] = theme.moneyFormat;

			// Cookie currency
			var cookieCurrency = Currency.cookie.read();

			// Saving the current price
			$('span.money').each(function() {
				$(this).attr( 'data-currency-' + theme.shopCurrency, $(this).html() );
			});

			
			



			// CHANGE CONTROLL ELEMENT DESKTOP/MOBILE
			if ( $(window).width() > 991 ) {
				var currencyActive = $('#currency_active');
				var currencySelector = $('#currency_selector');
				var currencySelectorItem = $('.currency_selector__item');


				currencySelectorItem.on('click', function(e) {
					var newCurrency = $(this).data('value');
					Currency.convertAll( Currency.currentCurrency, newCurrency, 'span.money', 'money_format' );
					currencyActive.text(newCurrency);

					currencyActive.removeClass('opened');
					currencySelector.removeClass('opened');

				});

				currencySelectorItem.each(function() {
					var currencyValue = $(this).data('value');

					if ( currencyValue == cookieCurrency ) {
						currencyActive.text(currencyValue);
					};

				});

				currencyActive.on('click', function() {
					if ( currencyActive.hasClass('opened') ) {
						currencyActive.removeClass('opened');
						currencySelector.removeClass('opened');
					}
					else {
						currencyActive.addClass('opened');
						currencySelector.addClass('opened');
					};
				});

				$(document).on('click', function(){
					if ( currencyActive.hasClass('opened') ) {
						currencyActive.removeClass('opened');
						currencySelector.removeClass('opened');
					};
				});

				currencyActive.on('click', function(e) {
					e.stopPropagation();
				});

				// If there's no cookie.
				if ( cookieCurrency == null ) {
					Currency.currentCurrency = shopCurrency;
				}
				// If the cookie value does not correspond to any value in the currency dropdown.
				else if ( $('#currency_selector li[data-value=' + cookieCurrency + ']').length === 0 ) {
					Currency.currentCurrency = shopCurrency;
					Currency.cookie.write(shopCurrency);
				}
				else if ( cookieCurrency === shopCurrency ) {
					Currency.currentCurrency = shopCurrency;
				}
				else {
					Currency.convertAll( shopCurrency, cookieCurrency, 'span.money', 'money_format' );
				};

				
			} else {
				var currencySelectorItem = $('.menu_currency_selector__item');

				currencySelectorItem.on('click', function(e) {
					var newCurrency = $(this).val();
					Currency.convertAll( Currency.currentCurrency, newCurrency, 'span.money', 'money_format' );
					$(this).parent().addClass('current').siblings().removeClass('current');
					Currency.cookie.write(newCurrency);
				});

				currencySelectorItem.each(function() {
					var currencyValue = $(this).val();

					if ( currencyValue == cookieCurrency ) {
						$(this).parent().addClass('current').siblings().removeClass('current');
					};

				});

				// If there's no cookie.
				if ( cookieCurrency == null ) {
					Currency.currentCurrency = shopCurrency;
				}
				else if ( cookieCurrency === shopCurrency ) {
					Currency.currentCurrency = shopCurrency;
				}
				else {
					Currency.convertAll( shopCurrency, cookieCurrency, 'span.money', 'money_format' );
				};
			}


		};


		// MEGAMENU =================================================================================================
		var mobFlag = 0;

		megamenuToggle = function() {
			if ( $(window).width() > 991 ) {
				$('#megamenu').removeClass('megamenu_mobile').addClass('megamenu_desktop');

				$('#megamenu_level__1').superfish();

				$('#megamenu .level_1, #megamenu .level_2, #megamenu .level_3').removeAttr('style');

				$('#megamenu_mobile_toggle, .megamenu_trigger').off('.mobileMenu').removeClass('off active');

				$('#megamenu_level__1, #megamenu_mobile_close').removeClass('on');

				$('html, body').css('overflow', 'auto');

				mobFlag = 0;
				
				turnMenuDropdownSide();
			}
			else {
				$('#megamenu_level__1, #megamenu_mobile_close').hide();
				$('#megamenu').removeClass('megamenu_desktop').addClass('megamenu_mobile');

				$('#megamenu_level__1').superfish('destroy');

				if ( mobFlag == 0 ) {
					menuMobile();
					mobFlag = 1;
				};
			};
		};

		menuMobile = function() {
			$('#megamenu_mobile_toggle').on('click.mobileMenu', function(){
				$('#megamenu_level__1, #megamenu_mobile_close').show().addClass('on');

				$('html, body').css({'overflow': 'hidden', 'position':'fixed', 'top': '0', 'left': '0', 'right': '0'});

			});

			$('#megamenu_mobile_close').on('click', function() {
				$('#megamenu_level__1, #megamenu_mobile_close').removeClass('on');

				$('html, body').css({'overflow': 'auto', 'position':'static'});

			});

			$('.megamenu_trigger').on('click.mobileMenu', function() {
				var targetMenu = '#' + $(this).data('submenu');

				$(targetMenu).slideToggle(300);

				$(this).toggleClass('active');

				return false;
			});

		};


		// WATCH MENU DROP SIDE   ====================================================================================
		turnMenuDropdownSide = function() {
			$('#megamenu .level_2__small').each(function(i){
				if ( ($(this).offset().left + 470) > $(window).width() ){
					$(this).find('.droped_linklist').addClass('left_side');
				}
			});
		};



		// STICKY MENU  ==============================================================================================
		stickyHeader = function() {

			var target = $('#page_header');
			var pseudo = $('#pseudo_sticky_block');
			var stick_class = 'megamenu_stuck';

			$(window).on('load scroll resize', function() {

				if ( $(window).width() > 991 ) {
					var scrolledValue = parseInt( $(window).scrollTop() );
					var offsetValue = parseInt( pseudo.offset().top );
					var headHeight = target.outerHeight();

					if ( scrolledValue > offsetValue ) {
						target.addClass( stick_class );
						pseudo.css({ 'height' : headHeight });
					}
					else {
						target.removeClass( stick_class );
						pseudo.css({ 'height' : 0 });
					};
				}
				else {
					target.removeClass( stick_class );
					pseudo.css({ 'height' : 0 });
				};

			});

			$(window).on('load', function() {
				setTimeout( 
					function(){ $(window).trigger('scroll') }
				, 180 );
			});

		};

		stickyHeader();
		megamenuToggle();




		// SEARCH TOGGLE  ===========================================================================================
		var headerSearchForm = $('header .search_form_wrap');

		$('.search_toggle').on('click', function(e){
			if ( headerSearchForm.hasClass('open') ){
				headerSearchForm.removeClass('open');
				$(this).removeClass('open');
			} else {
				headerSearchForm.addClass('open');
				$(this).addClass('open');
			}
		});

		$('header .search_form_wrap .search_form_cover').on('click',function (e) {
			if ( headerSearchForm.hasClass('open') ) {
				headerSearchForm.removeClass('open');
				$('.search_toggle').removeClass('open');
				$('#search_result_container').removeClass('active').html('');
			};
		});

		$('.search_form_close').on('click', function(e){
			headerSearchForm.removeClass('open');
			$('.search_toggle').removeClass('open');
			$('#search_result_container').removeClass('active').html('');
		});
		

		// AJAX SEARCH  =============================================================================================
			if( theme.searchAjaxOn ){
		var container = $('#search_result_container');
		var url = '/search?q=';
  

		$('.header_search input[type=search]').on('keyup', function(e){
			var inputVal = $(this).val(),
				_that = $(this);

			if(_that){ 
				setTimeout(function(){
					return false;
				}, 0);
			}

			if(e.key == "Backspace" || e.key == "Delete"){ 
				container.load(url + inputVal + ' #hidden_search_result> *');
			}

			if( inputVal.length > 2 ){
				container.addClass('active');
				container.load(url + inputVal + ' #hidden_search_result> *', function(){

					var list = container.find('ul');

					if ( parseInt( list.data('count_result') ) > 10 ){
						list.append('<li class="centred"><a href="' + url + inputVal + '">' + list.data('caption') + ': ' + list.data('count_result') + '</a></li>');
					}
				});
			}
		});
	};

		// FOOTER NEWSLETTER FORM   =================================================================================
		$('.footer_newsletter_form').each(function (){   
			$(this).on('submit', function(e){
				var formCookie = $(this).attr('class');
				$.cookie('footerformSended', formCookie);
			});
		});
		
		if( document.location.href.indexOf('?customer_posted=true') > 0 && $.cookie('footerformSended') == 'footer_newsletter_form') {
			$('.footer_newsletter_form .form_wrapper').hide();
			$('.footer_newsletter_form .alert-success').show();
		}


	});

})(jQuery);