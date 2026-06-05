document.addEventListener('DOMContentLoaded', () => {
  let mainTab = 'food'; // 'food' or 'selfie'
  let foodFilter = 'all';

  if (window.adminAuthChecked) {
    initGalleryPage();
  } else {
    document.addEventListener('adminAuthChecked', initGalleryPage);
  }

  function initGalleryPage() {
    if (initGalleryPage.hasRun) return;
    initGalleryPage.hasRun = true;

    initGalleryNav();
    checkQueryParams();
    renderGalleryGrid();

    // Register CMS refresh Hook
    window.refreshCMSPage = function(page) {
      if (page === 'gallery') {
        renderGalleryGrid();
      }
    };
  }

  /* ==========================================
     INIT GALLERY NAVIGATION CONTROLS
     ========================================== */
  function initGalleryNav() {
    // Main Tab Toggles (Food vs Selfie)
    const mainPills = document.querySelectorAll('#gallery-main-toggles .gallery-pill');
    const foodSubPillsContainer = document.getElementById('gallery-food-subpills');

    mainPills.forEach(pill => {
      pill.addEventListener('click', () => {
        mainPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        mainTab = pill.dataset.mainTab;

        if (mainTab === 'food') {
          if (foodSubPillsContainer) foodSubPillsContainer.style.display = 'flex';
        } else {
          if (foodSubPillsContainer) foodSubPillsContainer.style.display = 'none';
        }

        renderGalleryGrid();
      });
    });

    // Sub Food Filters
    const foodPills = document.querySelectorAll('#gallery-food-subpills .gallery-pill');
    foodPills.forEach(pill => {
      pill.addEventListener('click', () => {
        foodPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        foodFilter = pill.dataset.foodFilter;
        renderGalleryGrid();
      });
    });
  }

  /* ==========================================
     CHECK URL QUERY PARAMS
     ========================================== */
  function checkQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'selfie') {
      mainTab = 'selfie';
      
      const mainPills = document.querySelectorAll('#gallery-main-toggles .gallery-pill');
      mainPills.forEach(p => {
        if (p.dataset.mainTab === 'selfie') {
          mainPills.forEach(x => x.classList.remove('active'));
          p.classList.add('active');
        }
      });

      const foodSubPillsContainer = document.getElementById('gallery-food-subpills');
      if (foodSubPillsContainer) foodSubPillsContainer.style.display = 'none';
    }
  }

  /* ==========================================
     RENDER ACTIVE GALLERY GRID
     ========================================== */
  function renderGalleryGrid() {
    const container = document.getElementById('gallery-masonry-container');
    if (!container) return;

    // Inject Add Button if admin is logged in
    if (window.isAdminLoggedIn) {
      let banner = document.getElementById('admin-add-gallery-banner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'admin-add-gallery-banner';
        banner.className = 'admin-add-banner';
        banner.style.marginTop = '10px';
        banner.style.marginBottom = '25px';
        const pills = document.getElementById('gallery-food-subpills') || document.getElementById('gallery-main-toggles');
        pills.parentNode.insertBefore(banner, pills.nextSibling);
      }
      banner.innerHTML = `<button onclick="openAddGalleryCMS('${mainTab}')"><i class="fa-solid fa-plus"></i> Add New ${mainTab === 'food' ? 'Food Photo' : 'Guest Memory'}</button>`;
    }

    const endpoint = mainTab === 'food' ? '/api/gallery/food' : '/api/gallery/selfie';

    fetch(endpoint)
      .then(res => res.json())
      .then(items => {
        let itemsToRender = [];

        if (mainTab === 'food') {
          if (foodFilter === 'all') {
            itemsToRender = items;
          } else {
            itemsToRender = items.filter(item => {
              const title = item.title.toLowerCase();
              if (foodFilter === 'pizza') return title.includes('pizza') || title.includes('margherita');
              if (foodFilter === 'burger') return title.includes('burger');
              if (foodFilter === 'momos') return title.includes('momo') || title.includes('dumpling');
              if (foodFilter === 'tea') return title.includes('tea') || title.includes('chai');
              if (foodFilter === 'coffee') return title.includes('coffee') || title.includes('latte');
              return false;
            });
          }
        } else {
          // Selfie Gallery renders selfies directly
          itemsToRender = items.map(s => ({
            id: s.id || s._id,
            title: `${s.name}'s Memory`,
            image: s.image
          }));
        }

        container.innerHTML = itemsToRender.map(item => {
          const adminControls = window.isAdminLoggedIn ? `
            <div class="admin-card-controls">
              <div class="admin-btn admin-btn-delete" onclick="deleteGalleryCMS('${item.id || item._id}', '${mainTab}')" title="Delete Photo"><i class="fa-solid fa-trash"></i></div>
            </div>
          ` : '';

          return `
            <div class="gallery-masonry-item glass" style="position: relative;">
              ${adminControls}
              <img src="${item.image}" alt="${item.title}">
              <div class="gallery-masonry-overlay">
                <h4>${item.title}</h4>
                <a href="${item.image}" data-lightbox="gallery-view" class="gallery-zoom-btn">
                  <i class="fa-solid fa-expand"></i>
                </a>
              </div>
            </div>
          `;
        }).join('');

        // GSAP Zoom Entrance Stagger
        gsap.fromTo('.gallery-masonry-item', 
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
        );
      })
      .catch(err => console.error('Error fetching gallery items:', err));
  }
});
