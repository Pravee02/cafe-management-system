document.addEventListener('DOMContentLoaded', () => {
  initLocalStorageDefaults();
  initMobileMenu();
  initLightbox();
  revealPageContent();
});

/* ==========================================
   INITIALIZE LOCALSTORAGE DEFAULT DATA
   ========================================== */
function initLocalStorageDefaults() {
  // Default Today's Special
  if (!localStorage.getItem('zoop_today_special')) {
    const defaultSpecial = {
      name: "Rose & Honey Specialty Latte",
      price: 129,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80",
      description: "A student favorite! Double shot of aromatic Arabica espresso, steamed milk, organic honey infusion, and fresh rose petal garnish. Sweet, warm, and highly energizing."
    };
    localStorage.setItem('zoop_today_special', JSON.stringify(defaultSpecial));
  }

  // Default Special Offers
  if (!localStorage.getItem('zoop_special_offers')) {
    const defaultOffers = [
      {
        id: "off1",
        tag: "Campus Deal",
        title: "Semester Survival Combo",
        desc: "A signature Cheesy Lava Burger, crispy skin-on French Fries, and a piping hot Adrak Elaichi Cutting Chai.",
        price: "₹169"
      },
      {
        id: "off2",
        tag: "Weekend Vibe",
        title: "Sunday Hangout Platter",
        desc: "Order any two of our hand-stretched sourdough pizzas and get two chilled mocktails of your choice free.",
        price: "Free Mocktails"
      },
      {
        id: "off3",
        tag: "Birthday Treat",
        title: "Birthday Bash Discount",
        desc: "Host your party at Zoop! Get flat 20% off your total bill and a complimentary Belgian chocolate shake.",
        price: "Flat 20% Off"
      }
    ];
    localStorage.setItem('zoop_special_offers', JSON.stringify(defaultOffers));
  }
}

/* ==========================================
   REVEAL PAGE CONTENT ON LOAD
   ========================================== */
function revealPageContent() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

  // GSAP Fade-in Entrance
  gsap.from('.navbar, .header-mobile', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  if (document.querySelector('.hero-content')) {
    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
}

/* ==========================================
   MOBILE NAVIGATION MENU & DRAWER
   ========================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle-btn');
  const drawer = document.querySelector('.menu-drawer');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo('.drawer-link', 
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Active state based on URL
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-item, .drawer-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === 'index.html' && href === './') || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll Header Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const headerMobile = document.querySelector('.header-mobile');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
      headerMobile?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
      headerMobile?.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   LIGHTBOX MODAL
   ========================================== */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg) return;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-lightbox]');
    if (target) {
      e.preventDefault();
      const imgSrc = target.getAttribute('href') || target.getAttribute('src') || target.dataset.src;
      if (imgSrc) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}
