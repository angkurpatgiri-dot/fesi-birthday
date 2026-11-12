let currentScene = 1;

const scenes = document.querySelectorAll(".scene");
const chapter = document.getElementById("chapter");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

function goTo(number) {
  if (number < 1 || number > 10) return;

  scenes[currentScene - 1].classList.remove("active");
  currentScene = number;
  scenes[currentScene - 1].classList.add("active");

  chapter.textContent =
    `CHAPTER ${String(number).padStart(2, "0")} / 10`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openLetter() {
  document.getElementById("envelope").classList.add("open");

  const letter = document.getElementById("letterMessage");
  letter.style.display = "block";
}

function checkSecret() {
  const answer = document
    .getElementById("secretAnswer")
    .value.trim().toLowerCase();

  const result = document.getElementById("secretResult");

  if (answer === "fesi") {
    result.textContent = "✨ Secret unlocked! This little universe belongs to you, Jubli. ❤️";
  } else {
    result.textContent = "Not quite! Try your special nickname again. 💗";
  }
}

function blowCandles() {
  document.getElementById("candles").textContent = "💨 💨 💨";
  document.getElementById("wishMessage").textContent =
    "Your wish is now somewhere in the universe. May it come true! ✨❤️";
}

function restart() {
  scenes[currentScene - 1].classList.remove("active");
  currentScene = 1;
  scenes[0].classList.add("active");

  chapter.textContent = "CHAPTER 01 / 10";

  document.getElementById("envelope").classList.remove("open");
  document.getElementById("letterMessage").style.display = "none";
  document.getElementById("candles").textContent = "🕯️ 🕯️ 🕯️";
  document.getElementById("wishMessage").textContent = "";
  document.getElementById("secretAnswer").value = "";
  document.getElementById("secretResult").textContent = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

musicButton.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicButton.innerHTML = "♫ <span>MUSIC ON</span>";
    } else {
      music.pause();
      musicButton.innerHTML = "♫ <span>MUSIC OFF</span>";
    }
  } catch (error) {
    musicButton.innerHTML = "♫ <span>TRY AGAIN</span>";
  }
});

// Cinematic star animation
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  stars = Array.from({ length: 130 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.7 + 0.3,
    speed: Math.random() * 0.35 + 0.08,
    alpha: Math.random() * 0.8 + 0.2
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach(star => {
    star.y -= star.speed;

    if (star.y < 0) {
      star.y = window.innerHeight;
      star.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 225, 245, ${star.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#dca6e8";
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();

// Intro loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1400);
});