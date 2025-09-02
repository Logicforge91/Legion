// Load Resume Modal dynamically
fetch("resumeModal.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("resumeContainer").innerHTML = html;

    const resumeModal = new bootstrap.Modal(document.getElementById("resumeModal"));
    const closeModal = document.getElementById("closeModal");

    // Show modal function
    function showResumeModal() {
      resumeModal.show();
    }

    // Close modal
    closeModal.addEventListener("click", () => {
      resumeModal.hide();
    });

    // Auto open
    setInterval(showResumeModal, 300000); // every 5 min
    setTimeout(showResumeModal, 10000);   // initial after 10s
  });
