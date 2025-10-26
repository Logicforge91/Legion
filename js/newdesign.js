
  /**
   * Dynamically load HTML content into a container
   * @param {string} url - The path to the HTML file
   * @param {string} containerId - The ID of the container element
   */
  function loadHTML(url, containerId) {
    fetch(url)
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

  // Load multiple components
  loadHTML('header.html', 'headerContainer');
  loadHTML('footer.html', 'footerContainer');


  document.getElementById('year').textContent = new Date().getFullYear();



  