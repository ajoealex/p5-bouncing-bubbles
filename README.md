# 🫧 p5-bouncing-bubbles

An interactive **p5.js bubble simulation** where bubbles bounce off walls and collide with each other.

Click anywhere on the canvas to spawn new bubbles with randomized movement directions.

## Live Demo

🚀 Try it here: https://ajoealex.github.io/p5-bouncing-bubbles/

---

## Features

- Dynamic bubble creation on mouse click
- Random initial movement direction
- Wall collision detection
- Bubble-to-bubble collision detection
- Unique auto-generated bubble IDs
- Configurable bubble properties:
  - Radius
  - Speed
  - Color
  - Opacity
  - Position
  - Direction

---

## Tech Stack

- JavaScript
- [p5.js](chatgpt://generic-entity?number=0)

---

## How It Works

### Bubble Creation
Click anywhere on the canvas:

- A new bubble is created
- It spawns at the clicked coordinates
- A random direction is assigned
- The bubble starts moving immediately

---

## Collision System

### Wall Collision
Bubbles bounce when hitting:

- Left wall
- Right wall
- Top wall
- Bottom wall

### Bubble Collision
When two bubbles collide:

- Distance between centers is calculated
- If overlap is detected:
  - Directions are swapped

---

## Installation

```bash
git clone https://github.com/ajoealex/p5-bouncing-bubbles.git
cd p5-bouncing-bubbles
```

Then open `index.html` in your browser.

---

## Future Enhancements

- Realistic collision physics
- Velocity-based movement
- Gravity simulation
- Bubble merging
- Touch support
- UI controls
- Performance optimization for large bubble counts

---

## Author

**Ajoe Alex**

GitHub: https://github.com/ajoealex
