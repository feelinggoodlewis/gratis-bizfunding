$(document).ready(() => {
   // function to display error notice
   const displayError = (message) => {
      $('.error').text(message)
      $('html, body').animate({ scrollTop: $('.error').offset().top - 100 })
   }
   // function to submit free quote to the server
   $('#gsheet1_btn').on('click', (e) => {
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
      const form1 = document.forms['free_gsheet_1']

      const addr = 'https://script.google.com/macros/s/AKfycbx8yPqcjT4VDKbRWYx4Xj_gjPZRX6gvC2hSmVR_WuD4HLvbcVs/exec'
      $('.spinner').removeClass('d-none')
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

   const appreciate = `
<div class="text-center" id="thanks_for" style="margin-top:80px">
   <h1 class="blue-color" style="font-family:monospace; margin-bottom:50px">THANKS FOR YOUR REQUEST</h1>
<h3 class="green-color px-2" style="margin-bottom:200px; font-family:monospace;">A member of our finance team will be in touch with you shortly.</h3></div>`

})