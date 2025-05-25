document.addEventListener('DOMContentLoaded', function() {
  const contestForm = document.getElementById('contest-form');
  const phoneInput = document.getElementById('phone');
  const termsCheckbox = document.getElementById('terms');
  const phoneError = document.getElementById('phone-error');
  const termsError = document.getElementById('terms-error');
  
  const phonePattern = /^0[5-7][0-9]{8}$/;
  
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) value = value.substring(0, 2) + ' ' + value.substring(2);
    if (value.length > 5) value = value.substring(0, 5) + ' ' + value.substring(5);
    if (value.length > 8) value = value.substring(0, 8) + ' ' + value.substring(8);
    if (value.length > 11) value = value.substring(0, 11);
    
    e.target.value = value;
    phoneError.textContent = '';
  });
  
  contestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    phoneError.textContent = '';
    termsError.textContent = '';
    
    const phoneValue = phoneInput.value.replace(/\s/g, '');
    if (!phonePattern.test(phoneValue)) {
      phoneError.textContent = 'Oups ! Ce numéro ne semble pas valide. Essayez avec un numéro marocain (06, 07 ou 05)';
      isValid = false;
      
      phoneInput.classList.add('shake');
      setTimeout(() => phoneInput.classList.remove('shake'), 500);
    }
    
    if (!termsCheckbox.checked) {
      termsError.textContent = 'Pour participer, il faut accepter de tenter sa chance ! 😊';
      isValid = false;
    }
    
    if (isValid) {
      const submitButton = contestForm.querySelector('.submit-button');
      submitButton.innerHTML = '<span class="button-text">Participation enregistrée !</span> <span class="button-icon">🎉</span>';
      submitButton.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        contestForm.reset();
        submitButton.innerHTML = '<span class="button-text">Je Tente Ma Chance</span> <span class="button-icon">✨</span>';
        submitButton.style.backgroundColor = '';
        
        const modal = document.getElementById('thank-you-modal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
      }, 1500);
    }
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const prizeCards = document.querySelectorAll('.prize-card');
  prizeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('featured') 
        ? 'scale(1.08) translateY(-10px)' 
        : 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = this.classList.contains('featured') 
        ? 'scale(1.05)' 
        : '';
    });
  });
  
  const modal = document.getElementById('thank-you-modal');
  const closeButton = document.querySelector('.close-button');
  
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
    });
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
    }
  });
});