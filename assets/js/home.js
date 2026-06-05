document.addEventListener('DOMContentLoaded', () => {
  if (window.adminAuthChecked) {
    initHomePage();
  } else {
    document.addEventListener('adminAuthChecked', initHomePage);
  }

  function initHomePage() {
    if (initHomePage.hasRun) return;
    initHomePage.hasRun = true;

    initGSAPScrollAnimations();

    // Register CMS refresh Hook (Empty for Home now as it's static)
    window.refreshCMSPage = function(page) {
      // No dynamic components on home that need CMS refresh anymore
    };
  }
});

/* ==========================================
   GSAP SCROLL TRIGGER ANIMATIONS
   ========================================== */
function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  // Since ScrollTrigger is not loaded by default, we only run if it is registered
  if (typeof ScrollTrigger !== 'undefined') {
    // Parallax Hero background effect
    gsap.to('.hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Smooth entrance for home section headings
    gsap.from('.section-title-wrapper', {
      scrollTrigger: {
        trigger: '.section-title-wrapper',
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
}
