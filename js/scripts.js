(function ($) {
   'use strict';



   // Sticky Active Code ===================================================================

   $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
         $('.header-area-lit, .header-area-drk').addClass('sticky');
         $('.expoled').addClass('nosha');
      } else {
         $('.header-area-lit, .header-area-drk').removeClass('sticky');
         $('.expoled').removeClass('nosha');
      }
   });


   $('#free_quote_btn').on('click', (e) => {
      e.preventDefault()
      var sliderAmount = $('#slider_output').val()
      var sliderIntended = $('#intended_use').val()
      $('#to_finance').val(sliderAmount)
      $('#int_use').val(sliderIntended)
      $('#free_qut_section').removeClass('d-none')
      $('#main_section').addClass('d-none')
      $('html, body').animate({ scrollTop: $("#free_qut_section").offset().top - 100 })
   })

   $('#get_free_qut').on('click', (e) => {
      e.preventDefault()
      $('#free_qut_section').removeClass('d-none')
      $('#main_section').addClass('d-none')
      $('html, body').animate({ scrollTop: $("#free_qut_section").offset().top - 100 })
   })

   var slider = document.getElementById("myRange");
   var output = document.getElementById("slider_output");
   var output2 = document.getElementById("slider_out2");
   var value1 = null
   var value2 = null
   output.value = `$${slider.value}`;
   output2.textContent = Math.ceil(output.value.substr(1) / 51)

   slider.oninput = function () {
      // console.log(this.value)
      switch (this.value.length) {
         case 5:
            value1 = this.value.substr(0, 2) + "," + this.value.substr(2)
            break;
         case 6:
            value1 = this.value.substr(0, 3) + "," + this.value.substr(3)
            break;
         case 7:
            value1 = this.value.substr(0, 1) + "," + this.value.substr(1, 3) + "," + this.value.substr(4)
            break;
         default:
            value1 = this.value
      }
      output.value = `$${value1}`;
      let bt = (Math.ceil(this.value / 51)).toString()
      switch (bt.length) {
         case 4:
            value2 = bt.substr(0, 1) + "," + bt.substr(1)
            break;
         case 5:
            value2 = bt.substr(0, 2) + "," + bt.substr(2)
            break;
         case 6:
            value2 = bt.substr(0, 1) + "," + bt.substr(1, 3) + "," + bt.substr(4)
            break;
         default:
            value2 = bt
      }
      output2.textContent = value2
   }
   // function to display error notice
   const displayError = (message) => {
      $('.error').text(message)
      $('html, body').animate({ scrollTop: $('.error').offset().top - 100 })
   }
   // function to submit free quote to the server
   $('#gsheet1_btn').on('click', async (e) => {
      e.preventDefault()
      var annualRef = $('#annual_revenue').val()
      var creditScore = $('#credit_score').val()
      var bizYears = $('#business_years').val()
      var firstName = $('#first_name').val()
      var lastName = $('#last_name').val()
      var email = $('#email').val()
      var companyName = $('#company_name').val()
      var mobile = $('#phone').val()
      var checkbox = $('#gsheet1_checkbox').prop('checked')

      if (annualRef === '') {
         return displayError('Annual Revenue is required');
      }
      if (creditScore === '') {
         return displayError('Credit Score is required');
      }
      if (bizYears === '') {
         return displayError('Business year is required');
      }
      if (firstName === '') {
         return displayError('First Name is required');
      }
      if (!/^[a-z]+$/i.test(firstName.trim())) {
         return displayError('First Name requires text only')
      }
      if (lastName === '') {
         return displayError('Last Name is required');
      }
      if (!/^[a-z]+$/i.test(lastName.trim())) {
         return displayError('Last Name requires text only')
      }
      if (email === '') {
         return displayError('Email is required');
      }
      if (companyName === '') {
         return displayError('Company is required');
      }
      if (mobile === '') {
         return displayError('Mobile number is required');
      }
      if (isNaN(mobile)) {
         return displayError('Invalid Mobile number');
      }
      if (!email.includes('@')) {
         return displayError('Invalid Email');
      }
      if (!email.includes('.')) {
         return displayError('Invalid Email');
      }
      if (!checkbox) {
         return displayError('You have to accept the terms and conditions');
      }
      displayError('')

      $('.spinner').removeClass('d-none')
      // get the user IP address
      let userIp = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
      $('input[name="ip_address"').val(userIp.ip)
      // get all the form input
      const form1 = document.forms['free_gsheet_1']

      // const addr = 'https://script.google.com/macros/s/AKfycbx8yPqcjT4VDKbRWYx4Xj_gjPZRX6gvC2hSmVR_WuD4HLvbcVs/exec'
      const addr = 'https://script.google.com/macros/s/AKfycbwBtjlfYgurpJM2vlp4IyjH07FNc4vHtCs8jIeWQH8kLcprPIk/exec'
      fetch(addr, { method: 'POST', body: new FormData(form1) })
         .then(response => {
            $('.main-container').html(appreciate)
            $('html,body').animate({ scrollTop: $('#thanks_for').offset().top - 100 });
            dataLayer.push({ 'event': 'CompleteRegistration' });
         })
         .catch(error => {
            return displayError('Sorry your request could not be submitted, try again');
         })
   })

   // function to submit free quote to the server
   $('#gsheet2_btn').on('click', async (e) => {
      e.preventDefault()
      var toFinance = $('#to_finance').val()
      var annualRef = $('#annual_sale').val()
      var bizYears = $('#biz_years').val()
      var firstName = $('#first_nam').val()
      var lastName = $('#last_nam').val()
      var email = $('#emai').val()
      var companyName = $('#legal_name').val()
      var mobile = $('#mobil').val()
      // var checkbox = $('#gsheet1_checkbox').prop('checked')

      if (toFinance === '') {
         return displayError('To be finance is required');
      }
      if (isNaN(toFinance.trim().replace(/[\$\,]/g, ''))) {
         return displayError('To be finance should be monetary value');
      }
      if (annualRef === '') {
         return displayError('Annual Revenue is required');
      }
      if (bizYears === '') {
         return displayError('Business year is required');
      }
      if (firstName === '') {
         return displayError('First Name is required');
      }
      if (!/^[a-z]+$/i.test(firstName.trim())) {
         return displayError('First Name requires text only')
      }
      if (lastName === '') {
         return displayError('Last Name is required');
      }
      if (!/^[a-z]+$/i.test(lastName.trim())) {
         return displayError('Last Name requires text only')
      }
      if (email === '') {
         return displayError('Email is required');
      }
      if (companyName === '') {
         return displayError('Company is required');
      }
      if (mobile === '') {
         return displayError('Mobile number is required');
      }
      if (isNaN(mobile)) {
         return displayError('Invalid Mobile number');
      }
      if (!email.includes('@')) {
         return displayError('Invalid Email');
      }
      if (!email.includes('.')) {
         return displayError('Invalid Email');
      }
      displayError('')
      $('.spin').removeClass('d-none')
      // get the user IP address
      let userIp = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
      $('input[name="ip_address"').val(userIp.ip)
      // get all the form input
      const form1 = document.forms['free_gsheet_2']

      // const addr = 'https://script.google.com/macros/s/AKfycbx8yPqcjT4VDKbRWYx4Xj_gjPZRX6gvC2hSmVR_WuD4HLvbcVs/exec'
      const addr = 'https://script.google.com/macros/s/AKfycbwBtjlfYgurpJM2vlp4IyjH07FNc4vHtCs8jIeWQH8kLcprPIk/exec'
      fetch(addr, { method: 'POST', body: new FormData(form1) })
         .then(response => {
            $('.main-container').html(appreciate)
            $('html,body').animate({ scrollTop: $('#thanks_for').offset().top - 100 });
            dataLayer.push({ 'event': 'CompleteRegistration' });
         })
         .catch(error => {
            return displayError('Sorry your request could not be submitted, try again');
         })
   })

   const appreciate = `
<div class="text-center" id="thanks_for" style="margin-top:80px">
   <h1 class="blue-color" style="font-family:monospace; margin-bottom:50px">THANKS FOR YOUR REQUEST</h1>
<h3 class="green-color" style="margin-bottom:200px; font-family:monospace;">A member of our finance team will be in touch with you shortly.</h3></div>`


   // Welcome Slider Active Code ===================================================================

   // $(".main-slide").owlCarousel({
   //    nav: false, // Show next and prev buttons
   //    slideSpeed: 100,
   //    paginationSpeed: 100,
   //    singleItem: true,
   //    loop: true,
   //    dot: false,
   //    autoPlay: true,
   //    responsive: {
   //       0: {
   //          items: 1
   //       },
   //       600: {
   //          items: 1
   //       },
   //       1000: {
   //          items: 1
   //       }
   //    }
   // });

   $("#content-slider").lightSlider({
      loop: true,
      keyPress: true
   });
   $('#image-gallery').lightSlider({
      gallery: true,
      item: 1,
      thumbItem: 9,
      slideMargin: 0,
      speed: 500,
      auto: true,
      loop: true,
      onSliderLoad: function () {
         $('#image-gallery').removeClass('cS-hidden');
      }
   });


   //Gallery Slider ================================================================================

   $(".gallery-slide").owlCarousel({
      smartSpeed: 450,
      loop: true,
      autoplay: true,
      autoplayTimeout: 1500,
      margin: 5,
      bullet: false,
      responsive: {
         0: {
            items: 2
         },
         480: {
            items: 2
         },
         800: {
            items: 3
         },
         900: {
            items: 4
         },
         1000: {
            items: 5
         },
         1200: {
            items: 6
         },
         1400: {
            items: 7
         }
      }
   });


   //Review Slider =================================================================================

   $(".review-slider").owlCarousel({
      nav: false, // Show next and prev buttons
      slideSpeed: 500,
      singleItem: true,
      paginationSpeed: 400,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
         0: {
            items: 1
         },
         600: {
            items: 1
         },
         1000: {
            items: 2
         }
      }
   });




   // Partner Slider Active Code ===================================================================

   $(".partner-slide").owlCarousel({
      smartSpeed: 450,
      loop: true,
      autoplay: true,
      autoplayTimeout: 1500,
      margin: 5,
      bullet: false,
      responsive: {
         0: {
            items: 1
         },
         450: {
            items: 2
         },
         600: {
            items: 3
         },
         800: {
            items: 3
         },
         900: {
            items: 4
         },
         1000: {
            items: 5
         }
      }
   });


   // Mobile Menu  =================================================================================

   $('#nav').slicknav({
      label: '',
      closeOnClick: true,
      prependTo: '#mobile-menu '
   });




   //Timer  ========================================================================================

   $('.counter').counterUp({
      time: 2000
   });


   // Preloader active code  ==============================================================================

   $(window).on('load', function () {
      $('body').css('overflow-y', 'visible');
      $('#preloader').fadeOut('slow', function () {
         $(this).remove();
      });
   });



   // Active Menu Js  ==============================================================================

   var elm = document.querySelector('#header');
   var ms = new MenuSpy(elm);



   // WOW Js  ====================================================================================
   new WOW().init();


   // Smoth Scroll  ================================================================================

   // Smoth Scroll
   smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
      selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      offset: 70, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
      callback: function (anchor, toggle) { } // Function to run after scrolling
   });


})(jQuery);