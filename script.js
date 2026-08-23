const SAVE="scrollingStrollingRPG";
const player={level:1,xp:0,hp:40,maxHp:40,attack:8,defense:3,speed:10};
const enemies=[{name:"Road Bandit",hp:22,attack:6,defense:2,speed:7,xp:10,model:"🥷"},{name:"Wandering Ronin",hp:28,attack:7,defense:3,speed:11,xp:15,model:"⚔️"},{name:"Mountain Thug",hp:35,attack:9,defense:4,speed:5,xp:20,model:"👹"}];
const encounters=[{type:"combat",title:"Bandits on the Road",text:"Three figures step into your path. Steel leaves its sheath.",enemy:enemies[0]},{type:"combat",title:"A Wandering Duelist",text:"A lone swordsman watches you pass. He raises his blade.",enemy:enemies[1]},{type:"choice",title:"A Whetstone",text:"A fine whetstone rests beside the road. How will you use it?",choices:[{text:"Sharpen your sword",effect:{attack:2},result:"Your blade feels keener. Attack +2."},{text:"Keep it for later",effect:{speed:1},result:"You pocket the stone and feel prepared. Speed +1."}]},{type:"choice",title:"A Strange Teacher",text:"An old swordsman studies your stance. He offers to teach you one principle.",choices:[{text:"Learn his quick step",effect:{speed:2},result:"You learn to move before your opponent expects it. Speed +2."},{text:"Learn his iron guard",effect:{defense:2},result:"You learn to absorb a blow without yielding. Defense +2."},{text:"Learn his killing stroke",effect:{attack:2},result:"You learn a devastating cut. Attack +2."}]}];
let battle=null,transitioning=false;const $=id=>document.getElementById(id);
function resetPlayer(){Object.assign(player,{level:1,xp:0,hp:40,maxHp:40,attack:8,defense:3,speed:10});localStorage.removeItem(SAVE);}
function save(){localStorage.setItem(SAVE,JSON.stringify(player));}function load(){resetPlayer();}
function updateStats(){const ids={level:"level",hp:"hp",attack:"attack",defense:"defense",speed:"speed",xp:"xp"};Object.entries(ids).forEach(([k,id])=>$(id).textContent=k==="hp"?`${Math.max(0,player.hp)}/${player.maxHp}`:player[k]);$("level-card").textContent=player.level;$("menu-level").textContent=player.level;$("main-hpbar").style.width=`${Math.max(0,player.hp/player.maxHp*100)}%`;const need=player.level*25;$("xpbar").style.width=`${Math.min(100,player.xp/need*100)}%`;updateStageBars();save();}
function updateStageBars(){if(!$("stage-player-stam"))return;const pm=battle?battle.playerMeter:0,em=battle?battle.enemyMeter:0;$("stage-player-stam").style.width=`${pm}%`;$("stage-enemy-stam").style.width=`${em}%`;}
function openMenu(){if(battle&&battle.running)return;$("menu-overlay").classList.add("open");$("menu-overlay").setAttribute("aria-hidden","false");$("menu-level").textContent=player.level;}
function closeMenu(){$("menu-overlay").classList.remove("open");$("menu-overlay").setAttribute("aria-hidden","true");}
function buttons(list){$("choices").innerHTML="";list.forEach(item=>{const b=document.createElement("button");b.textContent=item.text;b.onclick=item.action;$("choices").appendChild(b);});}
function clearObjective(){
  $("stage-enemy-model").textContent="";
  $("stage-enemy-name").textContent="";
  $("stage-enemy-hp").style.width="0%";
  $("stage-enemy-stam").style.width="0%";
}
function setScene(mode,enemy=null){$("stage-mode").textContent=mode;$("stage-player-hp").style.width=`${Math.max(0,player.hp/player.maxHp*100)}%`;if(enemy){$("stage-enemy-model").textContent=enemy.model;$("stage-enemy-name").textContent=enemy.name.toUpperCase();$("stage-enemy-hp").style.width=`${Math.max(0,enemy.hp/enemy.maxHp*100)}%`;}else{clearObjective();}updateStageBars();}
function walkToObjective(e){
  if(transitioning)return;
  transitioning=true;
  const scene=$("combat-scene"),pc=$("player-stage"),target=$("enemy-stage");
  scene.classList.remove("walking","arrived");pc.classList.remove("approaching");target.classList.remove("objective-arrival");
  clearObjective();
  $("mode").textContent="TRAVELING";$("event-title").textContent="The Road Continues";$("event-text").textContent="You walk steadily onward...";$("choices").innerHTML="";$("stage-mode").textContent="TRAVELING";
  void scene.offsetWidth;scene.classList.add("walking");pc.classList.add("approaching");
  setTimeout(()=>{
    scene.classList.remove("walking");pc.classList.remove("approaching");scene.classList.add("arrived");
    if(e.type==="combat")setScene("ENCOUNTER",e.enemy);else{setScene("ENCOUNTER");$("stage-enemy-model").textContent="?";$("stage-enemy-name").textContent="THE ROAD AHEAD";}
    $("mode").textContent="ENCOUNTER";$("event-title").textContent=e.title;$("event-text").textContent=e.text;
    setTimeout(()=>{scene.classList.remove("arrived");transitioning=false;if(e.type==="combat")startBattle(e.enemy);else showEncounter(e);},500);
  },1150);
}
function nextEncounter(){if(battle&&battle.running)return;battle=null;clearObjective();const e=encounters[Math.floor(Math.random()*encounters.length)];$("mode").textContent="TRAVELING";$("event-title").textContent="The Road Continues";$("event-text").textContent="You walk steadily onward...";$("choices").innerHTML="";setScene("TRAVELING");walkToObjective(e);}
function showEncounter(e){setScene("A DECISION");$("mode").textContent="THE ROAD AHEAD";$("event-title").textContent=e.title;$("event-text").textContent=e.text;buttons(e.choices.map(c=>({text:c.text,action:()=>resolveChoice(c)})));}
function resolveChoice(c){Object.entries(c.effect||{}).forEach(([k,v])=>player[k]+=v);updateStats();$("mode").textContent="THE ROAD CONTINUES";$("event-title").textContent="Your Path Changes";$("event-text").textContent=c.result;buttons([{text:"Continue walking",action:nextEncounter}]);setScene("TRAVELING");clearObjective();}
function startBattle(template){battle={enemy:{...template,maxHp:template.hp},playerMeter:0,enemyMeter:0,lastTime:performance.now(),running:true};$("mode").textContent="RESOLVING COMBAT";$("event-title").textContent="Combat is resolving...";$("event-text").textContent="Your actions are automatic. Watch the battle above.";$("choices").innerHTML="";setScene("COMBAT",battle.enemy);requestAnimationFrame(combatLoop);}
function damage(a,d){return Math.max(1,a.attack-d.defense+Math.floor(Math.random()*3));}
function combatLoop(now){if(!battle||!battle.running)return;const dt=Math.min(.05,(now-battle.lastTime)/1000);battle.lastTime=now;battle.playerMeter=Math.min(100,battle.playerMeter+dt*player.speed*4);battle.enemyMeter=Math.min(100,battle.enemyMeter+dt*battle.enemy.speed*4);if(battle.playerMeter>=100||battle.enemyMeter>=100){if(battle.playerMeter>=100&&battle.enemyMeter>=100){if(player.speed>=battle.enemy.speed)doPlayerAttack();else doEnemyAttack();}else if(battle.playerMeter>=100)doPlayerAttack();else doEnemyAttack();if(!battle||!battle.running)return;}updateCombatBars();updateStageBars();requestAnimationFrame(combatLoop);}
function doPlayerAttack(){battle.playerMeter=0;const d=damage(player,battle.enemy);battle.enemy.hp-=d;animateAttack("player");floatDamage("enemy",d);updateCombatBars();updateStageBars();if(battle.enemy.hp<=0)victory();}
function doEnemyAttack(){battle.enemyMeter=0;const d=damage(battle.enemy,player);player.hp-=d;animateAttack("enemy");floatDamage("player",d);updateStats();updateCombatBars();updateStageBars();if(player.hp<=0)defeat();}
function updateCombatBars(){if(!battle)return;const e=battle.enemy;$("stage-player-hp").style.width=`${Math.max(0,player.hp/player.maxHp*100)}%`;$("stage-enemy-hp").style.width=`${Math.max(0,e.hp/e.maxHp*100)}%`;}
function animateAttack(side){const el=document.querySelector(`.${side}-stage`);if(!el)return;el.classList.remove("stage-attacking");void el.offsetWidth;el.classList.add("stage-attacking");setTimeout(()=>el.classList.remove("stage-attacking"),350);}
function floatDamage(side,d){const el=document.querySelector(`.${side}-stage`);if(!el)return;const n=document.createElement("span");n.className="stage-damage";n.textContent=`-${d}`;el.appendChild(n);setTimeout(()=>n.remove(),800);}
function victory(){if(!battle)return;const defeated=battle.enemy;battle.running=false;const gained=defeated.xp;player.xp+=gained;levelCheck();updateStats();$("mode").textContent="VICTORY";$("event-title").textContent=`${defeated.name} defeated`;$("event-text").textContent=`Victory. You gain ${gained} XP.`;setScene("VICTORY",null);buttons([{text:"Continue walking",action:nextEncounter}]);battle=null;updateStageBars();}
function defeat(){if(battle)battle.running=false;battle=null;$("mode").textContent="DEFEAT";$("event-title").textContent="The Journey Ends";$("event-text").textContent="Your strength gives out on the road.";buttons([{text:"Begin a new journey",action:newGame}]);setScene("DEFEAT");updateStageBars();}
function levelCheck(){const n=player.level*25;if(player.xp>=n){player.xp-=n;player.level++;player.maxHp+=8;player.hp=player.maxHp;player.attack+=2;player.defense+=1;}}
function newGame(){resetPlayer();closeMenu();updateStats();nextEncounter();}
$("top-menu").onclick=openMenu;$("menu-nav").onclick=openMenu;$("close-menu").onclick=closeMenu;$("reset-game").onclick=()=>{if(confirm("Reset your journey and return to Level 1?"))newGame();};$("menu-overlay").onclick=e=>{if(e.target.id==="menu-overlay")closeMenu();};
load();updateStats();nextEncounter();