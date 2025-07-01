// Thread animation
const threads = document.querySelectorAll('.thread');
const glows = document.querySelectorAll('.glow');
let scrollTimeout;
let lastScrollTop = 0;
let currentHeight = 0;
const speedFactor = 0.2;

function updateThreadHeight() {
  const scrollTop = window.scrollY;
  const scrollDelta = scrollTop - lastScrollTop;
  currentHeight += scrollDelta * speedFactor;
  currentHeight = Math.max(12, currentHeight);
  threads.forEach(thread => thread.style.height = `${currentHeight}px`);
  glows.forEach(glow => glow.classList.add('animate'));
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => glows.forEach(glow => glow.classList.remove('animate')), 200);
  lastScrollTop = scrollTop;
}

window.addEventListener('scroll', updateThreadHeight);
window.addEventListener('load', updateThreadHeight);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const backdrop = document.querySelector('.menu-backdrop');
const navLinks = document.querySelectorAll('.mobile-nav a');

function toggleMenu() {
  hamburger.classList.toggle('hamburger--active');
  mobileNav.classList.toggle('active');
  backdrop.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Close menu on scroll
window.addEventListener('scroll', () => {
  if (mobileNav.classList.contains('active')) {
    toggleMenu();
  }
});

// Particle background
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = window.innerWidth < 768 ? 50 : 100;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0ff';
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Adjust particle count on resize
  const newParticleCount = window.innerWidth < 768 ? 50 : 100;
  if (newParticleCount !== particleCount) {
    particles.length = 0;
    for (let i = 0; i < newParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
  }
});

// Bird/Butterfly animation
const bird = document.getElementById("bird");
const positions = [
  { scroll: 0, top: 245, left: 190, rotate: 0 },
  { scroll: 0.2, top: 50, left: 285, rotate: -30 },
  { scroll: 0.4, top: 20, left: 660, rotate: 0 },
  { scroll: 0.6, top: 20, left: 795, rotate: 0 },
  { scroll: 0.8, top: 130, left: 255, rotate: 0 },
  { scroll: 1.0, top: 10, left: 480, rotate: 0 },
];

// Fly-in when page loads
window.addEventListener("DOMContentLoaded", () => {
  bird.style.top = "245px";
  bird.style.left = "-100px";
  bird.style.transform = "rotate(0deg)";

  setTimeout(() => {
    bird.style.transition = "top 2s ease, left 1s ease, transform 2s ease";
    bird.style.left = "190px";
  }, 300);
});

// Move bird based on scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollY / docHeight;

  let currentIndex = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    if (scrollPercent >= positions[i].scroll && scrollPercent <= positions[i + 1].scroll) {
      currentIndex = i;
      break;
    }
  }

  const start = positions[currentIndex];
  const end = positions[currentIndex + 1];
  const range = end.scroll - start.scroll;
  const progress = (scrollPercent - start.scroll) / range;

  const top = start.top + (end.top - start.top) * progress;
  const left = start.left + (end.left - start.left) * progress;
  const rotate = start.rotate + (end.rotate - start.rotate) * progress;

  bird.style.top = `${top}px`;
  bird.style.left = `${left}px`;
  bird.style.transform = `rotate(${rotate}deg)`;
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('in-view');
      el.classList.remove('out-view');
    } else {
      el.classList.remove('in-view');
      el.classList.add('out-view');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.image-card, .text-card').forEach(el => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  skills.forEach((skill) => observer.observe(skill));
});








const cartoon = document.querySelector('.cartoon');
const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;

  // Get cartoon's bounding box
  const cartoonRect = cartoon.getBoundingClientRect();
  const cartoonCenterX = cartoonRect.left + cartoonRect.width / 3;
  const cartoonCenterY = cartoonRect.top + cartoonRect.height / 3;

  // Loop through each eye and calculate movement
  eyes.forEach((eye) => {
    const angle = Math.atan2(clientY - cartoonCenterY, clientX - cartoonCenterX);

    // Define the maximum radius for the eye movement
    const maxRadius = 40;

    // Calculate the new eye position within the allowed radius
    const moveX = maxRadius * Math.cos(angle);
    const moveY = maxRadius * Math.sin(angle);

    // Update eye position
    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});



const text = document.querySelector(".text p");
const screenWidth = window.innerWidth;

if (screenWidth <= 480) {
// For mobile screens
text.innerHTML = text.innerText
.split("")
.map(
  (char, i) =>
    `<span style="--rotate: ${i * 6}deg;">${char}</span>`
)
.join("");
} else {
// For larger screens
text.innerHTML = text.innerText
.split("")
.map(
  (char, i) =>
    `<span style="--rotate: ${i * 6}deg;">${char}</span>`
)
.join("");
}