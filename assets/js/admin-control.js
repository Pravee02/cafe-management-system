// Dynamic Admin In-Place CMS Controller for ZOOP CAFE
window.adminAuthChecked = false;
window.isAdminLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  // Check auth status
  fetch('/api/auth/status?_t=' + Date.now())
    .then(res => res.json())
    .then(data => {
      window.isAdminLoggedIn = !!data.loggedIn;
      window.adminAuthChecked = true;
      document.dispatchEvent(new CustomEvent('adminAuthChecked', { detail: data }));
      
      if (window.isAdminLoggedIn) {
        document.body.classList.add('admin-logged-in');
        initializeAdminCMS();
      } else {
        document.body.classList.remove('admin-logged-in');
      }
    })
    .catch(err => {
      console.error('Admin authentication check failed:', err);
      window.isAdminLoggedIn = false;
      window.adminAuthChecked = true;
      document.body.classList.remove('admin-logged-in');
      document.dispatchEvent(new CustomEvent('adminAuthChecked', { detail: { loggedIn: false } }));
    });
});

function initializeAdminCMS() {
  injectAdminStyles();
  injectCMSModals();
  setupModalUploads();
  setupGlobalAdminActions();
  setupFooterLogoutSwap();
}

function setupFooterLogoutSwap() {
  const adminLinks = document.querySelectorAll('.admin-login-link');
  adminLinks.forEach(link => {
    link.textContent = 'Logout (Admin)';
    link.href = '/logout';
  });
}

/* ==========================================
   INJECT PREMIUM ADMIN CONTROL STYLES
   ========================================== */
function injectAdminStyles() {
  const css = `
    /* CMS Button Overlays */
    .admin-card-controls {
      position: absolute;
      top: 15px;
      right: 15px;
      display: flex;
      gap: 8px;
      z-index: 100;
    }
    .admin-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.8rem;
      transition: var(--transition-fast);
      backdrop-filter: blur(5px);
    }
    .admin-btn-edit {
      background: rgba(212, 175, 55, 0.2);
      color: var(--accent-gold);
      border-color: rgba(212, 175, 55, 0.3);
    }
    .admin-btn-edit:hover {
      background: var(--accent-gold);
      color: var(--text-dark);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }
    .admin-btn-delete {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.3);
    }
    .admin-btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    /* Dynamic Add Button Banner */
    .admin-add-banner {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
    .admin-add-banner button {
      background: linear-gradient(135deg, var(--accent-gold), var(--accent-orange));
      color: var(--text-dark);
      font-weight: 700;
      border: none;
      padding: 12px 28px;
      border-radius: var(--radius-full);
      cursor: pointer;
      font-family: var(--font-title);
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 1px;
      transition: var(--transition-fast);
      box-shadow: var(--glow-shadow);
    }
    .admin-add-banner button:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
    }

    /* Modals Overlay */
    .admin-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 12, 0.85);
      backdrop-filter: blur(10px);
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .admin-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .admin-modal {
      background: #141416;
      border: 1px solid var(--border-glass);
      border-top: 3px solid var(--accent-gold);
      width: 90%;
      max-width: 550px;
      border-radius: var(--radius-md);
      padding: 30px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(30px);
      transition: transform 0.3s ease;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    }
    .admin-modal-overlay.open .admin-modal {
      transform: translateY(0);
    }
    .admin-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 15px;
    }
    .admin-modal-header h3 {
      font-family: var(--font-title);
      font-size: 1.3rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .admin-modal-header h3 span {
      color: var(--accent-gold);
    }
    .admin-modal-close {
      cursor: pointer;
      font-size: 1.2rem;
      color: var(--text-muted);
      transition: var(--transition-fast);
    }
    .admin-modal-close:hover {
      color: #ffffff;
    }

    /* Modal Form Controls */
    .admin-form-group {
      margin-bottom: 20px;
    }
    .admin-form-group label {
      display: block;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .admin-form-group input[type="text"],
    .admin-form-group input[type="number"],
    .admin-form-group textarea,
    .admin-form-group select {
      width: 100%;
      padding: 12px 16px;
      background: #1e1e22;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.9rem;
      transition: var(--transition-fast);
    }
    .admin-form-group input:focus,
    .admin-form-group textarea:focus,
    .admin-form-group select:focus {
      outline: none;
      border-color: var(--accent-gold);
      background: #25252a;
    }
    .admin-form-group input[type="file"] {
      display: block;
      margin-top: 5px;
      font-size: 0.85rem;
    }
    .admin-img-preview {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      border: 1px dashed var(--border-glass);
      margin-top: 10px;
      display: none;
    }
    .admin-upload-status {
      font-size: 0.75rem;
      color: var(--accent-gold);
      margin-top: 5px;
      display: none;
    }

    /* Veg/Non-Veg Toggle Radio */
    .admin-veg-row {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-top: 5px;
    }
    .admin-veg-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      text-transform: none;
      letter-spacing: 0;
      color: #ffffff;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

// Admin Bar Removed - CMS is completely integrated inline.

/* ==========================================
   INJECT CMS MODAL DIALOGS IN THE DOM
   ========================================== */
function injectCMSModals() {
  const container = document.createElement('div');
  container.id = 'admin-cms-modals-container';

  container.innerHTML = `
    <!-- 1. ADD/EDIT MENU ITEM MODAL -->
    <div class="admin-modal-overlay" id="modal-menu-item-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3 id="menu-modal-title">Add <span>Menu Item</span></h3>
          <span class="admin-modal-close" onclick="closeAdminModal('modal-menu-item-overlay')"><i class="fa fa-times"></i></span>
        </div>
        <form id="cms-menu-item-form">
          <input type="hidden" id="cms-menu-id">
          
          <div class="admin-form-group">
            <label>Item Name</label>
            <input type="text" id="cms-menu-name" placeholder="e.g. Sourdough Margherita Pizza" required>
          </div>

          <div class="admin-form-group">
            <label>Category</label>
            <select id="cms-menu-category" required>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="momos">Momos</option>
              <option value="fries">Fries</option>
              <option value="tea">Tea</option>
              <option value="coffee">Coffee</option>
              <option value="shakes">Shakes</option>
              <option value="mocktails">Mocktails</option>
              <option value="sandwiches">Sandwiches</option>
              <option value="rolls">Rolls</option>
            </select>
          </div>

          <div class="admin-form-group">
            <label>Price (₹)</label>
            <input type="number" id="cms-menu-price" placeholder="e.g. 249" required>
          </div>

          <div class="admin-form-group">
            <label>Food Tag Type</label>
            <div class="admin-veg-row">
              <label><input type="radio" name="cms-menu-veg" value="true" checked> Vegetarian (Veg)</label>
              <label><input type="radio" name="cms-menu-veg" value="false"> Non-Vegetarian</label>
            </div>
          </div>

          <div class="admin-form-group">
            <label>Item Image (Upload File)</label>
            <input type="file" class="cms-file-uploader" data-target="cms-menu-image" accept="image/*">
            <input type="hidden" id="cms-menu-image" required>
            <img id="cms-menu-image-preview" class="admin-img-preview" alt="Preview">
            <div class="admin-upload-status">Uploading...</div>
          </div>

          <div class="admin-form-group">
            <label>Description</label>
            <textarea id="cms-menu-desc" placeholder="Tomato sauce, fresh mozzarella, fresh basil..." required style="height: 80px;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;" id="cms-menu-submit-btn">Save Menu Item <i class="fa-solid fa-save"></i></button>
        </form>
      </div>
    </div>

    <!-- 2. ADD GALLERY PHOTO / MEMORY MODAL -->
    <div class="admin-modal-overlay" id="modal-gallery-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3 id="gallery-modal-title">Add <span>Photo</span></h3>
          <span class="admin-modal-close" onclick="closeAdminModal('modal-gallery-overlay')"><i class="fa fa-times"></i></span>
        </div>
        <form id="cms-gallery-form">
          <input type="hidden" id="cms-gallery-type" value="food">
          
          <div class="admin-form-group">
            <label id="gallery-label-name">Title / Caption</label>
            <input type="text" id="cms-gallery-title" placeholder="e.g. Cardamom Hot Chai" required>
          </div>

          <div class="admin-form-group" id="cms-gallery-cat-group">
            <label>Category Tag</label>
            <select id="cms-gallery-cat">
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="momos">Momos</option>
              <option value="tea">Tea</option>
              <option value="coffee">Coffee</option>
            </select>
          </div>

          <div class="admin-form-group">
            <label>Photo (Upload File)</label>
            <input type="file" class="cms-file-uploader" data-target="cms-gallery-image" accept="image/*">
            <input type="hidden" id="cms-gallery-image" required>
            <img id="cms-gallery-image-preview" class="admin-img-preview" alt="Preview">
            <div class="admin-upload-status">Uploading...</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Add To Gallery <i class="fa-solid fa-plus"></i></button>
        </form>
      </div>
    </div>

    <!-- 3. EDIT TODAY'S SPECIAL MODAL -->
    <div class="admin-modal-overlay" id="modal-special-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3>Edit <span>Today's Special</span></h3>
          <span class="admin-modal-close" onclick="closeAdminModal('modal-special-overlay')"><i class="fa fa-times"></i></span>
        </div>
        <form id="cms-special-form">
          <div class="admin-form-group">
            <label>Special Item Name</label>
            <input type="text" id="cms-special-name" required>
          </div>

          <div class="admin-form-group">
            <label>Price (₹)</label>
            <input type="number" id="cms-special-price" required>
          </div>

          <div class="admin-form-group">
            <label>Photo (Upload File)</label>
            <input type="file" class="cms-file-uploader" data-target="cms-special-image" accept="image/*">
            <input type="hidden" id="cms-special-image" required>
            <img id="cms-special-image-preview" class="admin-img-preview" alt="Preview">
            <div class="admin-upload-status">Uploading...</div>
          </div>

          <div class="admin-form-group">
            <label>Description</label>
            <textarea id="cms-special-desc" required style="height: 100px;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Save Special <i class="fa-solid fa-save"></i></button>
        </form>
      </div>
    </div>

    <!-- 4. EDIT SPECIAL OFFERS MODAL -->
    <div class="admin-modal-overlay" id="modal-offers-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3>Edit <span>Special Offers</span></h3>
          <span class="admin-modal-close" onclick="closeAdminModal('modal-offers-overlay')"><i class="fa fa-times"></i></span>
        </div>
        <form id="cms-offers-form">
          <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px;">
            <strong style="color: var(--accent-orange); font-size: 0.85rem; display:block; margin-bottom: 8px;">Offer 1 (Campus Deal)</strong>
            <input type="text" id="cms-off1-title" placeholder="Title" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off1-price" placeholder="Price (e.g. ₹169)" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off1-desc" placeholder="Details" required>
          </div>

          <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px;">
            <strong style="color: var(--accent-orange); font-size: 0.85rem; display:block; margin-bottom: 8px;">Offer 2 (Weekend Vibe)</strong>
            <input type="text" id="cms-off2-title" placeholder="Title" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off2-price" placeholder="Price" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off2-desc" placeholder="Details" required>
          </div>

          <div style="margin-bottom: 20px;">
            <strong style="color: var(--accent-orange); font-size: 0.85rem; display:block; margin-bottom: 8px;">Offer 3 (Birthday Treat)</strong>
            <input type="text" id="cms-off3-title" placeholder="Title" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off3-price" placeholder="Price" required style="margin-bottom: 8px;">
            <input type="text" id="cms-off3-desc" placeholder="Details" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Save Offers <i class="fa-solid fa-save"></i></button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(container);
}

/* ==========================================
   SETUP MULTIPART UPLOADS FOR MODALS
   ========================================== */
function setupModalUploads() {
  const uploaders = document.querySelectorAll('.cms-file-uploader');
  uploaders.forEach(uploader => {
    uploader.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const targetInputId = uploader.dataset.target;
      const targetInput = document.getElementById(targetInputId);
      const preview = document.getElementById(targetInputId + '-preview');
      const statusDiv = uploader.parentNode.querySelector('.admin-upload-status');

      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.color = 'var(--accent-gold)';
        statusDiv.textContent = 'Uploading file...';
      }

      const formData = new FormData();
      formData.append('image', file);

      fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
      })
      .then(data => {
        if (targetInput) targetInput.value = data.url;
        if (preview) {
          preview.src = data.url;
          preview.style.display = 'block';
        }
        if (statusDiv) {
          statusDiv.style.color = '#10B981';
          statusDiv.textContent = 'Image uploaded successfully!';
        }
      })
      .catch(err => {
        console.error(err);
        if (statusDiv) {
          statusDiv.style.color = '#EF4444';
          statusDiv.textContent = 'Upload failed. Please retry.';
        }
      });
    });
  });
}

/* ==========================================
   SETUP MODAL ACTIONS & FORMS SUBMISSIONS
   ========================================== */
function setupGlobalAdminActions() {
  // Global modal triggers
  window.openAdminModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  };

  window.closeAdminModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  };

  // Close modals on clicking backdrop
  const overlays = document.querySelectorAll('.admin-modal-overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // MENU FORM SUBMIT
  const menuForm = document.getElementById('cms-menu-item-form');
  menuForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('cms-menu-id').value;
    const name = document.getElementById('cms-menu-name').value.trim();
    const category = document.getElementById('cms-menu-category').value;
    const price = parseFloat(document.getElementById('cms-menu-price').value);
    const image = document.getElementById('cms-menu-image').value;
    const description = document.getElementById('cms-menu-desc').value.trim();
    const isVeg = document.querySelector('input[name="cms-menu-veg"]:checked').value === 'true';

    const payload = { name, category, price, image, description, isVeg };
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/api/admin/menu/${id}` : '/api/admin/menu';

    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to save menu item');
      return res.json();
    })
    .then(() => {
      closeAdminModal('modal-menu-item-overlay');
      // Trigger dynamic refresh on page
      if (window.refreshCMSPage) window.refreshCMSPage('menu');
    })
    .catch(err => {
      console.error(err);
      alert('Error saving menu item.');
    });
  });

  // GALLERY / SELFIE FORM SUBMIT
  const galleryForm = document.getElementById('cms-gallery-form');
  galleryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('cms-gallery-type').value;
    const image = document.getElementById('cms-gallery-image').value;

    if (type === 'food') {
      const title = document.getElementById('cms-gallery-title').value.trim();
      const category = document.getElementById('cms-gallery-cat').value;
      const payload = { title, category, image };

      fetch('/api/admin/gallery/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        closeAdminModal('modal-gallery-overlay');
        if (window.refreshCMSPage) window.refreshCMSPage('gallery');
      });
    } else {
      // Selfie
      const name = document.getElementById('cms-gallery-title').value.trim();
      const review = 'Customer Memory Upload';
      const payload = { name, review, image, rating: 5 };

      fetch('/api/admin/gallery/selfie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        closeAdminModal('modal-gallery-overlay');
        if (window.refreshCMSPage) window.refreshCMSPage('gallery');
      });
    }
  });

  // SPECIAL FORM SUBMIT (HOMEPAGE)
  const specialForm = document.getElementById('cms-special-form');
  specialForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cms-special-name').value.trim();
    const price = parseFloat(document.getElementById('cms-special-price').value);
    const image = document.getElementById('cms-special-image').value;
    const description = document.getElementById('cms-special-desc').value.trim();

    fetch('/api/admin/special', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, image, description })
    })
    .then(() => {
      closeAdminModal('modal-special-overlay');
      if (window.refreshCMSPage) window.refreshCMSPage('home');
    });
  });

  // OFFERS FORM SUBMIT (HOMEPAGE)
  const offersForm = document.getElementById('cms-offers-form');
  offersForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const specialOffers = [
      {
        id: "off1",
        tag: "Campus Deal",
        title: document.getElementById('cms-off1-title').value.trim(),
        price: document.getElementById('cms-off1-price').value.trim(),
        desc: document.getElementById('cms-off1-desc').value.trim()
      },
      {
        id: "off2",
        tag: "Weekend Vibe",
        title: document.getElementById('cms-off2-title').value.trim(),
        price: document.getElementById('cms-off2-price').value.trim(),
        desc: document.getElementById('cms-off2-desc').value.trim()
      },
      {
        id: "off3",
        tag: "Birthday Treat",
        title: document.getElementById('cms-off3-title').value.trim(),
        price: document.getElementById('cms-off3-price').value.trim(),
        desc: document.getElementById('cms-off3-desc').value.trim()
      }
    ];

    fetch('/api/admin/special/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specialOffers)
    })
    .then(() => {
      closeAdminModal('modal-offers-overlay');
      if (window.refreshCMSPage) window.refreshCMSPage('home');
    });
  });

  /* ==========================================
     GLOBAL BUTTON TRIGGERS
     ========================================== */
  window.openAddMenuCMS = function() {
    document.getElementById('cms-menu-item-form').reset();
    document.getElementById('cms-menu-id').value = '';
    document.getElementById('menu-modal-title').innerHTML = 'Add <span>Menu Item</span>';
    
    document.getElementById('cms-menu-image').value = '';
    document.getElementById('cms-menu-image-preview').style.display = 'none';
    const status = document.getElementById('cms-menu-image').parentNode.querySelector('.admin-upload-status');
    if (status) status.style.display = 'none';

    openAdminModal('modal-menu-item-overlay');
  };

  window.openEditMenuCMS = function(id) {
    fetch('/api/menu')
      .then(res => res.json())
      .then(items => {
        const item = items.find(i => (i.id || i._id) === id);
        if (!item) return;

        document.getElementById('cms-menu-id').value = id;
        document.getElementById('cms-menu-name').value = item.name;
        document.getElementById('cms-menu-category').value = item.category;
        document.getElementById('cms-menu-price').value = item.price;
        document.getElementById('cms-menu-desc').value = item.description;
        document.getElementById('cms-menu-image').value = item.image;

        // Veg radio
        const vegRadio = document.querySelector(`input[name="cms-menu-veg"][value="${item.isVeg}"]`);
        if (vegRadio) vegRadio.checked = true;

        const preview = document.getElementById('cms-menu-image-preview');
        preview.src = item.image;
        preview.style.display = 'block';

        const status = document.getElementById('cms-menu-image').parentNode.querySelector('.admin-upload-status');
        if (status) status.style.display = 'none';

        document.getElementById('menu-modal-title').innerHTML = 'Edit <span>Menu Item</span>';
        openAdminModal('modal-menu-item-overlay');
      });
  };

  window.deleteMenuCMS = function(id) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    fetch(`/api/admin/menu/${id}`, { method: 'DELETE' })
      .then(() => {
        if (window.refreshCMSPage) window.refreshCMSPage('menu');
      });
  };

  window.openAddGalleryCMS = function(type) {
    document.getElementById('cms-gallery-form').reset();
    document.getElementById('cms-gallery-type').value = type;
    document.getElementById('cms-gallery-image').value = '';
    document.getElementById('cms-gallery-image-preview').style.display = 'none';
    const status = document.getElementById('cms-gallery-image').parentNode.querySelector('.admin-upload-status');
    if (status) status.style.display = 'none';

    const modalTitle = document.getElementById('gallery-modal-title');
    const label = document.getElementById('gallery-label-name');
    const catGroup = document.getElementById('cms-gallery-cat-group');

    if (type === 'food') {
      modalTitle.innerHTML = 'Add <span>Food Photo</span>';
      label.textContent = 'Photo Title';
      catGroup.style.display = 'block';
    } else {
      modalTitle.innerHTML = 'Add <span>Guest Selfie</span>';
      label.textContent = 'Guest / Group Name';
      catGroup.style.display = 'none';
    }

    openAdminModal('modal-gallery-overlay');
  };

  window.deleteGalleryCMS = function(id, type) {
    if (!confirm('Are you sure you want to delete this photo memory?')) return;
    const endpoint = type === 'food' ? `/api/admin/gallery/food/${id}` : `/api/admin/gallery/selfie/${id}`;
    fetch(endpoint, { method: 'DELETE' })
      .then(() => {
        if (window.refreshCMSPage) window.refreshCMSPage('gallery');
      });
  };

  window.deleteReviewCMS = function(id) {
    if (!confirm('Are you sure you want to delete this review?')) return;
    fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
      .then(() => {
        if (window.refreshCMSPage) window.refreshCMSPage('reviews');
      });
  };

  window.openEditSpecialCMS = function() {
    fetch('/api/special')
      .then(res => res.json())
      .then(data => {
        if (data.todaySpecial) {
          document.getElementById('cms-special-name').value = data.todaySpecial.name || '';
          document.getElementById('cms-special-price').value = data.todaySpecial.price || '';
          document.getElementById('cms-special-image').value = data.todaySpecial.image || '';
          document.getElementById('cms-special-desc').value = data.todaySpecial.description || '';

          const preview = document.getElementById('cms-special-image-preview');
          preview.src = data.todaySpecial.image;
          preview.style.display = 'block';
          
          const status = document.getElementById('cms-special-image').parentNode.querySelector('.admin-upload-status');
          if (status) status.style.display = 'none';
        }
        openAdminModal('modal-special-overlay');
      });
  };

  window.openEditOffersCMS = function() {
    fetch('/api/special')
      .then(res => res.json())
      .then(data => {
        if (data.specialOffers && data.specialOffers.length >= 3) {
          document.getElementById('cms-off1-title').value = data.specialOffers[0].title || '';
          document.getElementById('cms-off1-price').value = data.specialOffers[0].price || '';
          document.getElementById('cms-off1-desc').value = data.specialOffers[0].desc || '';

          document.getElementById('cms-off2-title').value = data.specialOffers[1].title || '';
          document.getElementById('cms-off2-price').value = data.specialOffers[1].price || '';
          document.getElementById('cms-off2-desc').value = data.specialOffers[1].desc || '';

          document.getElementById('cms-off3-title').value = data.specialOffers[2].title || '';
          document.getElementById('cms-off3-price').value = data.specialOffers[2].price || '';
          document.getElementById('cms-off3-desc').value = data.specialOffers[2].desc || '';
        }
        openAdminModal('modal-offers-overlay');
      });
  };
}
