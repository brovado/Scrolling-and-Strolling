function openPlaceholderScreen(id){closeMenu&&closeMenu();closeCharacter&&closeCharacter();document.querySelectorAll('.placeholder-screen').forEach(el=>el.classList.remove('open'));const el=document.getElementById(id);if(el)el.classList.add('open');}
function closePlaceholderScreens(){document.querySelectorAll('.placeholder-screen').forEach(el=>el.classList.remove('open'));}
document.addEventListener('DOMContentLoaded',()=>{
const j=document.getElementById('journey-nav'); if(j) j.onclick=()=>openPlaceholderScreen('journey-screen');
const g=document.getElementById('gear-nav'); if(g) g.onclick=()=>openPlaceholderScreen('gear-screen');
const s=document.getElementById('skills-nav'); if(s) s.onclick=()=>openPlaceholderScreen('skills-screen');
document.querySelectorAll('.placeholder-close').forEach(btn=>btn.onclick=closePlaceholderScreens);
});