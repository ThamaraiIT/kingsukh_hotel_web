// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks){
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const href = a.getAttribute('href');
    if (lightbox && lightboxImg){
      lightboxImg.src = href;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});

if (lightbox){
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose){
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
}

// Sticky booking bar
const stickyBooking = document.getElementById('stickyBooking');
if (stickyBooking) {
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 300) {
      stickyBooking.classList.add('show');
    } else {
      stickyBooking.classList.remove('show');
    }
    lastScrollTop = scrollTop;
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form progress indicator
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const progressSteps = contactForm.querySelectorAll('.progress-step');
  const formFields = contactForm.querySelectorAll('input, textarea, select');
  
  // Update progress on field focus
  formFields.forEach((field, index) => {
    field.addEventListener('focus', () => {
      updateProgress(index + 1);
    });
    
    field.addEventListener('blur', () => {
      if (field.value.trim()) {
        updateProgress(index + 1);
      }
    });
  });
  
  function updateProgress(step) {
    progressSteps.forEach((stepEl, index) => {
      if (index < step) {
        stepEl.classList.add('completed');
        stepEl.classList.remove('active');
      } else if (index === step) {
        stepEl.classList.add('active');
        stepEl.classList.remove('completed');
      } else {
        stepEl.classList.remove('active', 'completed');
      }
    });
  }
}

// Enhanced contact form handler with validation and messages
const form = document.getElementById('contactForm');
if (form){
  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.className = 'form__message';
  form.insertBefore(messageContainer, form.firstChild);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    
    if (!name || !email || !message) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    showMessage('Sending your message...', 'success');
    
    setTimeout(() => {
      showMessage('Thanks! Your message has been received. We will contact you shortly.', 'success');
      form.reset();
      // Reset progress
      form.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index === 0) {
          step.classList.add('active');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
    }, 1500);
  });
  
  function showMessage(text, type) {
    const messageEl = form.querySelector('.form__message');
    messageEl.textContent = text;
    messageEl.className = `form__message ${type}`;
    messageEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 5000);
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Initialize AOS animations if available
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });
}
