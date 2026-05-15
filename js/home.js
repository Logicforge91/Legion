 const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
  });



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