const SAVE = "scrollingStrollingRPG";
const player = { level: 1, xp: 0, hp: 40, maxHp: 40, attack: 8, defense: 3, speed: 10 };

const enemies = [
  { name: "Road Bandit", hp: 22, attack: 6, defense: 2, speed: 7, xp: 10 },
  { name: "Wandering Ronin", hp: 28, attack: 7, defense: 3, speed: 11, xp: 15 },
  { name: "Mountain Thug", hp: 35, attack: 9, defense: 4, speed: 5, xp: 20 }
];

const encounters = [
  { type: "combat", title: "Bandits on the Road", text: "Three figures step into your path. Steel leaves its sheath.", enemy: enemies[0] },
  { type: "combat", title: "A Wandering Duelist", text: "A lone swordsman watches you pass. He raises his blade.", enemy: enemies[1] },
  { type: "reward", title: "A Whetstone", text: "You find a fine whetstone beside the road.", choices: [
    { text: "Sharpen your sword", effect: { attack: 2 }, result: "Your blade feels keener." },
    { text: "Keep walking", result: "You leave it behind." }
  ]},
  { type: "reward", title: "A Quiet Shrine", text: "A forgotten shrine rests beneath an ancient tree.", choices: [
    { text: "Rest here", effect: { hp: 10 }, result: "You recover your breath and continue onward." },
    { text: "Pray", effect: { maxHp: 3, hp: 3 }, result: "Something about the shrine strengthens you." }
  ]}
];

let battle = null;
const $ = id => document.getElementById(id);

function save() { localStorage.setItem(SAVE, JSON.stringify(player)); }
function load() { try { Object.assign(player, JSON.parse(localStorage.getItem(SAVE)) || {}); } catch (_) {} }
function updateStats() {
  $("level").textContent = player.level;
  $("hp").textContent = `${Math.max(0, player.hp)}/${player.maxHp}`;
  $("attack").textContent = player.attack;
  $("defense").textContent = player.defense;
  $("speed").textContent = player.speed;
  save();
}
function buttons(list) {
  $("choices").innerHTML = "";
  list.forEach(item => {
    const b = document.createElement("button"); b.textContent = item.text; b.onclick = item.action; $("choices").appendChild(b);
  });
}
function nextEncounter() {
  battle = null; $("mode").textContent = "THE ROAD AHEAD";
  const e = encounters[Math.floor(Math.random() * encounters.length)];
  $("event-title").textContent = e.title; $("event-text").textContent = e.text;
  if (e.type === "combat") {
    buttons([{ text: "Face the enemy", action: () => startBattle(e.enemy) }]);
  } else {
    buttons(e.choices.map(c => ({ text: c.text, action: () => resolveReward(c) })));
  }
}
function resolveReward(choice) {
  Object.entries(choice.effect || {}).forEach(([key, value]) => player[key] += value);
  updateStats(); $("event-title").textContent = "The Road Continues"; $("event-text").textContent = choice.result;
  buttons([{ text: "Continue walking", action: nextEncounter }]);
}
function startBattle(template) {
  battle = { enemy: { ...template }, turn: player.speed >= template.speed ? "player" : "enemy" };
  $("mode").textContent = "COMBAT"; renderBattle();
}
function damage(attacker, defender) { return Math.max(1, attacker.attack - defender.defense + Math.floor(Math.random() * 3)); }
function renderBattle() {
  const e = battle.enemy;
  $("event-title").textContent = `${e.name}  —  ${Math.max(0, e.hp)} HP`;
  $("event-text").textContent = `You: ${player.hp}/${player.maxHp} HP  •  ${battle.turn === "player" ? "Your turn" : "Enemy turn"}`;
  if (battle.turn === "player") {
    buttons([
      { text: "Attack", action: playerAttack },
      { text: "Guard", action: guard }
    ]);
  } else {
    buttons([{ text: "Resolve enemy turn", action: enemyTurn }]);
  }
}
function playerAttack() {
  const d = damage(player, battle.enemy); battle.enemy.hp -= d;
  if (battle.enemy.hp <= 0) return victory(d);
  battle.turn = "enemy"; renderBattle();
}
function guard() { battle.guarding = true; battle.turn = "enemy"; renderBattle(); }
function enemyTurn() {
  let d = damage(battle.enemy, player); if (battle.guarding) d = Math.max(1, Math.floor(d / 2));
  player.hp -= d; battle.guarding = false;
  if (player.hp <= 0) return defeat();
  battle.turn = "player"; renderBattle(); updateStats();
}
function victory() {
  const gained = battle.enemy.xp; player.xp += gained; levelCheck(); updateStats();
  $("mode").textContent = "VICTORY"; $("event-title").textContent = `${battle.enemy.name} defeated`;
  $("event-text").textContent = `You gain ${gained} XP. The road awaits.`;
  buttons([{ text: "Continue walking", action: nextEncounter }]); battle = null;
}
function defeat() {
  $("mode").textContent = "DEFEAT"; $("event-title").textContent = "The Journey Ends";
  $("event-text").textContent = "Your strength gives out on the road.";
  buttons([{ text: "Begin a new journey", action: newGame }]);
}
function levelCheck() {
  const needed = player.level * 25;
  if (player.xp >= needed) { player.xp -= needed; player.level++; player.maxHp += 8; player.hp = player.maxHp; player.attack += 2; player.defense += 1; }
}
function newGame() { localStorage.removeItem(SAVE); Object.assign(player, { level:1,xp:0,hp:40,maxHp:40,attack:8,defense:3,speed:10 }); updateStats(); nextEncounter(); }
load(); updateStats(); nextEncounter();
