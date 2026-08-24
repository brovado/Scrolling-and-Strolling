/*
 * Common road opponents.
 * Loaded after the core script but before DOMContentLoaded, so the existing
 * encounter system can keep its structure while this roster expands the pool.
 * Most are intentionally low-threat: they are the road's everyday grind.
 */
const FILLER_MOBS=[
 {name:"Roadside Thief",hp:15,attack:4,defense:1,speed:6,xp:3,model:"🗡️",tier:"filler"},
 {name:"Petty Bandit",hp:16,attack:4,defense:1,speed:7,xp:3,model:"🥷",tier:"filler"},
 {name:"Young Bandit",hp:17,attack:5,defense:1,speed:8,xp:3,model:"🥷",tier:"filler"},
 {name:"Highway Robber",hp:18,attack:5,defense:1,speed:6,xp:5,model:"🪓",tier:"filler"},
 {name:"Drifter",hp:16,attack:5,defense:2,speed:8,xp:3,model:"🧥",tier:"filler"},
 {name:"Street Ruffian",hp:19,attack:5,defense:1,speed:7,xp:3,model:"👊",tier:"filler"},
 {name:"Roadside Ruffian",hp:20,attack:6,defense:2,speed:6,xp:5,model:"👊",tier:"filler"},
 {name:"Pickpocket",hp:13,attack:4,defense:1,speed:11,xp:3,model:"🧤",tier:"filler"},
 {name:"Camp Thief",hp:18,attack:5,defense:2,speed:7,xp:3,model:"🏕️",tier:"filler"},
 {name:"Wandering Scoundrel",hp:21,attack:5,defense:2,speed:8,xp:5,model:"😈",tier:"filler"},
 {name:"Reckless Student",hp:17,attack:5,defense:1,speed:9,xp:3,model:"🥋",tier:"filler"},
 {name:"Dueling Novice",hp:20,attack:6,defense:2,speed:9,xp:5,model:"⚔️",tier:"filler"},
 {name:"Drunken Fighter",hp:22,attack:6,defense:2,speed:5,xp:5,model:"🍶",tier:"filler"},
 {name:"Farmhand Turned Thief",hp:21,attack:6,defense:2,speed:6,xp:5,model:"🌾",tier:"filler"},
 {name:"Runaway Soldier",hp:23,attack:6,defense:2,speed:7,xp:5,model:"🪖",tier:"filler"},
 {name:"Petty Highwayman",hp:24,attack:6,defense:2,speed:8,xp:5,model:"🎒",tier:"filler"},
 {name:"Roadside Spearman",hp:24,attack:6,defense:3,speed:6,xp:5,model:"🔱",tier:"filler"},
 {name:"Apprentice Duelist",hp:25,attack:7,defense:2,speed:9,xp:5,model:"⚔️",tier:"filler"}
];

const THEME_MOBS=[
 {name:"Wandering Ronin",hp:28,attack:7,defense:3,speed:11,xp:7,model:"⚔️",tier:"theme"},
 {name:"Mountain Thug",hp:35,attack:9,defense:4,speed:5,xp:10,model:"👹",tier:"theme"},
 {name:"Rifleman",hp:25,attack:11,defense:2,speed:8,xp:10,model:"🎯",tier:"theme"},
 {name:"Veteran Duelist",hp:42,attack:10,defense:5,speed:9,xp:15,model:"⚔️",tier:"theme"}
];

// Replace the small starter roster before the journey begins.
if(Array.isArray(enemies)){
  enemies.splice(0,enemies.length,...FILLER_MOBS,...THEME_MOBS);
}

// Give the common enemies a softer presentation and reserve the existing
// themed opponents as occasional spikes. The core combat system remains intact.
const originalCombatEncounter=combatEncounter;
combatEncounter=function(){
  const useFiller=Math.random()<0.82;
  const pool=useFiller?FILLER_MOBS:THEME_MOBS;
  const enemy=pool[Math.floor(Math.random()*pool.length)];
  return {
    type:"combat",
    title:enemy.tier==="filler"?"A Roadside Scuffle":"A Stranger Blocks the Road",
    text:enemy.tier==="filler"?"A minor troublemaker steps into your path. This should not take long.":"Steel catches the light. Your opponent waits for you to make the first mistake.",
    enemy
  };
};