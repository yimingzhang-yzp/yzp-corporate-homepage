document.addEventListener('DOMContentLoaded', () => {

  // === HAMBURGER MENU ===
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__nav');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // メニュー内リンクをタップしたら閉じる
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', false);
      });
    });

    // メニュー外タップで閉じる
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', false);
      }
    });
  }


  // === SCROLL ANIMATION ===
  const animationTargets = document.querySelectorAll(
    '.hero-section, .services-section, .about-section, .contact-section, [data-animate]'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animationTargets.forEach((el) => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  } else {
    // IntersectionObserver 非対応ブラウザはすべて表示
    animationTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // スクロール中のナビバー背景切り替え
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期状態を反映


  // === FORM VALIDATION ===
  const contactForm = document.querySelector('.contact-section form');

  if (contactForm) {
    const showError = (field, message) => {
      field.classList.add('is-error');
      let errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error';
        field.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = message;
    };

    const clearError = (field) => {
      field.classList.remove('is-error');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.remove();
    };

    const validateField = (field) => {
      const value = field.value.trim();
      const name = field.name || field.id;

      if (field.required && value === '') {
        showError(field, 'この項目は必須です。');
        return false;
      }

      if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          showError(field, '正しいメールアドレスを入力してください。');
          return false;
        }
      }

      if (field.dataset.minlength) {
        const min = parseInt(field.dataset.minlength, 10);
        if (value.length < min) {
          showError(field, `${min}文字以上で入力してください。`);
          return false;
        }
      }

      clearError(field);
      return true;
    };

    // フォーカスが外れたときにリアルタイムバリデーション
    contactForm.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-error')) validateField(field);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = contactForm.querySelectorAll('input, textarea, select');
      let isValid = true;

      fields.forEach((field) => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) return;

      // バリデーション通過後の送信処理（fetch など）をここに追加
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';
      }

      // TODO: fetch('/api/contact', { method: 'POST', ... }) などに差し替える
      setTimeout(() => {
        contactForm.reset();
        const successMsg = document.createElement('p');
        successMsg.className = 'form-success';
        successMsg.textContent = 'お問い合わせを受け付けました。ありがとうございます。';
        contactForm.appendChild(successMsg);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '送信する';
        }

        setTimeout(() => successMsg.remove(), 5000);
      }, 800);
    });
  }

});
