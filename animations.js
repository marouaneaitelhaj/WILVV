document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements to animate on scroll
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // Add animation classes to elements on page load
  setTimeout(() => {
    document.querySelectorAll('.section-title').forEach((title, index) => {
      title.classList.add('animate-on-scroll', 'fade-up');
      observer.observe(title);
    });

    document.querySelectorAll('.prize-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll');
      
      if (index % 2 === 0) {
        card.classList.add('fade-left');
      } else {
        card.classList.add('fade-right');
      }
      
      observer.observe(card);
    });

    document.querySelector('.participation-info').classList.add('animate-on-scroll', 'fade-up');
    observer.observe(document.querySelector('.participation-info'));

    document.querySelector('.contest-form').classList.add('animate-on-scroll', 'fade-up');
    observer.observe(document.querySelector('.contest-form'));
  }, 100);

  // Thank you modal functionality
  const modal = document.getElementById('thank-you-modal');
  const closeButton = document.querySelector('.close-button');

  function showModal() {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
      createConfetti();
    }, 10);
  }

  function hideModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  if (closeButton) {
    closeButton.addEventListener('click', hideModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Create confetti effect for the thank you modal
  function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#e91e63', '#ff4081', '#f48fb1', '#c2185b', '#880e4f'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random styling
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      
      confettiContainer.appendChild(confetti);
    }
  }

  // Floating animation for prizes
  document.querySelectorAll('.prize-image').forEach(image => {
    image.classList.add('float-animation');
  });
});