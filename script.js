const SAVE="scrollingStrollingRPG";
const player={level:1,xp:0,hp:40,maxHp:40,attack:8,defense:3,speed:10};
const enemies=[
 {name:"Road Bandit",hp:22,attack:6,defense:2,speed:7,xp:10},
 {name:"Wandering Ronin",hp:28,attack:7,defense:3,speed:11,xp:15},
 {name:"Mountain Thug",hp:35,attack:9,defense:4,speed:5,xp:20}
];
const encounters=[
 {type:"combat",title:"Bandits on the Road",text:"Three figures step into your path. Steel leaves its sheath.",enemy:enemies[0]},
 {type:"combat",title:"A Wandering Duelist",text:"A lone swordsman watches you pass. He raises his blade.",enemy:enemies[1]},
 {type:"choice",title:"A Whetstone",text:"A fine whetstone rests beside the road. How will you use it?",choices:[
  {text:"Sharpen your sword",effect:{attack:2},result:"Your blade feels keener. Attack +2."},
  {text:"Keep it for later",effect:{speed:1},result:"You pocket the stone and feel prepared. Speed +1."}]},
 {type:"choice",title:"A Strange Teacher",text:"An old swordsman studies your stance. He offers to teach you one principle.",choices:[
  {text:"Learn his quick step",effect:{speed:2},result:"You learn to move before your opponent expects it. Speed +2."},
  {text:"Learn his iron guard",effect:{defense:2},result:"You learn to absorb a blow without yielding. Defense +2."},
  {text:"Learn his killing stroke",effect:{attack:2},result:"You learn a devastating cut. Attack +2."}]}
];
let battle=null;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(SAVE,JSON.stringify(player));}
function load(){try{Object.assign(player,JSON.parse(localStorage.getItem(SAVE))||{});}catch(_){} }
function updateStats(){["level","hp","attack","defense","speed","xp"].forEach(id=>{let v=id==="hp"?`${Math.max(0,player.hp)}/${player.maxHp}`:player[id];$(id).textContent=v;});save();}
function buttons(list){$("choices").innerHTML="";list.forEach(item=>{const b=document.createElement("button");b.textContent=item.text;b.onclick=item.action;$("choices").appendChild(b);});}
function nextEncounter(){battle=null;$("mode").textContent="THE ROAD AHEAD";const e=encounters[Math.floor(Math.random()*encounters.length)];$("event-title").textContent=e.title;$("event-text").textContent=e.text;if(e.type==="combat")startBattle(e.enemy);else buttons(e.choices.map(c=>({text:c.text,action:()=>resolveChoice(c)})));}
function resolveChoice(choice){Object.entries(choice.effect||{}).forEach(([k,v])=>player[k]+=v);updateStats();$("mode").textContent="THE ROAD CONTINUES";$("event-title").textContent="Your Path Changes";$("event-text").textContent=choice.result;buttons([{text:"Continue walking",action:nextEncounter}]);}
function startBattle(template){battle={enemy:{...template},turn:player.speed>=template.speed?"player":"enemy"};$("mode").textContent="COMBAT";showBattle();setTimeout(runTurn,800);}
function damage(a,d){return Math.max(1,a.attack-d.defense+Math.floor(Math.random()*3));}
function showBattle(){const e=battle.enemy;$("event-title").textContent=e.name;$("event-text").innerHTML=`<div class="battlefield"><div class="fighter player-fighter"><div class="model">⚔️</div><div class="name">WANDERER</div><div class="hpbar"><i style="width:${player.hp/player.maxHp*100}%"></i></div><small>${Math.max(0,player.hp)} / ${player.maxHp}</small></div><div class="vs">VS</div><div class="fighter enemy-fighter"><div class="model">🥷</div><div class="name">${e.name.toUpperCase()}</div><div class="hpbar"><i style="width:${Math.max(0,e.hp)/e.maxHp*100}%"></i></div><small>${Math.max(0,e.hp)} / ${e.maxHp}</small></div></div><div id="battle-log">${battle.message||"The fighters face one another."}</div>`;$("choices").innerHTML="";}
function runTurn(){if(!battle)return;const e=battle.enemy;const attacker=battle.turn;const defender=attacker==="player"?e:player;const targetClass=attacker==="player"?".player-fighter":".enemy-fighter";const targetSelector=attacker==="player"?".enemy-fighter":".player-fighter";const d=damage(attacker==="player"?player:e,defender);document.querySelector(targetClass).classList.add("attacking");setTimeout(()=>{document.querySelector(targetClass).classList.remove("attacking");defender.hp-=d;showDamage(targetSelector,d);updateStats();if(defender.hp<=0){setTimeout(()=>attacker==="player"?victory():defeat(),700);return;}battle.turn=attacker==="player"?"enemy":"player";battle.message=`${attacker==="player"?"The wanderer":"The enemy"} strikes for ${d} damage.`;setTimeout(()=>{showBattle();setTimeout(runTurn,650);},650);},400);}
function showDamage(selector,d){const target=document.querySelector(selector);if(!target)return;const n=document.createElement("span");n.className="damage-float";n.textContent=`-${d}`;target.appendChild(n);setTimeout(()=>n.remove(),900);}
function victory(){const gained=battle.enemy.xp;player.xp+=gained;levelCheck();updateStats();$("mode").textContent="VICTORY";$("event-title").textContent=`${battle.enemy.name} defeated`;$("event-text").textContent=`Victory. You gain ${gained} XP.`;buttons([{text:"Continue walking",action:nextEncounter}]);battle=null;}
function defeat(){$("mode").textContent="DEFEAT";$("event-title").textContent="The Journey Ends";$("event-text").textContent="Your strength gives out on the road.";buttons([{text:"Begin a new journey",action:newGame}]);}
function levelCheck(){const needed=player.level*25;if(player.xp>=needed){player.xp-=needed;player.level++;player.maxHp+=8;player.hp=player.maxHp;player.attack+=2;player.defense+=1;}}
function newGame(){localStorage.removeItem(SAVE);Object.assign(player,{level:1,xp:0,hp:40,maxHp:40,attack:8,defense:3,speed:10});updateStats();nextEncounter();}
load();updateStats();nextEncounter();
