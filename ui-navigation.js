function closeNavPages(){document.querySelectorAll('.nav-page').forEach(el=>{el.classList.remove('open');el.setAttribute('aria-hidden','true');});}
function setNavActive(id){document.querySelectorAll('.bottom-nav button').forEach(btn=>btn.classList.remove('active'));const el=document.getElementById(id);if(el)el.classList.add('active');}
function showNavPage(id,navId){closeMenu&&closeMenu();closeCharacter&&closeCharacter();closeNavPages();const page=document.getElementById(id);if(page){page.classList.add('open');page.setAttribute('aria-hidden','false');}setNavActive(navId);}
function returnToJourney(){closeNavPages();closeMenu&&closeMenu();closeCharacter&&closeCharacter();setNavActive('journey-nav');}
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.getElementById('menu-nav'),character=document.getElementById('character-nav'),journey=document.getElementById('journey-nav'),gear=document.getElementById('gear-nav'),skills=document.getElementById('skills-nav');
 if(menu)menu.onclick=()=>{closeNavPages();setNavActive('menu-nav');openMenu();};
 if(character)character.onclick=()=>{closeNavPages();setNavActive('character-nav');openCharacter();};
 if(journey)journey.onclick=returnToJourney;
 if(gear)gear.onclick=()=>showNavPage('gear-screen','gear-nav');
 if(skills)skills.onclick=()=>showNavPage('skills-screen','skills-nav');
 const top=document.getElementById('top-menu');if(top)top.onclick=()=>{closeNavPages();setNavActive('menu-nav');openMenu();};
 const goCharacter=document.getElementById('go-character');if(goCharacter)goCharacter.addEventListener('click',()=>{closeMenu();setNavActive('character-nav');openCharacter();});
});