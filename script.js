// ================= VARIABLES =================
let timer = null;
let timeLeft = 0; // seconds
let points = 0;
let isRunning = false;
let mode = "focus"; // focus | break

// ================= ELEMENTS =================
const focusInput = document.getElementById("focusTime");
const timerDisplay = document.getElementById("timerDisplay");
const pointsDisplay = document.getElementById("points");
const modeDisplay = document.getElementById("mode");

const startBtn = document.getElementById("startFocus");
const pauseBtn = document.getElementById("pauseFocus");
const resetBtn = document.getElementById("resetFocus");

const shortBreakBtn = document.getElementById("shortBreak");
const mediumBreakBtn = document.getElementById("mediumBreak");
const longBreakBtn = document.getElementById("longBreak");

const focusMusic = document.getElementById("focusMusic");

// ================= MUSIC =================




focusMusic.addEventListener("ended", () => {
  currentTrack++;
  if (currentTrack >= playlist.length) currentTrack = 0;
  playTrack();
});

// ================= TIMER DISPLAY =================
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// ================= FOCUS LOGIC =================
function startFocus() {
  if (isRunning) return;

  if (timeLeft === 0) {
    timeLeft = Number(focusInput.value) * 60;
  }

  isRunning = true;
  mode = "focus";
  modeDisplay.textContent = "Mode: Focus";
  startBtn.disabled = true;
}

function pauseFocus() {
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  focusMusic.pause();
}

function resetFocus() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  timerDisplay.textContent = "00:00";
  startBtn.disabled = false;

  focusMusic.pause();
  focusMusic.currentTime = 0;
  currentTrack = 0;
}

// ================= BREAK LOGIC =================
function startBreak(minutes, cost) {
  if (isRunning) return;

  if (points < cost) {
    alert("Not enough points for this break 🍪");
    return;
  }

  points -= cost;
  pointsDisplay.textContent = points;

  mode = "break";
  modeDisplay.textContent = "Mode: Break";
  startBtn.disabled = true;

  timeLeft = minutes * 60;
  updateDisplay();

  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      mode = "focus";
      modeDisplay.textContent = "Mode: Focus";
      startBtn.disabled = false;
      alert("Break over! Back to focus 🍰");
    }
  }, 1000);
}

// ================= EVENT LISTENERS =================
startBtn.addEventListener("click", startFocus);
pauseBtn.addEventListener("click", pauseFocus);
resetBtn.addEventListener("click", resetFocus);

shortBreakBtn.addEventListener("click", () => startBreak(5, 50));
mediumBreakBtn.addEventListener("click", () => startBreak(15, 100));
longBreakBtn.addEventListener("click", () => startBreak(30, 200));



