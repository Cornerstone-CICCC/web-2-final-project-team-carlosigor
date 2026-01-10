// @ts-nocheck
import emailjs from '@emailjs/browser';


const PUBLIC_KEY = 'xnCBBFjLBLZ8kDhWo';
const SERVICE_ID = 'service_s9dqp27';
const TEMPLATE_ID = 'template_0r9247l';

emailjs.init(PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && submitButton && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
       
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          contactForm
        );

       
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you! Your request has been submitted successfully.';

        contactForm.reset();

        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 5000);

      } catch (error) {
      
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Something went wrong. Please try again later.';
        console.error('EmailJS Error:', error);

        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 5000);
      } finally {
        
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
      }
    });
  }
});
