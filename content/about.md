---
title: "About"
date: 2025-01-25
draft: false
type: "about"
---

<style>
  .flip-indicator {
    font-size: 2rem;
    color: #ffd54f;
    margin-right: 1rem;
    margin-left: 0.5rem;
    transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
    user-select: none;
    cursor: pointer;
    opacity: 0.85;
  }
  #profileSwap:hover .flip-indicator {
    transform: rotateY(180deg) scale(1.2);
    opacity: 1;
  }
  .profile-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 2rem;
  }
  .profile-text {
    text-align: right;
    min-width: 220px;
    flex: 1;
  }
  #profileImg {
    margin-left: 2rem;
    margin-right: 0;
    float: right;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  }
  #profileDesc {
    padding-right: 3.5rem;
  }
  #profileName {
    font-size: 1.5rem;
  }
  
  /* Responsive styles for small screens */
  @media (max-width: 576px) {
    .profile-right {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .profile-text {
      text-align: center;
      min-width: unset;
      width: 100%;
    }
    #profileImg {
      margin-left: 0;
      float: none;
    }
    #profileName {
      flex-direction: column;
      font-size: 1.25rem;
    }
    #profileNameText {
      text-align: center;
    }
    .flip-indicator {
      margin: 0.5rem 0 0 0;
      font-size: 1.5rem;
    }
    #profileDesc {
      padding-right: 0;
      text-align: center;
    }
  }
</style>

# About

<div class="profile-right mb-4" id="profileSwap" style="cursor:pointer;">
  <img id="profileImg" src="/face-grantsform.webp" alt="Avatar" class="rounded shadow" style="width:128px;height:128px;object-fit:cover;transition:box-shadow 0.2s;">
  <div class="profile-text">
    <h2 class="mb-1 d-flex align-items-center justify-content-end" id="profileName">
      <span id="profileNameText">GRANT'S FORM (@grantsform)</span>
      <span class="flip-indicator" id="flipIndicator" title="Click to flip profile">↻</span>
    </h2>
    <p class="lead mb-0" id="profileDesc"></p>
  </div>
</div>

<script>
// Avatar/name swap logic
const profiles = [
  { img: '/face-grantsform.webp', name: "GRANT'S FORM<br>(@grantsform)", desc: 'Big Baby.' },
  { img: '/face-jostgrant.webp', name: 'Joshua Steven Grant<br>(ie: Jost Grant)', desc: 'Man-Child.' }
];
let current = 0;
function updateProfile(idx) {
  document.getElementById('profileImg').src = profiles[idx].img;
  document.getElementById('profileNameText').innerHTML = profiles[idx].name;
  document.getElementById('profileDesc').textContent = profiles[idx].desc;
}
updateProfile(0);
document.getElementById('profileSwap').onclick = function() {
  current = 1 - current;
  updateProfile(current);
  document.getElementById('flipIndicator').style.transform = 'rotateY(360deg) scale(1.3)';
  setTimeout(function(){ document.getElementById('flipIndicator').style.transform = ''; }, 350);
};
</script>

<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">About GRANT'S FORM</h5>
    <p class="card-text">... ... ...</p>
  </div>
</div>

