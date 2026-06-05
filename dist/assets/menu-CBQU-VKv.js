import"./main-zv1clUsT.js";/* empty css              */document.addEventListener("DOMContentLoaded",()=>{let o="all",c="",s=[];window.adminAuthChecked?d():document.addEventListener("adminAuthChecked",d);function d(){if(d.hasRun)return;d.hasRun=!0,m(),u(),l();const n=document.getElementById("menu-search-input");n&&n.addEventListener("input",a=>{c=a.target.value.toLowerCase().trim(),r(s)}),window.refreshCMSPage=function(a){a==="menu"&&l()}}function m(){const n=document.getElementById("menu-pills-container");if(!n)return;let a='<div class="menu-category-pill active" data-category="all"><i class="fa-solid fa-border-all"></i> All</div>';a+=window.cafeData.categories.map(e=>`
      <div class="menu-category-pill" data-category="${e.id}">
        <i class="fa-solid ${e.icon}"></i> ${e.name}
      </div>
    `).join(""),n.innerHTML=a;const i=n.querySelectorAll(".menu-category-pill");i.forEach(e=>{e.addEventListener("click",()=>{i.forEach(t=>t.classList.remove("active")),e.classList.add("active"),o=e.dataset.category,r(s),e.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})})})}function u(){const a=new URLSearchParams(window.location.search).get("cat");if(a){o=a;const i=document.querySelectorAll(".menu-category-pill");i.forEach(e=>{e.dataset.category===a&&(i.forEach(t=>t.classList.remove("active")),e.classList.add("active"),e.scrollIntoView({inline:"center"}))})}}function l(){fetch("/api/menu").then(n=>n.json()).then(n=>{s=n,r(s)}).catch(n=>console.error("Error fetching menu items:",n))}function r(n){const a=document.getElementById("menu-grid-container");if(!a)return;if(window.isAdminLoggedIn){const e=document.querySelector(".menu-controls");if(e&&!document.getElementById("admin-add-menu-banner")){const t=document.createElement("div");t.id="admin-add-menu-banner",t.className="admin-add-banner",t.style.marginTop="20px",t.innerHTML='<button onclick="openAddMenuCMS()"><i class="fa-solid fa-plus"></i> Add New Menu Item</button>',e.appendChild(t)}}const i=n.filter(e=>{const t=o==="all"||e.category===o,f=e.name.toLowerCase().includes(c)||e.description.toLowerCase().includes(c);return t&&f});if(i.length===0){a.innerHTML=`
        <div class="no-results">
          <i class="fa-solid fa-face-frown"></i>
          <h3>No items match your search</h3>
          <p style="color: var(--text-muted); margin-top: 10px;">Try searching for something else.</p>
        </div>
      `;return}a.innerHTML=i.map(e=>{const t=window.isAdminLoggedIn?`
        <div class="admin-card-controls">
          <div class="admin-btn admin-btn-edit" onclick="openEditMenuCMS('${e.id||e._id}')" title="Edit Item"><i class="fa-solid fa-pen"></i></div>
          <div class="admin-btn admin-btn-delete" onclick="deleteMenuCMS('${e.id||e._id}')" title="Delete Item"><i class="fa-solid fa-trash"></i></div>
        </div>
      `:"";return`
        <div class="food-card glass" data-id="${e.id||e._id}" style="position: relative;">
          ${t}
          <div class="food-img-container">
            <img src="${e.image}" alt="${e.name}">
            <div class="food-veg-tag ${e.isVeg?"veg":"non-veg"}">
              <i class="fa-solid fa-circle"></i>
            </div>
          </div>
          <div class="food-card-body">
            <div class="food-card-header" style="margin-bottom: 12px;">
              <h3 class="food-card-title">${e.name}</h3>
              <span class="food-card-price">₹${e.price}</span>
            </div>
            <p class="food-card-desc" style="margin-bottom: 0;">${e.description}</p>
          </div>
        </div>
      `}).join(""),gsap.fromTo(".food-card",{opacity:0,y:20},{opacity:1,y:0,duration:.4,stagger:.05,ease:"power2.out"})}});
