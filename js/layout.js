document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("headerContainer").innerHTML = html;
    });

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
