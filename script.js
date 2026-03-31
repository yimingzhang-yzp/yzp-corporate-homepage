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


  // === SCROLL ANIMATION (Intersection Observer) ===
  if ('IntersectionObserver' in window) {

    // セクション見出し・リード：フェードイン
    const sectionHeaders = document.querySelectorAll(
      '.services-section .section-title, .services-section .section-lead,' +
      '.results-section .section-title, .results-section .section-lead,' +
      '.cases-section .section-title, .cases-section .section-lead,' +
      '.about-section .section-title, .about-section .section-lead,' +
      '.news-section .section-title, .news-section .section-lead,' +
      '.contact-section .section-title, .contact-section .section-lead'
    );

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            headerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionHeaders.forEach((el) => {
      el.classList.add('animate-on-scroll');
      headerObserver.observe(el);
    });

    // サービスカード：リストが見えたら130ms 刻みでスタガーフェードイン
    const servicesList = document.querySelector('.services-section__list');
    if (servicesList) {
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.services-section__item').forEach((card, i) => {
                card.classList.add('animate-on-scroll');
                setTimeout(() => card.classList.add('is-visible'), i * 130);
              });
              cardObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      cardObserver.observe(servicesList);
    }

    // About・Contact・Results・News のコンテンツブロック：フェードイン
    const contentBlocks = document.querySelectorAll(
      '.about-section__text, .about-section__profile,' +
      '.results-section__stats,' +
      '.cases-section__list,' +
      '.news-section__list,' +
      '.contact-section__form'
    );

    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            contentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    contentBlocks.forEach((el, i) => {
      el.classList.add('animate-on-scroll');
      el.style.transitionDelay = `${i % 2 * 0.12}s`;
      contentObserver.observe(el);
    });

  } else {
    // IntersectionObserver 非対応ブラウザはすべて即時表示
    document.querySelectorAll(
      '.services-section .section-title, .services-section .section-lead,' +
      '.results-section .section-title, .results-section .section-lead,' +
      '.cases-section .section-title, .cases-section .section-lead,' +
      '.about-section .section-title, .about-section .section-lead,' +
      '.news-section .section-title, .news-section .section-lead,' +
      '.contact-section .section-title, .contact-section .section-lead,' +
      '.services-section__item, .about-section__text,' +
      '.about-section__profile, .results-section__stats,' +
      '.cases-section__list, .news-section__list,' +
      '.contact-section__form'
    ).forEach((el) => el.classList.add('is-visible'));
  }


  // === NAVBAR：スクロールで backdrop-filter ぼかし効果 ===
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期状態を反映


  // === PARALLAX（ヒーロー背景） ===
  const heroBg = document.querySelector('.hero-section__bg');
  if (heroBg) {
    const heroHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // ヒーローが画面内にある間だけ実行
      if (scrollY <= heroHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }


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
