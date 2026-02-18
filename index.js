import{S as b,i as m}from"./assets/vendor-CUPLp6fy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const L="50796026-dd0290b59f51794dc2657bbd2",E="https://pixabay.com/api/",w=async(e,r=1,s=24)=>{const n=new URLSearchParams({key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:r}),t=await fetch(`${E}?${n.toString()}`);if(!t.ok)throw new Error(t.status);return t.json()},S=({webformatURL:e,largeImageURL:r,tags:s,likes:n,views:t,comments:o,downloads:i})=>`
        <li class='gallery-card'>
            <a href="${r}">
                <img class="gallery-img" src="${e}" alt="${s}" loading="lazy" />
            </a>
            <div class="gallery-info">
                <p class="gallery-info-item">
                    <b>Likes</b>${n}
                </p>
                    <p class="gallery-info-item">
                <b>Views</b>${t}
                </p>
                <p class="gallery-info-item">
                    <b>Comments</b>${o}
                </p>
                <p class="gallery-info-item">
                    <b>Downloads</b>${i}
                </p>
            </div>
          </li>`,f=document.querySelector(".js-search-form"),a=document.querySelector(".js-gallery"),P=document.querySelector(".loader"),h=document.querySelector(".js-load-more"),g=24;let p="",d=1,c=0;const M=new b(".js-gallery a"),u=e=>{P.classList.toggle("is-hidden",!e)},l=e=>{h.classList.toggle("is-hidden",!e)},$=()=>{const e=a.firstElementChild;if(!e)return;const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})},v=e=>{const s=!(e>=c)&&e>=g;l(s)},A=e=>{const r=e.map(s=>S(s)).join("");d===1?a.innerHTML=r:a.insertAdjacentHTML("beforeend",r),M.refresh()},y=async()=>{u(!0);try{const e=await w(p,d,g);if(u(!1),e.hits.length===0){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l(!1);return}c=e.totalHits,A(e.hits);const r=a.children.length;e.hits.length<g||r>=c?l(!1):l(!0)}catch(e){u(!1),m.error({message:`${e}`,position:"topRight"})}},q=async e=>{e.preventDefault();const r=f.elements.user_query.value.trim();r!==""&&(p=r,d=1,c=0,a.innerHTML="",l(!1),await y(),f.reset())},j=async()=>{d+=1,await y();const e=a.children.length;v(e),$()};f.addEventListener("submit",q);h.addEventListener("click",j);
//# sourceMappingURL=index.js.map
