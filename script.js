const images = [
  "img/mongo-db.png",
  "img/express-js.png",
  "img/react.png",
  "img/nodejs.png",
];

const container = document.getElementById("image-follow-mouse");
const maxNumberOfImages = 5;
let currentImageIndex = 0;
let lastX = 0;
let lastY = 0;
let distanceThreshold = window.innerWidth < 900 ? 80 : 120;
window.addEventListener("resize", () => {
  distanceThreshold = window.innerWidth < 900 ? 80 : 120;
});

window.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > distanceThreshold) {
    createTrail(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

function createTrail(x, y) {
  const img = document.createElement("img");
  img.classList.add("images-trail");
  img.src = images[currentImageIndex];
  container.appendChild(img);

  currentImageIndex = (currentImageIndex + 1) % images.length;

  gsap.set(img, {
    x: x,
    y: y,
    xPercent: -50, // shift center horizontally
    yPercent: -50, // shift center vertically
    opacity: 0,
    scale: 0,
    rotation: gsap.utils.random(-20, 20),
  });

  gsap.to(img, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(img, {
    opacity: 0,
    scale: 0.2,
    duration: 1,
    delay: 0.3,
    ease: "power2.in",
    onComplete: () => {
      img.remove();
    },
  });
}

// === IGNORE ===
// above script is used for image following mouse cursor with gsap animation in section having id container in section1 index.html
// === IGNORE ===

gsap.from("")