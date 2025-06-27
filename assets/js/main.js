// Popup Consultation
(() => {
  // Отримуємо всі необхідні елементи
  const popup = document.querySelector('.popup-consultation');
  const overlay = popup?.querySelector('.popup-consultation__overlay');
  const closeBtn = popup?.querySelector('.popup-consultation__close');
  const form = popup?.querySelector('.popup-consultation__form');
  const nameInput = form?.querySelector('[name="name"]');
  const phoneInput = form?.querySelector('[name="phone"]');
  const nameError = form?.querySelector('#consultNameError');
  const phoneError = form?.querySelector('#consultPhoneError');
  const popupWindow = popup?.querySelector('.popup-consultation__window');

  if (!popup || !form || !nameInput || !phoneInput || !nameError || !phoneError || !popupWindow) return;

  // Ключові слова для пошуку кнопок
  const keywords = [
    'Консультація',
    "Створити цифровий пам'ятник",
    'ексклюзивний дизайн',
    'Отримати консультацію',
    'Зв’язатися з нами',
    'Замовити ексклюзивний дизайн',
    'Створити цифровий пам’ятник',
    'Оформити підписку'
  ].map(word => word.toLowerCase().replace(/\s+/g, '').replace(/’/g, "'"));

  // Відкрити попап
  function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Закрити попап
  function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Функція для підключення подій до кнопок
  function attachPopupToButtons() {
    const candidates = document.querySelectorAll('.consult-trigger, .btn, .btn--primary, .btn--outline');

    candidates.forEach(btn => {
      if (btn.dataset.popupAttached === 'true') return;

      const txt = btn.textContent
        ?.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/’/g, "'")
        .trim();

      const matched = keywords.some(word => txt && txt.includes(word));

      if (matched || btn.classList.contains('consult-trigger')) {
        btn.addEventListener('click', e => {
          e.preventDefault();
          openPopup();
        });
        btn.dataset.popupAttached = 'true';
      }
    });
  }

  // Повторно перевіряємо кнопки кожну секунду
  attachPopupToButtons();
  setInterval(attachPopupToButtons, 1000);

  // Закриття
  overlay?.addEventListener('click', closePopup);
  closeBtn?.addEventListener('click', closePopup);
  popup.addEventListener('mousedown', e => {
    if (e.target === popup) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (popup.classList.contains('active') && e.key === 'Escape') {
      closePopup();
    }
  });

  // Обробка форми
  form.addEventListener('submit', e => {
    let valid = true;
    nameError.textContent = '';
    phoneError.textContent = '';

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Введіть ім’я';
      valid = false;
    }

    if (!phoneInput.value.trim()) {
      phoneError.textContent = 'Введіть телефон';
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    form.reset();
    closePopup();
    setTimeout(() => {
      alert('Заявку надіслано!');
    }, 350);
  });
})();



// Mobile Menu
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');
    const overlay = document.querySelector('.mobile-menu__overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu__nav a');
    const content = document.querySelector('.mobile-menu__content');

    function isMobile() {
      return window.innerWidth <= 992;
    }

    function openMenu() {
      if (!isMobile()) return;
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }

    menuBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      openMenu();
    });
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', function () {
      if (!isMobile()) {
        closeMenu();
      }
    });
  });
})();
