document.addEventListener('DOMContentLoaded', () => {
  // Get modal elements
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  const loginBtn = document.querySelector('button[aria-label="Login"]');
  const signupBtn = document.querySelector('button[aria-label="Sign up"]');
  const closeBtns = document.querySelectorAll('.close-modal');

  // Open modals
  loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });

  signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Close modals
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === signupModal) {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Handle form submissions
  const forms = document.querySelectorAll('.modal-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted:', e.target);
      // Close modal after submission
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });
});
