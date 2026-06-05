import"./main-zv1clUsT.js";/* empty css              */document.addEventListener("DOMContentLoaded",()=>{let l=5;window.adminAuthChecked?d():document.addEventListener("adminAuthChecked",d);function d(){d.hasRun||(d.hasRun=!0,c(),f(),p(),window.refreshCMSPage=function(a){a==="reviews"&&c()})}function c(){const a=document.getElementById("reviews-page-merged-container");a&&Promise.all([fetch("/api/reviews").then(t=>t.json()),fetch("/api/gallery/selfie").then(t=>t.json())]).then(([t,i])=>{const o=[];i.forEach(e=>{o.push({id:"s_"+(e.id||e._id),dbId:e.id||e._id,type:"selfie",name:e.name,role:"Verified Guest",rating:e.rating,review:e.review,image:e.image,likes:e.likes||0,date:e.date||"June 4, 2026"})}),t.forEach((e,s)=>{o.push({id:"r_"+(e.id||e._id),dbId:e.id||e._id,type:"review",name:e.name,role:e.role||"Campus Regular",rating:e.rating,review:e.review,image:e.image||null,likes:Math.floor(Math.random()*40)+12,date:e.date||"June 4, 2026"})}),a.innerHTML=o.map(e=>{const s=Array(e.rating).fill('<i class="fa-solid fa-star"></i>').join("")+Array(5-e.rating).fill('<i class="fa-regular fa-star"></i>').join(""),n=window.isAdminLoggedIn?`
          <div class="admin-card-controls">
            <div class="admin-btn admin-btn-delete" onclick="${e.type==="selfie"?"deleteGalleryCMS":"deleteReviewCMS"}('${e.dbId}', '${e.type}')" title="Delete Review"><i class="fa-solid fa-trash"></i></div>
          </div>
        `:"",r=e.image?`
          <div class="food-img-container" style="aspect-ratio: 1/1;">
            <img src="${e.image}" alt="${e.name}" style="height: 100%; object-fit: cover;">
          </div>
        `:"";return`
          <div class="food-card glass" style="display: flex; flex-direction: column; height: 100%; position: relative;">
            ${n}
            ${r}
            <div class="food-card-body" style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
              <div style="color: var(--accent-gold); font-size: 0.8rem; margin-bottom: 8px;">${s}</div>
              <p style="font-size: 0.9rem; line-height: 1.5; font-style: italic; color: var(--text-primary); flex-grow: 1; margin-bottom: 20px;">
                "${e.review}"
              </p>
              <div class="review-user" style="border-top: 1px solid var(--border-glass); padding-top: 15px; margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="font-family: var(--font-title); font-weight: 700; font-size: 0.95rem; line-height: 1.2;">${e.name}</h4>
                  <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${e.role}</span>
                    <span style="font-size: 0.65rem; color: var(--accent-gold); opacity: 0.5;">&bull;</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${e.date}</span>
                  </div>
                </div>
                <span class="selfie-likes" onclick="toggleLike(this, '${e.id}')">
                  <i class="fa-regular fa-heart"></i> <span class="likes-count">${e.likes}</span>
                </span>
              </div>
            </div>
          </div>
        `}).join(""),gsap.fromTo(".food-card",{opacity:0,y:20},{opacity:1,y:0,duration:.4,stagger:.05,ease:"power2.out"})}).catch(t=>console.error("Error rendering merged reviews:",t))}window.toggleLike=function(a,t){const i=a.querySelector("i"),o=a.querySelector(".likes-count");let e=parseInt(o.textContent);i.classList.contains("fa-regular")?(i.classList.remove("fa-regular"),i.classList.add("fa-solid"),e++,o.textContent=e,gsap.fromTo(i,{scale:1},{scale:1.4,duration:.2,yoyo:!0,repeat:1})):(i.classList.remove("fa-solid"),i.classList.add("fa-regular"),e--,o.textContent=e)};function f(){const a=document.getElementById("star-rating-selector");if(!a)return;const t=a.querySelectorAll("i");t.forEach(i=>{i.addEventListener("click",()=>{const o=parseInt(i.dataset.value);l=o,t.forEach(e=>{parseInt(e.dataset.value)<=o?(e.classList.remove("fa-regular"),e.classList.add("fa-solid"),e.classList.add("active")):(e.classList.remove("fa-solid"),e.classList.add("fa-regular"),e.classList.remove("active"))})})})}function p(){const a=document.getElementById("add-review-form");a&&a.addEventListener("submit",t=>{t.preventDefault();const i=document.getElementById("reviewer-name").value.trim(),o=document.getElementById("reviewer-role").value.trim(),e=document.getElementById("reviewer-photo-url").value.trim(),s=document.getElementById("reviewer-text").value.trim();let n;e?n=fetch("/api/gallery/selfie",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,rating:l,review:s,image:e})}):n=fetch("/api/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,role:o,rating:l,review:s})}),n.then(r=>{if(!r.ok)throw new Error("Submission failed");return r.json()}).then(()=>{c(),a.reset(),u(),g("Thank you! Your feedback has been posted successfully.")}).catch(r=>{console.error(r),alert("Error submitting feedback. Please try again.")})})}function u(){const a=document.getElementById("star-rating-selector");if(!a)return;a.querySelectorAll("i").forEach(i=>{i.classList.remove("fa-regular"),i.classList.add("fa-solid"),i.classList.add("active")}),l=5}function g(a){const t=document.createElement("div");t.style.position="fixed",t.style.bottom="90px",t.style.left="50%",t.style.transform="translateX(-50%) translateY(50px)",t.style.zIndex="9999",t.style.padding="15px 30px",t.style.borderRadius="var(--radius-full)",t.style.background="rgba(20, 20, 22, 0.95)",t.style.border="1px solid var(--accent-gold)",t.style.color="var(--text-primary)",t.style.fontSize="0.9rem",t.style.fontFamily="var(--font-title)",t.style.boxShadow="var(--glow-shadow)",t.style.backdropFilter="blur(10px)",t.style.opacity="0",t.innerHTML=`<i class="fa-solid fa-circle-check text-gold" style="margin-right: 8px;"></i> ${a}`,document.body.appendChild(t),gsap.to(t,{opacity:1,y:0,duration:.4,ease:"power3.out",onComplete:()=>{setTimeout(()=>{gsap.to(t,{opacity:0,y:-20,duration:.4,ease:"power3.in",onComplete:()=>{t.remove()}})},2500)}})}});
