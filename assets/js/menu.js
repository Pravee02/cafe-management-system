document.addEventListener('DOMContentLoaded', () => {
  let activeCategory = 'all';
  let searchQuery = '';
  let cachedItems = [];

  if (window.adminAuthChecked) {
    initMenuPage();
  } else {
    document.addEventListener('adminAuthChecked', initMenuPage);
  }

  function initMenuPage() {
    if (initMenuPage.hasRun) return;
    initMenuPage.hasRun = true;

    renderMenuPills();
    initQueryParams();
    fetchAndRenderMenu();

    // Search event listener
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndRenderMenu(cachedItems);
      });
    }

    // Register CMS refresh Hook
    window.refreshCMSPage = function(page) {
      if (page === 'menu') {
        fetchAndRenderMenu();
      }
    };
  }

  /* ==========================================
     RENDER CATEGORY PILLS
     ========================================== */
  function renderMenuPills() {
    const container = document.getElementById('menu-pills-container');
    if (!container) return;

    let html = `<div class="menu-category-pill active" data-category="all"><i class="fa-solid fa-border-all"></i> All</div>`;

    html += window.cafeData.categories.map(cat => `
      <div class="menu-category-pill" data-category="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i> ${cat.name}
      </div>
    `).join('');

    container.innerHTML = html;

    const pills = container.querySelectorAll('.menu-category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        filterAndRenderMenu(cachedItems);
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }

  /* ==========================================
     INIT QUERY PARAMS
     ========================================== */
  function initQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (catParam) {
      activeCategory = catParam;
      const pills = document.querySelectorAll('.menu-category-pill');
      pills.forEach(pill => {
        if (pill.dataset.category === catParam) {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          pill.scrollIntoView({ inline: 'center' });
        }
      });
    }
  }

  /* ==========================================
     FETCH AND FILTER MENU
     ========================================== */
  function fetchAndRenderMenu() {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        cachedItems = data;
        filterAndRenderMenu(cachedItems);
      })
      .catch(err => console.error('Error fetching menu items:', err));
  }

  function filterAndRenderMenu(items) {
    const container = document.getElementById('menu-grid-container');
    if (!container) return;

    // Inject Add Menu Button if admin is logged in
    if (window.isAdminLoggedIn) {
      const controls = document.querySelector('.menu-controls');
      if (controls && !document.getElementById('admin-add-menu-banner')) {
        const banner = document.createElement('div');
        banner.id = 'admin-add-menu-banner';
        banner.className = 'admin-add-banner';
        banner.style.marginTop = '20px';
        banner.innerHTML = `<button onclick="openAddMenuCMS()"><i class="fa-solid fa-plus"></i> Add New Menu Item</button>`;
        controls.appendChild(banner);
      }
    }

    const filteredItems = items.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery) || 
                            item.description.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-face-frown"></i>
          <h3>No items match your search</h3>
          <p style="color: var(--text-muted); margin-top: 10px;">Try searching for something else.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredItems.map(item => {
      const adminControls = window.isAdminLoggedIn ? `
        <div class="admin-card-controls">
          <div class="admin-btn admin-btn-edit" onclick="openEditMenuCMS('${item.id || item._id}')" title="Edit Item"><i class="fa-solid fa-pen"></i></div>
          <div class="admin-btn admin-btn-delete" onclick="deleteMenuCMS('${item.id || item._id}')" title="Delete Item"><i class="fa-solid fa-trash"></i></div>
        </div>
      ` : '';

      return `
        <div class="food-card glass" data-id="${item.id || item._id}" style="position: relative;">
          ${adminControls}
          <div class="food-img-container">
            <img src="${item.image}" alt="${item.name}">
            <div class="food-veg-tag ${item.isVeg ? 'veg' : 'non-veg'}">
              <i class="fa-solid fa-circle"></i>
            </div>
          </div>
          <div class="food-card-body">
            <div class="food-card-header" style="margin-bottom: 12px;">
              <h3 class="food-card-title">${item.name}</h3>
              <span class="food-card-price">₹${item.price}</span>
            </div>
            <p class="food-card-desc" style="margin-bottom: 0;">${item.description}</p>
          </div>
        </div>
      `;
    }).join('');

    // GSAP Stagger Entrance
    gsap.fromTo('.food-card', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }
});
