# Scrolling and Strolling

A lightweight browser-based side-scrolling action RPG inspired by wandering swordsman stories.

The journey moves forward automatically. **Combat is the core gameplay loop; choices and encounters exist to shape the journey and the character.**

## Core Loop

```text
Walk -> Encounter -> Combat/Choice -> Reward -> Walk
```

The character travels continuously through the world. Encounters interrupt the journey. Some are fights, while others offer abilities, power-ups, equipment, or decisions that change the character's build and playstyle.

## First Playable Goal

Keep the first prototype extremely small and playable in a browser:

- Side-scrolling world
- Player movement
- Jump
- Basic sword attack
- Dodge
- Health and damage
- One enemy type
- Enemy death
- Player death
- Simple combat encounter

Do **not** build the full RPG yet. The first question is whether moving, attacking, dodging, and defeating an enemy actually feels good.

## RPG Foundation

Once combat feels good, build the character around a small set of meaningful attributes rather than a giant spreadsheet.

### Core Attributes

- **Vitality** — durability and health
- **Strength** — physical damage
- **Agility** — speed, attack tempo, and evasion
- **Technique** — effectiveness of special attacks
- **Spirit** — powers extraordinary abilities

These can produce derived combat values such as HP, stamina, attack, defense, speed, critical chance, and spirit resource.

## Playstyle System

Progression should eventually change **how the player fights**, not merely increase numbers.

Examples:

- **Battoujutsu** — explosive opening attacks and counters
- **Kenjutsu** — balanced swordplay and combos
- **Berserker** — greater damage while wounded
- **Wandering Monk** — spirit abilities, healing, and control

These should be discoverable through encounters, rewards, teachers, equipment, and unusual events rather than requiring the player to choose a permanent class immediately.

## Encounter Types

Encounters can include:

- Combat
- Power-ups
- New abilities
- Playstyle changes
- Equipment
- Teachers
- NPCs
- Story moments
- Risk/reward choices

The choice system supports the combat game; it is not the primary game itself.

## Current State Flow

```text
Walking
   |
Encounter
   |
+--+----------------+
|                   |
Combat          Choice/Reward
|                   |
+---------+---------+
          |
       Progress
          |
       Walking
```

## Development Order

1. Make basic combat feel good.
2. Add proper RPG stats.
3. Add abilities and playstyle changes.
4. Add encounter variety.
5. Add progression and rewards.
6. Add story, equipment, bosses, and larger content systems.

## Scope

This project is intentionally being built as a **GitHub Pages browser game**, not as a full Unity project. Keep the implementation lightweight until the core loop proves itself.
