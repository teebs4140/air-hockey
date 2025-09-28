# Air Hockey Duel

A fast-paced, browser-based air hockey game built with HTML5 Canvas and vanilla JavaScript. Challenge a friend to an exciting match with smooth physics, responsive controls, and dynamic gameplay.

## Features

- **Two-player local multiplayer** - Compete against a friend on the same keyboard
- **Realistic physics** - Puck movement with friction, paddle collisions, and wall bounces
- **Clean hit detection** - Special visual feedback for perfect shots
- **Responsive controls** - Smooth paddle movement with keyboard input
- **Score tracking** - First to reach the winning score takes the match
- **Pause/Resume** - Take a break mid-game without losing progress
- **Visual effects** - Dynamic trails, collision animations, and status notifications

## Demo

Open `index.html` in a modern web browser to start playing immediately. No installation or build process required!

## How to Play

### Controls

**Player 1 (Left Paddle)**
- `W` - Move up
- `S` - Move down

**Player 2 (Right Paddle)**
- `↑` Arrow Up - Move up
- `↓` Arrow Down - Move down

**Game Controls**
- `Space` - Start/Pause/Resume game
- `R` - Reset game (start fresh match)

### Gameplay

1. Press `Space` to start the game
2. The puck will be served from the center toward the last scorer (or randomly on first serve)
3. Use your paddle to defend your goal and strike the puck toward your opponent's goal
4. Score by getting the puck past your opponent's paddle into their goal
5. First player to reach 7 points wins!
6. After each goal, the game pauses briefly before the next serve

### Tips

- Time your hits for maximum puck velocity
- Use the edges of your paddle to create angled shots
- Watch for "Clean Hit!" notifications when you make a perfect strike
- Defensive positioning is just as important as offensive strikes

## Technical Details

### Technologies Used

- **HTML5 Canvas** - Game rendering and graphics
- **JavaScript (ES6+)** - Game logic, physics, and controls
- **CSS3** - Styling and animations for UI elements

### Game Architecture

The game uses a component-based architecture with:

- **Game Loop** - Smooth 60 FPS animation using `requestAnimationFrame`
- **Physics Engine** - Custom collision detection and response system
- **Input Handler** - Keyboard event management with simultaneous key support
- **Rendering Pipeline** - Layered drawing with effects and optimizations

### Key Features Implementation

- **Collision Detection** - AABB (Axis-Aligned Bounding Box) for paddle-puck collisions
- **Puck Physics** - Velocity-based movement with friction simulation
- **Paddle Constraints** - Boundary checking to keep paddles within the rink
- **Score Detection** - Goal line crossing detection with edge case handling
- **Visual Effects** - Canvas-based particle effects and dynamic rendering

## File Structure

```
air-hockey/
│
├── index.html          # Main HTML file with game canvas
├── styles.css          # Game styling and animations
├── script.js           # Core game logic and physics
├── README.md           # Project documentation (this file)
└── .gitignore         # Git ignore configuration
```

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript features
- CSS3 animations

Recommended browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

You can easily modify game parameters by editing the configuration objects in `script.js`:

```javascript
// Adjust paddle size and speed
const paddleConfig = {
  width: 18,
  height: 110,
  speed: 620,
};

// Modify puck behavior
const puckConfig = {
  radius: 14,
  baseSpeed: 760,
  maxSpeed: 1800,
  friction: 0.9985,
};
```

## Development

### Local Development

1. Clone or download the project
2. Open `index.html` in your browser
3. Make changes to the source files
4. Refresh the browser to see updates

### Potential Enhancements

- [ ] Add AI opponent for single-player mode
- [ ] Implement difficulty levels
- [ ] Add sound effects and background music
- [ ] Create power-ups and special abilities
- [ ] Add online multiplayer support
- [ ] Implement tournament mode
- [ ] Add customizable themes and skins
- [ ] Create mobile touch controls
- [ ] Add game statistics and match history

## Contributing

Feel free to fork this project and submit pull requests with improvements. Some areas for contribution:

- Performance optimizations
- New game modes
- Visual enhancements
- Bug fixes
- Documentation improvements

## License

This project is open source and available for personal and educational use.

## Credits

Created as a fun project to demonstrate HTML5 Canvas capabilities and JavaScript game development techniques.

## Support

If you encounter any issues or have suggestions, please open an issue in the project repository.

---

Enjoy the game and may the best player win! 🏒