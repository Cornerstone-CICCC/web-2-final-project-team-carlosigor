// @ts-nocheck
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = 'xnCBBFjLBLZ8kDhWo';
const SERVICE_ID = 'service_s9dqp27';
const TEMPLATE_ID = 'template_lvpeldt';

emailjs.init(PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form-news');

    forms.forEach((contactForm) => {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formStatus = contactForm.querySelector('.news-status');

        if (!submitButton || !formStatus) return;

        const originalText = submitButton.textContent;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Im in');

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
                alert('Thank you for subscribing')
                // formStatus.className = 'form-status success';
                // formStatus.textContent = 'Thank you! Your request has been submitted successfully.';

                contactForm.reset();

                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 5000);

            } catch (error) {
                alert('Something went wrong. Please try again later.')
                // formStatus.className = 'form-status error';
                // formStatus.textContent = 'Something went wrong. Please try again later.';
                console.error('EmailJS Error:', error);

                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 5000);

            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
});
