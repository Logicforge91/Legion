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
        div.className = "opacity-0 animate-fadeIn";
        div.innerHTML = html;
  
        content.appendChild(div);
        requestAnimationFrame(() => div.classList.remove("opacity-0"));
      } catch (err) {
        console.error(err);
      }
    }
  
    // Fade out loader
    setTimeout(() => loader.classList.add("fade-out"), 600);
  }
  
  // Run on page load
  loadSections();
  
  // Footer Year
  document.getElementById("year").textContent = new Date().getFullYear();
  