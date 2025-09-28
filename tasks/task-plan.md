# Air Hockey Project

## Worklog
- Initialized worklog in `readme.md` to record all actions.
- Noted requirement: build a two-player air hockey game playable on the same device.
- Planned to build the game as a self-contained web app using `index.html`, `styles.css`, and `script.js` with Canvas rendering.
- Created `index.html` with canvas, HUD, and control instructions for the air hockey game.
- Added `styles.css` to style the HUD, canvas, and control panel with a neon rink theme and responsive layout.
- Implemented `script.js` to handle rendering, keyboard controls, puck physics, scoring, and round management.
- Documented run instructions, controls, and gameplay notes in `readme.md` for quick reference.
- Adjusted worklog ordering after documenting usage details.
- Shared instructions for opening `index.html` in a browser.
- Updated canvas styling for a white table and black puck.
- Prevented the puck from stalling by enforcing a minimum travel speed.
- Increased puck speed by raising its base/max velocity and reducing friction.
- Restyled the rink with red lines and a light red page background.
- Further boosted puck velocity (higher base/max speed, lighter friction).
- Added a direct-hit speed boost so precise paddle shots send the puck flying.
- Increased paddle speed for snappier defensive moves.
- Added HUD feedback when you land a clean speed-boosting hit.
- Added a centered orange banner that announces clean hits mid-screen.

## Running the Game
1. Open `index.html` in a modern desktop browser.
2. Press Space to serve the puck and begin play.
3. Use the controls listed below to move each paddle.

## Controls
- Player 1: `W` to move up, `S` to move down.
- Player 2: Arrow Up to move up, Arrow Down to move down.
- Space: Pause/resume or serve after a goal.
- `R`: Reset scores and center the puck.

## Gameplay Notes
- The puck accelerates slightly after paddle hits for faster rounds.
- Goals pause the game so players can breathe before serving again.
- The rink, paddles, and puck render via HTML canvas for smooth animation.
- Auto-boost keeps the puck from stalling mid-rally.
- Speed tuning favors faster rallies by default.
- Direct hits give an extra burst of puck speed for dramatic plays.
- Faster paddles help you chase the puck at top speed.
- Clean hits briefly flash a HUD message so both players notice the boost.
- Clean hits flash an orange banner at center screen so both players see it.
