document.addEventListener('DOMContentLoaded', () => {
  let selectedRating = 5;

  if (window.adminAuthChecked) {
    initReviewsPage();
  } else {
    document.addEventListener('adminAuthChecked', initReviewsPage);
  }

  function initReviewsPage() {
    if (initReviewsPage.hasRun) return;
    initReviewsPage.hasRun = true;

    renderMergedReviews();
    initStarRatingSelector();
    initReviewFormSubmission();

    // Register CMS refresh Hook
    window.refreshCMSPage = function(page) {
      if (page === 'reviews') {
        renderMergedReviews();
      }
    };
  }

  /* ==========================================
     RENDER MERGED REVIEWS FROM API
     ========================================== */
  function renderMergedReviews() {
    const container = document.getElementById('reviews-page-merged-container');
    if (!container) return;

    // Fetch both reviews and selfies to merge them
    Promise.all([
      fetch('/api/reviews').then(res => res.json()),
      fetch('/api/gallery/selfie').then(res => res.json())
    ])
    .then(([reviewsList, selfiesList]) => {
      const mergedList = [];

      // 1. Add selfies from wall
      selfiesList.forEach(s => {
        mergedList.push({
          id: 's_' + (s.id || s._id),
          dbId: s.id || s._id,
          type: 'selfie',
          name: s.name,
          role: 'Verified Guest',
          rating: s.rating,
          review: s.review,
          image: s.image,
          likes: s.likes || 0,
          date: s.date || 'June 4, 2026'
        });
      });

      // 2. Add standard reviews (no fallback avatar photos)
      reviewsList.forEach((r, idx) => {
        mergedList.push({
          id: 'r_' + (r.id || r._id),
          dbId: r.id || r._id,
          type: 'review',
          name: r.name,
          role: r.role || 'Campus Regular',
          rating: r.rating,
          review: r.review,
          image: r.image || null,
          likes: Math.floor(Math.random() * 40) + 12,
          date: r.date || 'June 4, 2026'
        });
      });

      // Render cards
      container.innerHTML = mergedList.map(item => {
        const stars = Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('') + 
                      Array(5 - item.rating).fill('<i class="fa-regular fa-star"></i>').join('');

        const adminControls = window.isAdminLoggedIn ? `
          <div class="admin-card-controls">
            <div class="admin-btn admin-btn-delete" onclick="${item.type === 'selfie' ? `deleteGalleryCMS` : `deleteReviewCMS`}('${item.dbId}', '${item.type}')" title="Delete Review"><i class="fa-solid fa-trash"></i></div>
          </div>
        ` : '';

        const imageHTML = item.image ? `
          <div class="food-img-container" style="aspect-ratio: 1/1;">
            <img src="${item.image}" alt="${item.name}" style="height: 100%; object-fit: cover;">
          </div>
        ` : '';

        return `
          <div class="food-card glass" style="display: flex; flex-direction: column; height: 100%; position: relative;">
            ${adminControls}
            ${imageHTML}
            <div class="food-card-body" style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
              <div style="color: var(--accent-gold); font-size: 0.8rem; margin-bottom: 8px;">${stars}</div>
              <p style="font-size: 0.9rem; line-height: 1.5; font-style: italic; color: var(--text-primary); flex-grow: 1; margin-bottom: 20px;">
                "${item.review}"
              </p>
              <div class="review-user" style="border-top: 1px solid var(--border-glass); padding-top: 15px; margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="font-family: var(--font-title); font-weight: 700; font-size: 0.95rem; line-height: 1.2;">${item.name}</h4>
                  <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${item.role}</span>
                    <span style="font-size: 0.65rem; color: var(--accent-gold); opacity: 0.5;">&bull;</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${item.date}</span>
                  </div>
                </div>
                <span class="selfie-likes" onclick="toggleLike(this, '${item.id}')">
                  <i class="fa-regular fa-heart"></i> <span class="likes-count">${item.likes}</span>
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // GSAP Entrance
      gsap.fromTo('.food-card', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    })
    .catch(err => console.error('Error rendering merged reviews:', err));
  }

  // Like Toggle
  window.toggleLike = function(element, itemId) {
    const icon = element.querySelector('i');
    const countSpan = element.querySelector('.likes-count');
    let count = parseInt(countSpan.textContent);

    if (icon.classList.contains('fa-regular')) {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      count++;
      countSpan.textContent = count;
      gsap.fromTo(icon, { scale: 1 }, { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
    } else {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
      count--;
      countSpan.textContent = count;
    }
  };

  /* ==========================================
     STAR RATING SELECTOR INPUT
     ========================================== */
  function initStarRatingSelector() {
    const selector = document.getElementById('star-rating-selector');
    if (!selector) return;

    const stars = selector.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        selectedRating = value;

        stars.forEach(s => {
          const sVal = parseInt(s.dataset.value);
          if (sVal <= value) {
            s.classList.remove('fa-regular');
            s.classList.add('fa-solid');
            s.classList.add('active');
          } else {
            s.classList.remove('fa-solid');
            s.classList.add('fa-regular');
            s.classList.remove('active');
          }
        });
      });
    });
  }

  /* ==========================================
     REVIEW SUBMISSION (DYNAMIC POSTS)
     ========================================== */
  function initReviewFormSubmission() {
    const form = document.getElementById('add-review-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewer-name').value.trim();
      const role = document.getElementById('reviewer-role').value.trim();
      const photoInput = document.getElementById('reviewer-photo-url').value.trim();
      const review = document.getElementById('reviewer-text').value.trim();

      // Submit route depends on whether they provided a photo
      let fetchPromise;
      if (photoInput) {
        // Post as guest selfie
        fetchPromise = fetch('/api/gallery/selfie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, rating: selectedRating, review, image: photoInput })
        });
      } else {
        // Post as verified text review
        fetchPromise = fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, role, rating: selectedRating, review })
        });
      }

      fetchPromise
        .then(res => {
          if (!res.ok) throw new Error('Submission failed');
          return res.json();
        })
        .then(() => {
          // Re-render
          renderMergedReviews();

          // Reset
          form.reset();
          resetStars();

          showSuccessPopup('Thank you! Your feedback has been posted successfully.');
        })
        .catch(err => {
          console.error(err);
          alert('Error submitting feedback. Please try again.');
        });
    });
  }

  function resetStars() {
    const selector = document.getElementById('star-rating-selector');
    if (!selector) return;

    const stars = selector.querySelectorAll('i');
    stars.forEach(s => {
      s.classList.remove('fa-regular');
      s.classList.add('fa-solid');
      s.classList.add('active');
    });
    selectedRating = 5;
  }

  function showSuccessPopup(msg) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '90px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%) translateY(50px)';
    popup.style.zIndex = '9999';
    popup.style.padding = '15px 30px';
    popup.style.borderRadius = 'var(--radius-full)';
    popup.style.background = 'rgba(20, 20, 22, 0.95)';
    popup.style.border = '1px solid var(--accent-gold)';
    popup.style.color = 'var(--text-primary)';
    popup.style.fontSize = '0.9rem';
    popup.style.fontFamily = 'var(--font-title)';
    popup.style.boxShadow = 'var(--glow-shadow)';
    popup.style.backdropFilter = 'blur(10px)';
    popup.style.opacity = '0';
    popup.innerHTML = `<i class="fa-solid fa-circle-check text-gold" style="margin-right: 8px;"></i> ${msg}`;
    
    document.body.appendChild(popup);

    gsap.to(popup, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
      onComplete: () => {
        setTimeout(() => {
          gsap.to(popup, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
              popup.remove();
            }
          });
        }, 2500);
      }
    });
  }
});
