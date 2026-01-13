document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-src');
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const sendAnother = document.getElementById('send-another');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required';
      isValid = false;
    } else if (nameInput.value.trim().length > 100) {
      nameError.textContent = 'Name must be less than 100 characters';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = 'Message is required';
      isValid = false;
    } else if (messageInput.value.trim().length > 1000) {
      messageError.textContent = 'Message must be less than 1000 characters';
      isValid = false;
    } else {
      messageError.textContent = '';
    }

    return isValid;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      contactForm.classList.add('hidden');
      formSuccess.classList.add('active');
      
      contactForm.reset();
    }
  });

  sendAnother.addEventListener('click', () => {
    formSuccess.classList.remove('active');
    contactForm.classList.remove('hidden');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
