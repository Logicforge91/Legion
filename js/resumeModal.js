// Load Resume Modal dynamically
fetch("resumeModal.html")
  .then(res => res.text())
  .then(html => {
    // Inject modal into container
    document.getElementById("resumeContainer").innerHTML = html;

    // Grab modal element
    const modalEl = document.getElementById("resumeModal");
    const resumeModal = new bootstrap.Modal(modalEl, {
      backdrop: "static", // disable backdrop close
      keyboard: false     // disable ESC close
    });

    // Show modal + auto-hide after 2 min
    function showResumeModal() {
      resumeModal.show();

      // Auto-hide after 2 minutes
      setTimeout(() => {
        resumeModal.hide();
      }, 120000);
    }

    // Auto open modal schedule
    setInterval(showResumeModal, 300000); // every 5 min
    setTimeout(showResumeModal, 10000);   // first after 10s
  })
  .catch(err => console.error("Error loading modal:", err));
