const player = { honor: 0, skill: 0, fame: 0 };

const events = [
  { title: "The Merchant", text: "A tired merchant waves you down from the roadside.", choices: [
    { text: "Help him", result: "You carry his goods to the next village.", effects: { honor: 1 } },
    { text: "Keep walking", result: "The merchant watches you disappear down the road." },
    { text: "Take his purse", result: "A poor choice. Word of your dishonor travels.", effects: { honor: -1, fame: 1 } }
  ]},
  { title: "Three Bandits", text: "Three men step into the road. Their hands rest on their blades.", choices: [
    { text: "Draw your sword", result: "Your blade flashes. The bandits scatter.", effects: { skill: 1, fame: 1 } },
    { text: "Walk through them", result: "You refuse to be intimidated. They step aside.", effects: { honor: 1 } },
    { text: "Pay the toll", result: "They take your coin and let you pass." }
  ]},
  { title: "A Fallen Shrine", text: "An old shrine stands beside the road, half-swallowed by weeds.", choices: [
    { text: "Clean the shrine", result: "You leave the shrine better than you found it.", effects: { honor: 1 } },
    { text: "Search it", result: "You find an old whetstone. Your sword feels sharper.", effects: { skill: 1 } },
    { text: "Ignore it", result: "The road calls, and you continue onward." }
  ]}
];

const $ = id => document.getElementById(id);

function updateStats() {
  $("honor").textContent = player.honor;
  $("skill").textContent = player.skill;
  $("fame").textContent = player.fame;
  localStorage.setItem("scrollingStrollingPlayer", JSON.stringify(player));
}

function loadStats() {
  try { Object.assign(player, JSON.parse(localStorage.getItem("scrollingStrollingPlayer")) || {}); } catch (_) {}
}

function showEvent() {
  const event = events[Math.floor(Math.random() * events.length)];
  $("event-title").textContent = event.title;
  $("event-text").textContent = event.text;
  $("choices").innerHTML = "";
  event.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => resolveChoice(choice);
    $("choices").appendChild(button);
  });
}

function resolveChoice(choice) {
  if (choice.effects) Object.entries(choice.effects).forEach(([stat, value]) => player[stat] += value);
  updateStats();
  $("event-title").textContent = "The Road Continues";
  $("event-text").textContent = choice.result;
  $("choices").innerHTML = "";
  const button = document.createElement("button");
  button.textContent = "Continue walking";
  button.onclick = showEvent;
  $("choices").appendChild(button);
}

loadStats();
updateStats();
showEvent();
