document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

/* ==========================================
   CONTACT FORM VALIDATION & SUBMIT
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending message (network loading mock)
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      // Re-enable button
      btn.innerHTML = originalText;
      btn.style.pointerEvents = 'auto';

      // Reset Form
      form.reset();

      // Show gorgeous toast
      showToast('Message sent! Our hosting team will connect with you shortly.', 'success');
    }, 2000);
  });
}

/* ==========================================
   CUSTOM FLOATING PREMIUM TOAST NOTIFICATION
   ========================================== */
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '90px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%) translateY(50px)';
  toast.style.zIndex = '9999';
  toast.style.padding = '15px 30px';
  toast.style.borderRadius = 'var(--radius-full)';
  toast.style.background = 'rgba(20, 20, 22, 0.95)';
  toast.style.border = type === 'success' ? '1px solid var(--accent-gold)' : '1px solid var(--accent-orange)';
  toast.style.color = 'var(--text-primary)';
  toast.style.fontSize = '0.9rem';
  toast.style.fontFamily = 'var(--font-title)';
  toast.style.boxShadow = 'var(--glow-shadow)';
  toast.style.backdropFilter = 'blur(10px)';
  toast.style.opacity = '0';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';

  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check text-gold"></i>' 
    : '<i class="fa-solid fa-circle-exclamation text-orange"></i>';

  toast.innerHTML = `${icon} ${msg}`;
  document.body.appendChild(toast);

  gsap.to(toast, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to(toast, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power3.in',
          onComplete: () => {
            toast.remove();
          }
        });
      }, 3000);
    }
  });
}
