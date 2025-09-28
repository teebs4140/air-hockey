# Claude Code Instructions for Air Hockey Game

## Project Overview
This is a browser-based air hockey game built with HTML5 Canvas and vanilla JavaScript. The game features two-player local multiplayer with realistic physics simulation.

## Key Files
- `index.html` - Main HTML structure and game canvas
- `script.js` - Core game logic, physics engine, and input handling
- `styles.css` - Visual styling and animations
- `README.md` - User-facing documentation

## Development Guidelines

### Code Style
- Use vanilla JavaScript (ES6+) - no frameworks required
- Follow existing code patterns and naming conventions
- Keep functions focused and well-named
- Maintain the existing indentation (2 spaces)

### Testing
Since this is a browser-based game without a test framework:
- Test changes by opening `index.html` in a browser
- Verify both players' controls work correctly
- Check collision detection and scoring
- Ensure the game runs smoothly at 60 FPS

### Common Tasks

#### Adding New Features
1. Review existing code structure in `script.js`
2. Follow the component-based architecture
3. Test thoroughly with manual gameplay
4. Update README.md if adding user-facing features

#### Debugging Physics Issues
- Check collision detection functions
- Verify paddle and puck boundaries
- Test edge cases (corners, simultaneous hits)
- Monitor console for any errors

#### Modifying Game Balance
Key configuration objects in `script.js`:
- `paddleConfig` - Paddle dimensions and speed
- `puckConfig` - Puck size, speed, and friction
- `rink` - Playing field dimensions

## Performance Considerations
- The game uses `requestAnimationFrame` for smooth 60 FPS
- Canvas rendering is optimized with minimal redraws
- Avoid adding heavy computations to the game loop

## Browser Compatibility
Ensure changes work on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Git Workflow
- Create descriptive commit messages
- Test changes before committing
- Keep commits focused on single features/fixes

## Future Enhancement Ideas
See README.md for a list of potential improvements including:
- AI opponent
- Sound effects
- Power-ups
- Online multiplayer
- Mobile controls

## Questions or Issues
Check the existing code patterns first, as most gameplay mechanics are already implemented and can serve as examples for new features.