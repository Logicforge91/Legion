document.addEventListener("DOMContentLoaded", () => {
  // Load Footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footerContainer").innerHTML = html;

      // Set current year in footer
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    })
    .catch(err => console.error("Failed to load footer:", err));

  // Mobile nav toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }
});

// Add "loaded" class when everything (images, css, etc.) is ready
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
