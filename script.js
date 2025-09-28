const canvas = document.getElementById("rink");
const ctx = canvas.getContext("2d");

const scoreLeftEl = document.getElementById("score-left");
const scoreRightEl = document.getElementById("score-right");
const statusEl = document.getElementById("status");
const cleanHitBanner = document.getElementById("clean-hit-banner");

const rink = {
  width: canvas.width,
  height: canvas.height,
  wallInset: 12,
};

const paddleConfig = {
  width: 18,
  height: 110,
  speed: 620,
};

const puckConfig = {
  radius: 14,
  baseSpeed: 760,
  maxSpeed: 1800,
  friction: 0.9985,
};

const leftPaddle = {
  x: rink.wallInset,
  y: rink.height / 2 - paddleConfig.height / 2,
  vy: 0,
};

const rightPaddle = {
  x: rink.width - paddleConfig.width - rink.wallInset,
  y: rink.height / 2 - paddleConfig.height / 2,
  vy: 0,
};

const puck = {
  x: rink.width / 2,
  y: rink.height / 2,
  vx: 0,
  vy: 0,
};

const state = {
  running: false,
  awaitingServe: true,
  lastTimestamp: 0,
  leftScore: 0,
  rightScore: 0,
  lastScorer: null,
  currentStatus: "Press Space to start",
  statusTimeout: null,
};

const pressed = new Set();
let cleanHitTimeout = null;

function setStatus(message) {
  if (state.statusTimeout) {
    clearTimeout(state.statusTimeout);
    state.statusTimeout = null;
  }
  state.currentStatus = message;
  statusEl.textContent = message;
}

function flashStatus(message, duration = 1000) {
  if (state.statusTimeout) {
    clearTimeout(state.statusTimeout);
  }
  statusEl.textContent = message;
  state.statusTimeout = setTimeout(() => {
    statusEl.textContent = state.currentStatus;
    state.statusTimeout = null;
  }, duration);
}

function showCleanHitBanner(duration = 900) {
  if (!cleanHitBanner) {
    return;
  }
  cleanHitBanner.textContent = "Clean Hit!";
  cleanHitBanner.classList.add("show");
  if (cleanHitTimeout) {
    clearTimeout(cleanHitTimeout);
  }
  cleanHitTimeout = setTimeout(() => {
    cleanHitBanner.classList.remove("show");
    cleanHitTimeout = null;
  }, duration);
}

function resetPaddles() {
  leftPaddle.y = rink.height / 2 - paddleConfig.height / 2;
  rightPaddle.y = rink.height / 2 - paddleConfig.height / 2;
  leftPaddle.vy = 0;
  rightPaddle.vy = 0;
}

function resetPuck(direction = 0) {
  puck.x = rink.width / 2;
  puck.y = rink.height / 2;
  const speed = puckConfig.baseSpeed;
  const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6; // +/-30 degrees
  const horizontal = direction !== 0 ? Math.sign(direction) : Math.random() < 0.5 ? -1 : 1;
  puck.vx = Math.cos(angle) * speed * horizontal;
  puck.vy = Math.sin(angle) * speed;
}

function freezePuck() {
  puck.vx = 0;
  puck.vy = 0;
}

function startLoop() {
  if (state.running) {
    return;
  }
  state.running = true;
  state.lastTimestamp = performance.now();
  requestAnimationFrame(loop);
}

function pauseLoop() {
  state.running = false;
  setStatus("Paused. Press Space to resume");
}

function startRound() {
  if (!state.awaitingServe) {
    startLoop();
    return;
  }
  resetPuck(state.lastScorer === "right" ? 1 : state.lastScorer === "left" ? -1 : 0);
  state.awaitingServe = false;
  setStatus("Game on! Press Space to pause");
  startLoop();
}

function awardPoint(side) {
  if (side === "left") {
    state.leftScore += 1;
    scoreLeftEl.textContent = state.leftScore;
    setStatus("Player 1 scores! Press Space to serve");
  } else {
    state.rightScore += 1;
    scoreRightEl.textContent = state.rightScore;
    setStatus("Player 2 scores! Press Space to serve");
  }
  state.lastScorer = side;
  state.awaitingServe = true;
  state.running = false;
  freezePuck();
  resetPaddles();
}

function resetGame() {
  state.leftScore = 0;
  state.rightScore = 0;
  scoreLeftEl.textContent = "0";
  scoreRightEl.textContent = "0";
  state.awaitingServe = true;
  state.lastScorer = null;
  freezePuck();
  resetPaddles();
  setStatus("Game reset. Press Space to start");
}

function clampPaddles(delta) {
  const step = paddleConfig.speed * delta;

  if (pressed.has("KeyW")) {
    leftPaddle.y -= step;
  }
  if (pressed.has("KeyS")) {
    leftPaddle.y += step;
  }
  if (pressed.has("ArrowUp")) {
    rightPaddle.y -= step;
  }
  if (pressed.has("ArrowDown")) {
    rightPaddle.y += step;
  }

  const minY = rink.wallInset;
  const maxY = rink.height - paddleConfig.height - rink.wallInset;

  leftPaddle.y = Math.max(minY, Math.min(maxY, leftPaddle.y));
  rightPaddle.y = Math.max(minY, Math.min(maxY, rightPaddle.y));
}

function updatePuck(delta) {
  puck.x += puck.vx * delta;
  puck.y += puck.vy * delta;

  puck.vx *= puckConfig.friction;
  puck.vy *= puckConfig.friction;

  const speed = Math.hypot(puck.vx, puck.vy);
  const minSpeed = puckConfig.baseSpeed * 0.45;
  if (speed < minSpeed) {
    if (speed === 0) {
      const angle = Math.random() * Math.PI * 2;
      puck.vx = Math.cos(angle) * minSpeed;
      puck.vy = Math.sin(angle) * minSpeed;
    } else {
      const scale = minSpeed / speed;
      puck.vx *= scale;
      puck.vy *= scale;
    }
  }

  // Top and bottom walls
  if (puck.y - puckConfig.radius <= rink.wallInset && puck.vy < 0) {
    puck.y = rink.wallInset + puckConfig.radius;
    puck.vy *= -1;
  }
  if (puck.y + puckConfig.radius >= rink.height - rink.wallInset && puck.vy > 0) {
    puck.y = rink.height - rink.wallInset - puckConfig.radius;
    puck.vy *= -1;
  }

  // Left goal
  if (puck.x + puckConfig.radius < 0) {
    awardPoint("right");
    return;
  }
  // Right goal
  if (puck.x - puckConfig.radius > rink.width) {
    awardPoint("left");
    return;
  }

  handlePaddleCollision(leftPaddle, 1);
  handlePaddleCollision(rightPaddle, -1);
}

function handlePaddleCollision(paddle, horizontalDirection) {
  const paddleTop = paddle.y;
  const paddleBottom = paddle.y + paddleConfig.height;
  const paddleLeft = paddle.x;
  const paddleRight = paddle.x + paddleConfig.width;

  if (
    puck.x + puckConfig.radius < paddleLeft ||
    puck.x - puckConfig.radius > paddleRight ||
    puck.y + puckConfig.radius < paddleTop ||
    puck.y - puckConfig.radius > paddleBottom
  ) {
    return;
  }

  puck.x = horizontalDirection > 0 ? paddleRight + puckConfig.radius : paddleLeft - puckConfig.radius;
  puck.vx = Math.abs(puck.vx) * horizontalDirection * -1;

  const relativeIntersectY = puck.y - (paddle.y + paddleConfig.height / 2);
  const normalized = relativeIntersectY / (paddleConfig.height / 2);
  const bounceAngle = normalized * (Math.PI / 3);
  const directHit = Math.abs(normalized) < 0.2;
  const speedMultiplier = directHit ? 1.45 : 1.05;
  const speedBonus = directHit ? 160 : 20;
  const speed = Math.min(
    Math.hypot(puck.vx, puck.vy) * speedMultiplier + speedBonus,
    puckConfig.maxSpeed
  );

  if (directHit) {
    flashStatus("Clean hit! Speed burst!");
    showCleanHitBanner();
  }

  // Reward precision hits with a noticeable speed burst
  puck.vx = Math.cos(bounceAngle) * speed * horizontalDirection;
  puck.vy = Math.sin(bounceAngle) * speed;
}

function drawRink() {
  ctx.clearRect(0, 0, rink.width, rink.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, rink.width, rink.height);

  ctx.strokeStyle = "rgba(220, 0, 0, 0.85)";
  ctx.lineWidth = 6;

  // Outer border
  ctx.strokeRect(
    rink.wallInset,
    rink.wallInset,
    rink.width - rink.wallInset * 2,
    rink.height - rink.wallInset * 2
  );

  // Center line
  ctx.beginPath();
  ctx.moveTo(rink.width / 2, rink.wallInset);
  ctx.lineTo(rink.width / 2, rink.height - rink.wallInset);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(rink.width / 2, rink.height / 2, 70, 0, Math.PI * 2);
  ctx.stroke();

  // Faceoff spots
  const spotOffset = 150;
  [
    [spotOffset, rink.height / 3],
    [spotOffset, (rink.height / 3) * 2],
    [rink.width - spotOffset, rink.height / 3],
    [rink.width - spotOffset, (rink.height / 3) * 2],
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawPaddles() {
  ctx.fillStyle = "#f55d8c";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleConfig.width, paddleConfig.height);
  ctx.fillStyle = "#4ad7d1";
  ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleConfig.width, paddleConfig.height);
}

function drawPuck() {
  ctx.fillStyle = "#111111";
  ctx.beginPath();
  ctx.arc(puck.x, puck.y, puckConfig.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function loop(timestamp) {
  if (!state.running) {
    return;
  }

  const delta = (timestamp - state.lastTimestamp) / 1000;
  state.lastTimestamp = timestamp;

  clampPaddles(delta);
  updatePuck(delta);
  drawRink();
  drawPaddles();
  drawPuck();

  if (state.running) {
    requestAnimationFrame(loop);
  }
}

drawRink();
drawPaddles();
drawPuck();

window.addEventListener("keydown", (event) => {
  if (["Space", "KeyR", "KeyW", "KeyS", "ArrowUp", "ArrowDown"].includes(event.code)) {
    event.preventDefault();
  }

  if (event.code === "Space") {
    if (state.running) {
      pauseLoop();
    } else {
      startRound();
    }
    return;
  }

  if (event.code === "KeyR") {
    resetGame();
    return;
  }

  pressed.add(event.code);
});

window.addEventListener("keyup", (event) => {
  pressed.delete(event.code);
});

resetGame();
