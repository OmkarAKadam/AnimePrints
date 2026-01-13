document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeElements.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        const src = img.getAttribute('data-full') || img.src;
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.documentElement.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
      document.documentElement.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const sendAnother = document.getElementById('send-another');

  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById('name'),
        error: document.getElementById('name-error'),
        max: 100,
        message: 'Name is required'
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('email-error'),
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email'
      },
      message: {
        input: document.getElementById('message'),
        error: document.getElementById('message-error'),
        max: 1000,
        message: 'Message is required'
      }
    };

    const validateField = field => {
      const value = field.input.value.trim();
      let valid = true;

      if (!value) valid = false;
      if (field.max && value.length > field.max) valid = false;
      if (field.pattern && !field.pattern.test(value)) valid = false;

      field.error.textContent = valid ? '' : field.message;
      return valid;
    };

    Object.values(fields).forEach(field => {
      field.input.addEventListener('input', () => validateField(field));
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const valid = Object.values(fields).every(validateField);

      if (valid) {
        contactForm.classList.add('hidden');
        formSuccess.classList.add('active');
        contactForm.reset();
      }
    });

    sendAnother?.addEventListener('click', () => {
      formSuccess.classList.remove('active');
      contactForm.classList.remove('hidden');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});