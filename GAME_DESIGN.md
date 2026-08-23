# Scrolling & Strolling — Game Design

## Core Premise

The age of the martial is ending. Firearms, machines, industry, and modern warfare are making the old martial traditions obsolete. The great schools are emptying, their masters are aging, and their techniques are being forgotten.

The player is a wandering martial artist who has chosen to walk deeper into the old ways while the world moves forward.

> The war ended three years ago.
>
> The guns went silent.
>
> The factories began to rise.
>
> The old schools began to empty.
>
> You picked up your sword.
>
> And walked.

The story should begin small. The protagonist's past is revealed gradually through encounters and people who recognize them.

## Core Gameplay Loop

```text
WALK
  ↓
SEE SOMETHING AHEAD
  ↓
APPROACH
  ↓
ENCOUNTER
  ↓
AUTOMATIC RESOLUTION
  ↓
REWARD / PROGRESSION
  ↓
CONTINUE WALKING
```

The player should spend most of the game watching the journey happen rather than constantly managing it.

## Journey & Destinations

The player physically walks toward the next destination. The destination provides anticipation before the encounter begins.

Planned destination visuals:

- Ronin — generic combat destination
- Elder — conversation
- Shrine — spiritual encounter
- Church / Temple — larger religious encounter
- Inn / Traveler's Hut — rest / supplies
- Ancient Monument — mystery / lore
- Merchant / Wagon — trade
- Mysterious Woodland Figure / Scene — wildcard

Destination art is separate from combat enemy art. One generic combat destination can precede many different enemies.

## Encounters

### Automatic Encounters

Combat resolves automatically. The player does not manually select every attack.

### Decision Encounters

Meaningful encounters such as elders, shrines, merchants, teachers, villages, monuments, and other special events present a small number of choices. The player then returns to the journey.

## Combat

Presentation:

```text
PLAYER                 ENEMY
  HP                    HP
  STAMINA               STAMINA
  TECHNIQUE             TECHNIQUE
```

The player is on the left and the enemy on the right.

### HP

Represents survivability.

### Stamina

Fills according to Speed. When full, the character attacks. Combat is not rigidly player-then-enemy; whoever becomes ready acts.

### Technique Bar

A third combat meter sits below HP and Stamina. It fills automatically and executes the equipped technique when full.

This creates a visible combat rhythm:

```text
HP
████████████████

STAMINA
██████████░░░░░░

TECHNIQUE
████████████░░░░
```

The player watches their character become ready to attack and ready to unleash a technique.

## Character Development

The player is one Wanderer, not a fixed class.

Character development consists of:

- Core stats
- Martial schools
- Techniques
- Mastery ranks
- Faction reputation
- Player choices

The character eventually develops a unique martial identity.

## The Five Schools

The schools are philosophies rather than traditional RPG classes. The player studies multiple schools and can combine them.

### Iron — The Way of Endurance

> **"If you cannot be moved, you cannot be defeated."**

Focus:

- HP
- Defense
- Stability
- Counterattacks
- Damage reduction

Fantasy: the immovable warrior.

### Falling Leaf — The Way of Motion

> **"The strongest strike is the one that never meets resistance."**

Focus:

- Speed
- Evasion
- Initiative
- Multiple attacks
- Positioning

Fantasy: the untouchable warrior. Strong synergy with the Speed → Stamina combat system.

### Crimson — The Way of the Blade

> **"One perfect strike is worth a thousand ordinary ones."**

Focus:

- Attack
- Critical hits
- Burst damage
- Execution mechanics

Fantasy: the high-risk, high-reward swordsman.

### Empty Hand — The Way Without Weapons

> **"A weapon does not make the warrior."**

Focus:

- Unarmed combat
- Disarming
- Countering
- Adaptability

Late-game possibility: **The Final Form: No Blade**, making the sword optional.

### Silent — The Way of Avoidance

> **"The battle that never happens is the greatest victory."**

Focus:

- Avoiding combat
- Negotiation
- Stealth
- Awareness
- Alternative resolutions

This school allows a character to resolve encounters without fighting.

## Techniques

Schools should unlock techniques and mechanics rather than simply granting flat stat bonuses.

Example Falling Leaf techniques:

- Quick Step — Speed contributes more strongly to evasion.
- Flowing Strike — Attacking significantly ahead of an opponent can grant bonus damage.
- Afterimage — Chance to evade immediately after attacking.

Cross-school combinations can create unique techniques:

- Iron + Falling Leaf → Moving Fortress
- Crimson + Falling Leaf → Falling Comet
- Silent + Crimson → Unseen Blade
- Empty Hand + Iron → Iron Fist

Techniques are a major part of build identity and are displayed through the Technique Bar during combat.

## Mastery Progression

Each school has five mastery ranks:

1. **Novice** — knows the fundamentals
2. **Student** — committed to the philosophy
3. **Disciple** — understands why the philosophy works
4. **Master** — has surpassed their teachers
5. **Grandmaster** — has developed their own interpretation

Mastery should not simply be an XP threshold. Rank advancement should be earned through events such as meeting a master, discovering an ancient text, surviving a specific battle, making a meaningful choice, or demonstrating understanding.

## Factions

### Industrialists — Progress

They represent the technological future: firearms, factories, locomotives, mechanical weapons, modern medicine, and communications.

They are not inherently evil. Their argument is compelling: why spend decades learning to cut through armor when a machine can do it in seconds?

### Traditionalists — Preservation

Old martial families, dojos, and warrior clans who want the old ways preserved. They can be noble guardians, proud elitists, political opportunists, or violent extremists.

### Temples — Wisdom

They preserve philosophy, meditation, discipline, old texts, rituals, history, and martial teachings. They are a major potential source of techniques and mastery.

### Common People — Survival

Ordinary people mostly care about safety and survival, not martial philosophy. Their opinion of the Wanderer should matter enormously.

## Reputation

Reputation should initially be mostly invisible. The world should demonstrate it through behavior rather than numbers.

Early:

> The farmer gives you directions.

Later:

> The farmer recognizes your sword.

Later still:

> The village children run out to greet you.

Or:

> The innkeeper sees your sword and quietly locks the door.

The world should remember what the player has done. Reputation can become more explicitly visible later.

## Crossroads

The primary form of player input is the occasional crossroads.

Most of the game is walking. Then:

# THE ROAD DIVIDES

The player chooses between a small number of paths and immediately returns to walking.

Example:

### Mountain Road

An abandoned dojo is said to lie beyond the ridge.

### Village Road

A merchant caravan is traveling toward the city.

The player chooses where to go, not every individual encounter.

## Routes & Encounter Pools

Different roads influence the type of encounters that appear.

### Mountain Route

- Dojos
- Martial masters
- Rival students
- Shrines
- Wilderness
- Ancient techniques

### City Route

- Industrialists
- Firearms
- Merchants
- Technology
- Political encounters
- Urban criminals

### Battlefield Route

- Veterans
- War ghosts
- Ruins
- Former comrades
- War relics
- Revelations about the past

### Temple Route

- Elders
- Meditation
- Healing
- Philosophy
- Spiritual encounters

Routes can eventually reconnect, allowing a branching network instead of one enormous overworld.

## Central Story Conflict

The player begins believing:

> **"I must preserve the old ways."**

The world challenges that belief.

The Industrialist: *"You're preserving a museum piece."*

The Traditionalist: *"The old ways must never change."*

The Temple master: *"Tradition survives only when someone is willing to reinterpret it."*

The eventual question is:

> **What does it mean to preserve a tradition?**

Possible conclusions:

- **Preserve** — become a teacher and keep the old schools alive.
- **Abandon** — accept the technological world and leave the sword behind.
- **Destroy** — conclude that the martial tradition causes more harm than good.
- **Transform** — create something new from the old traditions.

## Long-Term Character Fantasy

The player begins as a Novice Wanderer and may eventually become a Grandmaster, but their final identity should be determined by their journey rather than a character creation choice.

Potential earned titles include:

- The Last Sword
- The Wandering Master
- The Empty Blade
- The Teacher
- The New Way
- The Unarmed Master
- The Man Who Walked Beyond the Sword

The final identity should describe who the player became.

## Design Principle

> **The game should never feel like it is asking the player to manage the game. It should feel like they are watching a life unfold.**

The player occasionally says:

- Go there.
- Learn this.
- Take that road.
- Fight.
- Spare him.
- Study this school.

Then they watch their Wanderer do it.

The journey itself is the game.