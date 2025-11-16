/**
 * Dynamically load HTML content into a container
 * @param {string} url - The path to the HTML file
 * @param {string} containerId - The ID of the container element
 * @returns {Promise} Resolves when content is loaded
 */
function loadHTML(url, containerId) {
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = data;
    })
    .catch(error => console.error(error));
}

/**
 * Load main sections dynamically
 * @param {string[]} sections - Array of HTML files to load
 * @param {HTMLElement} contentContainer - Container to append sections
 */
async function loadSections(sections, contentContainer) {
  for (const file of sections) {
    try {
      const resp = await fetch(`sections/${file}`);
      if (!resp.ok) throw new Error(`Failed to load ${file}`);
      const html = await resp.text();

      const div = document.createElement("div");
      div.className = "fade-section"; // optional CSS animation
      div.innerHTML = html;

      contentContainer.appendChild(div);
    } catch (err) {
      console.error(err);
    }
  }
}

/**
 * Initialize the page
 */
document.addEventListener("DOMContentLoaded", async () => {
  const content = document.getElementById("content");
  const loader = document.getElementById("loader");

  // Load header and footer first
  await loadHTML('header.html', 'headerContainer');
  await loadHTML('footer.html', 'footerContainer');

  // Set current year in footer after footer loads
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Load main sections dynamically
  const sections = [
    "hero.html",
    "about.html",
    "journey.html",
    "timeline.html",
    "skills.html",
    "projects.html",
    "contact.html"
  ];

  if (content) {
    await loadSections(sections, content);
  }

  // Fade out loader safely
  if (loader) {
    setTimeout(() => loader.classList.add("fade-out"), 600);
  }
});

  const shapes = document.querySelectorAll('.hero-shapes .shape');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 15;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

   const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray;

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 20000); // adjust density
    for(let i=0;i<numParticles;i++){
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(13,110,253,0.15)';
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', initCanvas);
  initCanvas();
  animateParticles();