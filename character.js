const CHARACTER_MASTERY_LEVELS={Novice:1,Student:2,Disciple:3,Master:4,Grandmaster:5};

function characterIsLearned(name){
  return player.primary===name || player.secondary===name || !!player.mastery[name];
}

function characterMastery(name){
  return player.mastery[name] || (characterIsLearned(name)?"Novice":null);
}

function characterTechnique(name){
  const school=SCHOOLS[name];
  if(!school||!characterIsLearned(name))return "Not yet learned";
  const tier=Math.max(1,Math.min(5,CHARACTER_MASTERY_LEVELS[characterMastery(name)]||1));
  return school.techniques[Math.min(tier-1,school.techniques.length-1)];
}

function renderCharacterScreen(){
  $("character-level").textContent=player.level;
  $("character-hp").textContent=`${Math.max(0,player.hp)}/${player.maxHp}`;
  $("character-attack").textContent=player.attack;
  $("character-defense").textContent=player.defense;
  $("character-speed").textContent=player.speed;
  const active=player.primary;
  $("character-current-school").textContent=active?active.toUpperCase():"UNTRAINED";
  $("character-current-tech").textContent=active?characterTechnique(active):"No technique learned";

  const list=$("discipline-list");
  list.innerHTML="";
  Object.entries(SCHOOLS).forEach(([name,school])=>{
    const learned=characterIsLearned(name);
    const activeNow=active===name;
    const mastery=characterMastery(name);
    const tier=mastery?(CHARACTER_MASTERY_LEVELS[mastery]||1):0;
    const card=document.createElement("div");
    card.className=`discipline-card ${learned?"learned":"locked"} ${activeNow?"active":""}`;

    const top=document.createElement("div");
    top.className="discipline-top";

    const toggle=document.createElement("button");
    toggle.className="discipline-toggle";
    toggle.type="button";
    toggle.innerHTML=`<span class="discipline-name">${school.tag}</span><span class="discipline-motto">“${school.motto}”</span>`;
    toggle.title=learned?(activeNow?"Currently active":"Make this your active discipline"):"This discipline has not been learned yet";
    toggle.onclick=()=>{
      if(!learned)return;
      if(battle&&battle.running)return;
      if(player.primary!==name){
        if(player.secondary===name){
          const oldPrimary=player.primary;
          player.primary=name;
          player.secondary=oldPrimary;
        }
        updateStats();
        renderCharacterScreen();
      }
    };

    const bubbles=document.createElement("div");
    bubbles.className="discipline-bubbles";
    for(let i=1;i<=5;i++){
      const bubble=document.createElement("span");
      bubble.className=`mastery-bubble ${i<=tier?"lit":""}`;
      bubble.title=i<=tier?`Tier ${i}`:`Tier ${i} — locked`;
      bubbles.appendChild(bubble);
    }

    top.appendChild(toggle);
    top.appendChild(bubbles);

    const detail=document.createElement("div");
    detail.className="discipline-detail";
    const label=document.createElement("span");
    label.className="discipline-tech-label";
    label.textContent="CURRENT TECHNIQUE";
    const tech=document.createElement("span");
    tech.className="discipline-technique";
    tech.textContent=characterTechnique(name);
    const action=document.createElement("span");
    action.className="discipline-action";
    action.textContent=activeNow?"ACTIVE":(learned?"USE":"LOCKED");
    detail.appendChild(label);
    detail.appendChild(tech);
    detail.appendChild(action);

    card.appendChild(top);
    card.appendChild(detail);
    list.appendChild(card);
  });
}

function openCharacter(){
  if(battle&&battle.running)return;
  closeMenu();
  renderCharacterScreen();
  $("character-screen").classList.add("open");
  $("character-screen").setAttribute("aria-hidden","false");
}

function closeCharacter(){
  $("character-screen").classList.remove("open");
  $("character-screen").setAttribute("aria-hidden","true");
}

const originalUpdateStats=updateStats;
updateStats=function(persist=true){
  originalUpdateStats(persist);
  if($("character-screen")){
    renderCharacterScreen();
  }
};

function initCharacterScreen(){
  $("character-nav").onclick=openCharacter;
  $("go-character").onclick=openCharacter;
  $("close-character").onclick=closeCharacter;
  $("character-screen").onclick=e=>{if(e.target.id==="character-screen")closeCharacter();};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("character-screen").classList.contains("open"))closeCharacter();});
  renderCharacterScreen();
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initCharacterScreen);else initCharacterScreen();