const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("confettiBtn");

canvas.width = 360;
canvas.height = 330;

// CAPA DE RASCAR
ctx.fillStyle = "#ffe1ec";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "destination-out";

let drawing = false;
let buttonShown = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
    y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
  };
}

function scratch(e) {
  if (!drawing) return;
  const { x, y } = getPos(e);

  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.fill();

  checkProgress();
}

function checkProgress() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let cleared = 0;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] === 0) cleared++;
  }

  // 🔑 AQUÍ SALE EL BOTÓN SÍ O SÍ
  if (cleared > data.length * 0.18 && !buttonShown) {
    buttonShown = true;
    btn.classList.add("show");
  }
}

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", () => drawing = true);
canvas.addEventListener("touchend", () => drawing = false);
canvas.addEventListener("touchmove", scratch);

// 🎉 CONFETI DESDE EL BOTÓN
btn.addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x0 = rect.left + rect.width / 2;
  const y0 = rect.top + rect.height / 2;

  for (let i = 0; i < 180; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = Math.random() > 0.5 ? "🍓" : "💖";

    c.style.left = x0 + "px";
    c.style.top = y0 + "px";
    c.style.fontSize = Math.random() * 14 + 14 + "px";

    c.style.setProperty("--x", `${Math.random() * 500 - 250}px`);
    c.style.setProperty("--y", `${Math.random() * 500 - 250}px`);

    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1600);
  }
});
