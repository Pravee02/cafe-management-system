(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const t of e.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&c(t)}).observe(document,{childList:!0,subtree:!0});function l(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(n){if(n.ep)return;n.ep=!0;const e=l(n);fetch(n.href,e)}})();window.cafeData={categories:[{id:"pizza",name:"Pizza",icon:"fa-pizza-slice"},{id:"burger",name:"Burger",icon:"fa-hamburger"},{id:"momos",name:"Momos",icon:"fa-cloud"},{id:"fries",name:"Fries",icon:"fa-fries"},{id:"tea",name:"Tea",icon:"fa-mug-hot"},{id:"coffee",name:"Coffee",icon:"fa-coffee"},{id:"shakes",name:"Shakes",icon:"fa-glass-martini-alt"},{id:"mocktails",name:"Mocktails",icon:"fa-cocktail"},{id:"sandwiches",name:"Sandwiches",icon:"fa-bread-slice"},{id:"rolls",name:"Rolls",icon:"fa-scroll"}],menuItems:[{id:"p1",category:"pizza",name:"Artisanal Margherita",price:249,description:"San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil on hand-stretched sourdough crust.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"},{id:"p2",category:"pizza",name:"Paneer Tikka Passion",price:299,description:"Clay-oven spiced paneer chunks, bell peppers, red onions, coriander, and mint-mayo drizzle on cheesy base.",rating:4.7,isVeg:!0,image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"},{id:"p3",category:"pizza",name:"Spicy Peri Peri Delight",price:329,description:"Fiery peri-peri chicken/paneer, sweet corn, sliced jalapenos, and smoked scamorza cheese.",rating:4.9,isVeg:!1,image:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80"},{id:"b1",category:"burger",name:"Cheesy Lava Beast",price:189,description:"Crispy veggie patty stuffed with liquid cheddar, topped with caramelized onions, gherkins, and signature Zoop sauce.",rating:4.9,isVeg:!0,image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"},{id:"b2",category:"burger",name:"Paneer Maharaja Classic",price:219,description:"Double layer spiced paneer slabs, iceberg lettuce, tomatoes, and rich tandoori dressing in sesame brioche buns.",rating:4.6,isVeg:!0,image:"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80"},{id:"m1",category:"momos",name:"Tandoori Paneer Momos",price:149,description:"Dumplings stuffed with spiced paneer, charred in clay oven, served with spicy red chili chutney and garlic aioli.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"},{id:"m2",category:"momos",name:"Crunchy Kurkure Momos",price:159,description:"Crispy, cornflake-crusted deep-fried dumplings with a savory vegetable filling and dynamic seasoning.",rating:4.7,isVeg:!0,image:"https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&w=600&q=80"},{id:"f1",category:"fries",name:"Signature Peri Peri Fries",price:99,description:"Golden skin-on french fries tossed in an aromatic, fiery peri-peri seasoning blend.",rating:4.5,isVeg:!0,image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"},{id:"f2",category:"fries",name:"Loaded Truffle Cheese Fries",price:149,description:"Crispy fries drizzled with aromatic white truffle oil, melted cheese sauce, and chives.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80"},{id:"t1",category:"tea",name:"Adrak Elaichi Cutting Chai",price:39,description:"Traditional Indian street-style tea brewed with freshly crushed ginger, green cardamom, and full-cream milk.",rating:4.9,isVeg:!0,image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"},{id:"t2",category:"tea",name:"Premium Jasmine Green",price:79,description:"Delicate whole-leaf green tea scented with fresh jasmine blossoms for a floral, calming cup.",rating:4.4,isVeg:!0,image:"https://images.unsplash.com/photo-1627435601357-37ae7918d096?auto=format&fit=crop&w=600&q=80"},{id:"c1",category:"coffee",name:"Rose & Gold Latte",price:159,description:"Double shot arabica, steamed milk, organic rose essence, topped with edible 24k gold leaf.",rating:4.9,isVeg:!0,image:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80"},{id:"c2",category:"coffee",name:"Caramel Macchiato Shakerato",price:179,description:"Espresso shaken with ice, rich house caramel syrup, and cold milk foam, served tall.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"},{id:"s1",category:"shakes",name:"Belgian Chocolate Crunch",price:169,description:"Thick shake made with 70% dark Belgian chocolate gelato, topped with brownie chunks and chocolate shavings.",rating:4.9,isVeg:!0,image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"},{id:"s2",category:"shakes",name:"Royal Lotus Biscoff Shake",price:189,description:"Indulgent shake infused with premium Lotus Biscoff spread, crushed cookies, and whipped cream.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80"},{id:"k1",category:"mocktails",name:"Blue Ocean Curacao",price:129,description:"Refreshing summer drink with blue curacao syrup, freshly squeezed lime juice, mint leaves, and carbonated soda.",rating:4.6,isVeg:!0,image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"},{id:"k2",category:"mocktails",name:"Cranberry Basil Sparkler",price:139,description:"Tart cranberry juice shaken with fresh muddled basil leaves, club soda, and a touch of organic honey.",rating:4.7,isVeg:!0,image:"https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80"},{id:"w1",category:"sandwiches",name:"Sourdough Pesto Caprese",price:179,description:"House-made basil pesto, fresh tomatoes, creamy bocconcini cheese, grilled on artisan sourdough.",rating:4.8,isVeg:!0,image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"},{id:"w2",category:"sandwiches",name:"Smoked Paneer Club Sandwich",price:199,description:"Triple-decker sandwich layered with hickory-smoked paneer, coleslaw, cheese slice, and fresh cucumbers.",rating:4.7,isVeg:!0,image:"https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80"},{id:"r1",category:"rolls",name:"Paneer Kathi Roll",price:139,description:"Laccha paratha rolled with skewered cottage cheese cubes, pickled onions, chatpata masala, and mint chutney.",rating:4.7,isVeg:!0,image:"https://images.unsplash.com/photo-1626700051175-6518c4793fdf?auto=format&fit=crop&w=600&q=80"},{id:"r2",category:"rolls",name:"Zesty Crispy Veg Wrap",price:129,description:"Tortilla sheet rolled with crunchy vegetable cutlet, shredded lettuce, cheese sauce, and sweet chili dressing.",rating:4.5,isVeg:!0,image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"}],reviews:[{id:1,name:"Aarav Sharma",rating:5,role:"Student at DTU",review:"Zoop Cafe is our go-to hangout spot. The Rose Latte is out of this world, and the aesthetic is insanely premium. Perfect place to code or catch up with friends."},{id:2,name:"Neha Kapoor",rating:5,role:"Food Blogger",review:"From the glassmorphic cards to the curated menu, Zoop looks and tastes like a 5-star brand. The Cheesy Lava Burger is loaded and super delicious!"},{id:3,name:"Rohan Mehra",rating:4,role:"Regular Customer",review:"Excellent service and great prices for students. The seating is comfortable and the vibe is always dynamic. Love their Peri Peri Fries!"},{id:4,name:"Ananya Goel",rating:5,role:"Design Student",review:"I am blown away by the interior design and the branding. The presentation of the dishes matches the high-end feel of the space itself."}],selfieWall:[{id:1,name:"Preeti & Sarthak",rating:5,likes:124,review:"Weekend vibes at our favorite corner! Food is awesome!",image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"},{id:2,name:"Kabir Verma",rating:5,likes:89,review:"Tackling midterms with double caffeine and hot momos. 🔥",image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"},{id:3,name:"Megha Sen",rating:5,likes:156,review:"Obsessed with the aesthetics here! Perfect lighting for selfies.",image:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"},{id:4,name:"The Foodie Duo",rating:5,likes:210,review:"Tried the Belgian chocolate shake today. Mind blown! 🥤",image:"https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80"}],gallery:[{id:"g1",category:"food",title:"Cheesy Sourdough Margherita",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"},{id:"g2",category:"seating",title:"Premium Velvet Seating Corner",image:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"},{id:"g3",category:"cafe",title:"The Zoop Espresso Bar",image:"https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"},{id:"g4",category:"food",title:"Belgian Chocolate Waffle Shake",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"},{id:"g5",category:"customers",title:"Co-Working at Zoop",image:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"},{id:"g6",category:"seating",title:"Ambient Evening Seating",image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"},{id:"g7",category:"food",title:"Sourdough Caprese Sandwich",image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"},{id:"g8",category:"cafe",title:"Neon Signature Entrance",image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"}]};window.adminAuthChecked=!1;window.isAdminLoggedIn=!1;document.addEventListener("DOMContentLoaded",()=>{fetch("/api/auth/status?_t="+Date.now()).then(o=>o.json()).then(o=>{window.isAdminLoggedIn=!!o.loggedIn,window.adminAuthChecked=!0,document.dispatchEvent(new CustomEvent("adminAuthChecked",{detail:o})),window.isAdminLoggedIn?(document.body.classList.add("admin-logged-in"),y()):document.body.classList.remove("admin-logged-in")}).catch(o=>{console.error("Admin authentication check failed:",o),window.isAdminLoggedIn=!1,window.adminAuthChecked=!0,document.body.classList.remove("admin-logged-in"),document.dispatchEvent(new CustomEvent("adminAuthChecked",{detail:{loggedIn:!1}}))})});function y(){b(),w(),E(),S(),v()}function v(){document.querySelectorAll(".admin-login-link").forEach(r=>{r.textContent="Logout (Admin)",r.href="/logout"})}function b(){const o=`
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
  `,r=document.createElement("style");r.textContent=o,document.head.appendChild(r)}function w(){const o=document.createElement("div");o.id="admin-cms-modals-container",o.innerHTML=`
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
  `,document.body.appendChild(o)}function E(){document.querySelectorAll(".cms-file-uploader").forEach(r=>{r.addEventListener("change",l=>{const c=l.target.files[0];if(!c)return;const n=r.dataset.target,e=document.getElementById(n),t=document.getElementById(n+"-preview"),a=r.parentNode.querySelector(".admin-upload-status");a&&(a.style.display="block",a.style.color="var(--accent-gold)",a.textContent="Uploading file...");const d=new FormData;d.append("image",c),fetch("/api/admin/upload",{method:"POST",body:d}).then(i=>{if(!i.ok)throw new Error("Upload failed");return i.json()}).then(i=>{e&&(e.value=i.url),t&&(t.src=i.url,t.style.display="block"),a&&(a.style.color="#10B981",a.textContent="Image uploaded successfully!")}).catch(i=>{console.error(i),a&&(a.style.color="#EF4444",a.textContent="Upload failed. Please retry.")})})})}function S(){window.openAdminModal=function(e){const t=document.getElementById(e);t&&t.classList.add("open")},window.closeAdminModal=function(e){const t=document.getElementById(e);t&&t.classList.remove("open")},document.querySelectorAll(".admin-modal-overlay").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&e.classList.remove("open")})});const r=document.getElementById("cms-menu-item-form");r==null||r.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("cms-menu-id").value,a=document.getElementById("cms-menu-name").value.trim(),d=document.getElementById("cms-menu-category").value,i=parseFloat(document.getElementById("cms-menu-price").value),s=document.getElementById("cms-menu-image").value,m=document.getElementById("cms-menu-desc").value.trim(),u=document.querySelector('input[name="cms-menu-veg"]:checked').value==="true",g={name:a,category:d,price:i,image:s,description:m,isVeg:u},f=t?"PUT":"POST",h=t?`/api/admin/menu/${t}`:"/api/admin/menu";fetch(h,{method:f,headers:{"Content-Type":"application/json"},body:JSON.stringify(g)}).then(p=>{if(!p.ok)throw new Error("Failed to save menu item");return p.json()}).then(()=>{closeAdminModal("modal-menu-item-overlay"),window.refreshCMSPage&&window.refreshCMSPage("menu")}).catch(p=>{console.error(p),alert("Error saving menu item.")})});const l=document.getElementById("cms-gallery-form");l==null||l.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("cms-gallery-type").value,a=document.getElementById("cms-gallery-image").value;if(t==="food"){const d=document.getElementById("cms-gallery-title").value.trim(),i=document.getElementById("cms-gallery-cat").value;fetch("/api/admin/gallery/food",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:d,category:i,image:a})}).then(()=>{closeAdminModal("modal-gallery-overlay"),window.refreshCMSPage&&window.refreshCMSPage("gallery")})}else{const s={name:document.getElementById("cms-gallery-title").value.trim(),review:"Customer Memory Upload",image:a,rating:5};fetch("/api/admin/gallery/selfie",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then(()=>{closeAdminModal("modal-gallery-overlay"),window.refreshCMSPage&&window.refreshCMSPage("gallery")})}});const c=document.getElementById("cms-special-form");c==null||c.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("cms-special-name").value.trim(),a=parseFloat(document.getElementById("cms-special-price").value),d=document.getElementById("cms-special-image").value,i=document.getElementById("cms-special-desc").value.trim();fetch("/api/admin/special",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,price:a,image:d,description:i})}).then(()=>{closeAdminModal("modal-special-overlay"),window.refreshCMSPage&&window.refreshCMSPage("home")})});const n=document.getElementById("cms-offers-form");n==null||n.addEventListener("submit",e=>{e.preventDefault();const t=[{id:"off1",tag:"Campus Deal",title:document.getElementById("cms-off1-title").value.trim(),price:document.getElementById("cms-off1-price").value.trim(),desc:document.getElementById("cms-off1-desc").value.trim()},{id:"off2",tag:"Weekend Vibe",title:document.getElementById("cms-off2-title").value.trim(),price:document.getElementById("cms-off2-price").value.trim(),desc:document.getElementById("cms-off2-desc").value.trim()},{id:"off3",tag:"Birthday Treat",title:document.getElementById("cms-off3-title").value.trim(),price:document.getElementById("cms-off3-price").value.trim(),desc:document.getElementById("cms-off3-desc").value.trim()}];fetch("/api/admin/special/offers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(()=>{closeAdminModal("modal-offers-overlay"),window.refreshCMSPage&&window.refreshCMSPage("home")})}),window.openAddMenuCMS=function(){document.getElementById("cms-menu-item-form").reset(),document.getElementById("cms-menu-id").value="",document.getElementById("menu-modal-title").innerHTML="Add <span>Menu Item</span>",document.getElementById("cms-menu-image").value="",document.getElementById("cms-menu-image-preview").style.display="none";const e=document.getElementById("cms-menu-image").parentNode.querySelector(".admin-upload-status");e&&(e.style.display="none"),openAdminModal("modal-menu-item-overlay")},window.openEditMenuCMS=function(e){fetch("/api/menu").then(t=>t.json()).then(t=>{const a=t.find(m=>(m.id||m._id)===e);if(!a)return;document.getElementById("cms-menu-id").value=e,document.getElementById("cms-menu-name").value=a.name,document.getElementById("cms-menu-category").value=a.category,document.getElementById("cms-menu-price").value=a.price,document.getElementById("cms-menu-desc").value=a.description,document.getElementById("cms-menu-image").value=a.image;const d=document.querySelector(`input[name="cms-menu-veg"][value="${a.isVeg}"]`);d&&(d.checked=!0);const i=document.getElementById("cms-menu-image-preview");i.src=a.image,i.style.display="block";const s=document.getElementById("cms-menu-image").parentNode.querySelector(".admin-upload-status");s&&(s.style.display="none"),document.getElementById("menu-modal-title").innerHTML="Edit <span>Menu Item</span>",openAdminModal("modal-menu-item-overlay")})},window.deleteMenuCMS=function(e){confirm("Are you sure you want to delete this menu item?")&&fetch(`/api/admin/menu/${e}`,{method:"DELETE"}).then(()=>{window.refreshCMSPage&&window.refreshCMSPage("menu")})},window.openAddGalleryCMS=function(e){document.getElementById("cms-gallery-form").reset(),document.getElementById("cms-gallery-type").value=e,document.getElementById("cms-gallery-image").value="",document.getElementById("cms-gallery-image-preview").style.display="none";const t=document.getElementById("cms-gallery-image").parentNode.querySelector(".admin-upload-status");t&&(t.style.display="none");const a=document.getElementById("gallery-modal-title"),d=document.getElementById("gallery-label-name"),i=document.getElementById("cms-gallery-cat-group");e==="food"?(a.innerHTML="Add <span>Food Photo</span>",d.textContent="Photo Title",i.style.display="block"):(a.innerHTML="Add <span>Guest Selfie</span>",d.textContent="Guest / Group Name",i.style.display="none"),openAdminModal("modal-gallery-overlay")},window.deleteGalleryCMS=function(e,t){if(!confirm("Are you sure you want to delete this photo memory?"))return;const a=t==="food"?`/api/admin/gallery/food/${e}`:`/api/admin/gallery/selfie/${e}`;fetch(a,{method:"DELETE"}).then(()=>{window.refreshCMSPage&&window.refreshCMSPage("gallery")})},window.deleteReviewCMS=function(e){confirm("Are you sure you want to delete this review?")&&fetch(`/api/admin/reviews/${e}`,{method:"DELETE"}).then(()=>{window.refreshCMSPage&&window.refreshCMSPage("reviews")})},window.openEditSpecialCMS=function(){fetch("/api/special").then(e=>e.json()).then(e=>{if(e.todaySpecial){document.getElementById("cms-special-name").value=e.todaySpecial.name||"",document.getElementById("cms-special-price").value=e.todaySpecial.price||"",document.getElementById("cms-special-image").value=e.todaySpecial.image||"",document.getElementById("cms-special-desc").value=e.todaySpecial.description||"";const t=document.getElementById("cms-special-image-preview");t.src=e.todaySpecial.image,t.style.display="block";const a=document.getElementById("cms-special-image").parentNode.querySelector(".admin-upload-status");a&&(a.style.display="none")}openAdminModal("modal-special-overlay")})},window.openEditOffersCMS=function(){fetch("/api/special").then(e=>e.json()).then(e=>{e.specialOffers&&e.specialOffers.length>=3&&(document.getElementById("cms-off1-title").value=e.specialOffers[0].title||"",document.getElementById("cms-off1-price").value=e.specialOffers[0].price||"",document.getElementById("cms-off1-desc").value=e.specialOffers[0].desc||"",document.getElementById("cms-off2-title").value=e.specialOffers[1].title||"",document.getElementById("cms-off2-price").value=e.specialOffers[1].price||"",document.getElementById("cms-off2-desc").value=e.specialOffers[1].desc||"",document.getElementById("cms-off3-title").value=e.specialOffers[2].title||"",document.getElementById("cms-off3-price").value=e.specialOffers[2].price||"",document.getElementById("cms-off3-desc").value=e.specialOffers[2].desc||""),openAdminModal("modal-offers-overlay")})}}document.addEventListener("DOMContentLoaded",()=>{x(),I(),B(),k()});function x(){if(!localStorage.getItem("zoop_today_special")){const o={name:"Rose & Honey Specialty Latte",price:129,image:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80",description:"A student favorite! Double shot of aromatic Arabica espresso, steamed milk, organic honey infusion, and fresh rose petal garnish. Sweet, warm, and highly energizing."};localStorage.setItem("zoop_today_special",JSON.stringify(o))}if(!localStorage.getItem("zoop_special_offers")){const o=[{id:"off1",tag:"Campus Deal",title:"Semester Survival Combo",desc:"A signature Cheesy Lava Burger, crispy skin-on French Fries, and a piping hot Adrak Elaichi Cutting Chai.",price:"₹169"},{id:"off2",tag:"Weekend Vibe",title:"Sunday Hangout Platter",desc:"Order any two of our hand-stretched sourdough pizzas and get two chilled mocktails of your choice free.",price:"Free Mocktails"},{id:"off3",tag:"Birthday Treat",title:"Birthday Bash Discount",desc:"Host your party at Zoop! Get flat 20% off your total bill and a complimentary Belgian chocolate shake.",price:"Flat 20% Off"}];localStorage.setItem("zoop_special_offers",JSON.stringify(o))}}function k(){typeof AOS<"u"&&AOS.init({duration:800,once:!0,offset:50,easing:"ease-out-cubic"}),gsap.from(".navbar, .header-mobile",{y:-20,opacity:0,duration:.6,ease:"power2.out"}),document.querySelector(".hero-content")&&gsap.from(".hero-content > *",{y:30,opacity:0,stagger:.15,duration:.8,ease:"power3.out"})}function I(){const o=document.querySelector(".menu-toggle-btn"),r=document.querySelector(".menu-drawer"),l=document.querySelector(".drawer-close-btn"),c=document.querySelectorAll(".drawer-link");if(!o||!r)return;const n=()=>{r.classList.add("open"),document.body.style.overflow="hidden",gsap.fromTo(".drawer-link",{x:30,opacity:0},{x:0,opacity:1,stagger:.08,duration:.4,ease:"power2.out",delay:.1})},e=()=>{r.classList.remove("open"),document.body.style.overflow="auto"};o.addEventListener("click",n),l&&l.addEventListener("click",e),c.forEach(i=>{i.addEventListener("click",e)});const a=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link, .bottom-nav-item, .drawer-link").forEach(i=>{const s=i.getAttribute("href");s===a||a==="index.html"&&s==="./"||a===""&&s==="index.html"?i.classList.add("active"):i.classList.remove("active")}),window.addEventListener("scroll",()=>{const i=document.querySelector(".navbar"),s=document.querySelector(".header-mobile");window.scrollY>50?(i==null||i.classList.add("scrolled"),s==null||s.classList.add("scrolled")):(i==null||i.classList.remove("scrolled"),s==null||s.classList.remove("scrolled"))})}function B(){const o=document.querySelector(".lightbox-modal"),r=o==null?void 0:o.querySelector("img"),l=o==null?void 0:o.querySelector(".lightbox-close");if(!o||!r)return;document.addEventListener("click",n=>{const e=n.target.closest("[data-lightbox]");if(e){n.preventDefault();const t=e.getAttribute("href")||e.getAttribute("src")||e.dataset.src;t&&(r.src=t,o.classList.add("open"),document.body.style.overflow="hidden")}});const c=()=>{o.classList.remove("open"),document.body.style.overflow="auto"};l==null||l.addEventListener("click",c),o.addEventListener("click",n=>{n.target===o&&c()})}
