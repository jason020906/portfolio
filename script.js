const canvas = document.getElementById("particles-global");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const particleCount = 90;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35
    });
}

function drawLines() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = dx * dx + dy * dy;

            if (distance < 11000) {
                ctx.strokeStyle = "rgba(120, 170, 255, 0.08)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x <= 0 || p.x >= canvas.width) {
            p.speedX *= -1;
        }

        if (p.y <= 0 || p.y >= canvas.height) {
            p.speedY *= -1;
        }

        ctx.fillStyle = "rgba(140, 200, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    drawLines();
    requestAnimationFrame(animateParticles);
}

animateParticles();

/* MENU MOBILE */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* TEXTE HERO TYPEWRITER */
const typedText = document.getElementById("typed-text");

const phrases = [
    "Je construis progressivement mon profil dans le développement web.",
    "Je développe aussi mes compétences en Java et en systèmes informatiques.",
    "Mon objectif est d’évoluer vers l’ingénierie informatique.",
    "Je m’oriente progressivement vers l’intelligence artificielle et la cybersécurité."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }

        setTimeout(typeEffect, 45);
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 250);
            return;
        }

        setTimeout(typeEffect, 22);
    }
}

typeEffect();

/* FILTRES PAGE PROJETS */
const filterButtons = document.querySelectorAll("[data-filter]");
const projectShowcaseCards = document.querySelectorAll("[data-category]");

if (filterButtons.length > 0 && projectShowcaseCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            projectShowcaseCards.forEach(card => {
                const cardCategory = card.dataset.category;

                if (selectedFilter === "all" || selectedFilter === cardCategory) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}
