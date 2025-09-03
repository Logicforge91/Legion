document.addEventListener("DOMContentLoaded", () => {


  // Load Footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footerContainer").innerHTML = html;
      // set current year
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
    
});


  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
