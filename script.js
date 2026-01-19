const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let isScratching = false;

// Ajustar tamaño
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Capa gris de rascar
ctx.fillStyle = "#c0c0c0";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "destination-out";

// Eventos ratón
canvas.addEventListener("mousedown", () => isScratching = true);
canvas.addEventListener("mouseup", () => isScratching = false);
canvas.addEventListener("mousemove", scratch);

// Eventos móvil
canvas.addEventListener("touchstart", () => isScratching = true);
canvas.addEventListener("touchend", () => isScratching = false);
canvas.addEventListener("touchmove", scratch);

function scratch(e) {
  if (!isScratching) return;

  const rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.touches) {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }

  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

// CONFETI
document.getElementById("confettiBtn").addEventListener("click", () => {
  for (let i = 0; i < 100; i++) {
    const confeti = document.createElement("div");
    confeti.style.position = "fixed";
    confeti.style.left = Math.random() * window.innerWidth + "px";
    confeti.style.top = "-10px";
    confeti.style.width = "10px";
    confeti.style.height = "10px";
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confeti.style.borderRadius = "50%";
    confeti.style.zIndex = "9999";
    document.body.appendChild(confeti);

    const fall = confeti.animate(
      [
        { transform: "translateY(0px)" },
        { transform: `translateY(${window.innerHeight + 20}px)` }
      ],
      {
        duration: 2000 + Math.random() * 2000,
        easing: "ease-in"
      }
    );

    fall.onfinish = () => confeti.remove();
  }
});
