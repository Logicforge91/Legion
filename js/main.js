// Sections to load dynamically
const sections = [
  "hero.html",
  "about.html",
  "journey.html",
  "timeline.html",
  "skills.html",
  "projects.html",
  // "achievements.html",
  "testimonials.html",
  "contact.html"
];

const content = document.getElementById("content");
const loader = document.getElementById("loader");

// Load sections dynamically
async function loadSections() {
  for (const file of sections) {
    try {
      const resp = await fetch(`sections/${file}`);
      if (!resp.ok) throw new Error(`Failed to load ${file}`);

      const html = await resp.text();
      const div = document.createElement("div");
      div.className = "fade-section"; // custom CSS animation
      div.innerHTML = html;

      content.appendChild(div);
    } catch (err) {
      console.error(err);
    }
  }

  // Fade out loader
  setTimeout(() => loader.classList.add("fade-out"), 600);
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadSections);

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();



