// Load Resume Modal dynamically
fetch("resumeModal.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("resumeContainer").innerHTML = html;

    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.getElementById('closeModal');

    function showResumeModal() {
      resumeModal.classList.remove('hidden');
      resumeModal.classList.add('show');
    }

    closeModal.addEventListener('click', () => {
      resumeModal.classList.remove('show');
      resumeModal.classList.add('hidden');
    });

    setInterval(showResumeModal, 300000); // every 5 min
    setTimeout(showResumeModal, 10000);   // initial after 10s
  });
