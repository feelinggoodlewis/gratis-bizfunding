$(document).ready(() => {
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
      var intendedUse = $('#int_use').val()
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
      if (firstName.trim().length < 2 || lastName.trim().length < 2) {
         return displayError('Invalid Name')
      }
      if (email === '') {
         return displayError('Email is required');
      }
      if (intendedUse === '') {
         return displayError('Use Case not selected')
      }
      if (companyName === '') {
         return displayError('Company is required');
      }
      if (companyName.length < 4) {
         return displayError('Correct Company name is required')
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
      if (!email.match(/[a-zA-Z0-9_\.\-]+\@\w+\.[a-z]{2,}\.?[a-z]{0,}?$/)) {
         return displayError('Invalid email entered')
      }
      if (!checkbox) {
         return displayError('You have to accept the terms and conditions');
      }
      displayError('')
      $('.spinner').removeClass('d-none')
      // get the user IP address
      let userIp = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
      $('input[name="ip_address"').val(userIp.ip)
      //get the form data
      const form1 = document.forms['free_gsheet_1']
      //  const addr = 'https://script.google.com/macros/s/AKfycbx8yPqcjT4VDKbRWYx4Xj_gjPZRX6gvC2hSmVR_WuD4HLvbcVs/exec'
      const addr = 'https://script.google.com/macros/s/AKfycbwBtjlfYgurpJM2vlp4IyjH07FNc4vHtCs8jIeWQH8kLcprPIk/exec'
      fetch(addr, { method: 'POST', body: new FormData(form1) })
         .then(response => {
            $('.form-tab').html(appreciate)
            $('html,body').animate({ scrollTop: $('#thanks_for').offset().top - 100 });
            dataLayer.push({ 'event': 'CompleteRegistration' });
         })
         .catch(error => {
            return displayError('Sorry your request could not be submitted, try again');
         })
   })
   // scroll to the form when clicked
   $('.disable_iscroll').on('click', () => {
      $('.biz-section').removeClass('d-none')
      $('.btn-danger').addClass('d-none')
      $('html, body').animate({ scrollTop: $('.biz-section').offset().top - 100 }, 400)
   })


   var slider = document.getElementById("myRange");
   var output = document.getElementById("slider_output");
   var outputReal = $('input[name="to_be_finance"');
   var value1 = null
   output.value = `$${slider.value}`;
   outputReal.val(`$${slider.value}`)

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
      outputReal.val(`$${value1}`)
   }

   const appreciate = `
<div class="text-center" id="thanks_for" style="margin-top:80px">
   <h1 class="blue-color" style="font-family:monospace; margin-bottom:50px">THANKS FOR YOUR REQUEST</h1>
<h3 class="green-color px-2" style="margin-bottom:200px; font-family:monospace;">A member of our finance team will be in touch with you shortly.</h3></div>`

})