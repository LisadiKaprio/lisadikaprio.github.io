
    // load images array from images.js instead 
    console.log(drawings); // check if it’s working

    
    // Pagination variables
    const imagesPerPage = 10; // Reduced to 4 per page since each image now takes more vertical space
    let currentPage = 1;
    const totalPages = Math.ceil(drawings.length / imagesPerPage);
    
    // DOM elements
    const gallery = document.getElementById('gallery');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    // Function to display images for current page
    function displayImages() {
      gallery.innerHTML = '';
      
      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = Math.min(startIndex + imagesPerPage, drawings.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        const drawingDiv = document.createElement('div');
        drawingDiv.className = 'drawing';
        
        // Add decorative corners (very retro!)
        const cornerSymbols = ['&#x2020;', '&#x2666;', '&#x2665;', '&#x2663;'];
        for (let c = 0; c < 4; c++) {
          const corner = document.createElement('div');
          corner.className = 'drawing-corner';
          corner.innerHTML = cornerSymbols[c];
          
          if (c === 0) corner.classList.add('corner-tl');
          if (c === 1) corner.classList.add('corner-tr');
          if (c === 2) corner.classList.add('corner-bl');
          if (c === 3) corner.classList.add('corner-br');
          
          drawingDiv.appendChild(corner);
        }
        
        // Create anchor tag to open image in new tab
        const link = document.createElement('a');
        link.href = drawings[i];
        link.target = "_blank"; // This makes it open in a new tab
        
        const img = document.createElement('img');
        img.src = drawings[i];
        img.alt = 'Artwork';
        
        link.appendChild(img);
        drawingDiv.appendChild(link);
        gallery.appendChild(drawingDiv);
      }
      
      // Update pagination info
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      
      // Update button states
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    }
    
    // Event listeners for pagination buttons
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayImages();
        window.scrollTo(0, 0);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayImages();
        window.scrollTo(0, 0);
      }
    });
    
    // Visitor counter simulation
    function updateVisitorCount() {
      // Check if we have a stored count
      let count = localStorage.getItem('visitorCount');
      
      if (!count) {
        // Initialize with a random number for effect
        count = 0;
      } else {
        // Increment the count
        count = parseInt(count) + 1;
      }
      
      // Store the updated count
      localStorage.setItem('visitorCount', count);
      
      // Format the count with leading zerosd
      const formattedCount = count.toString().padStart(6, '0');
      document.getElementById('visitor-count').textContent = `Visitors: ${formattedCount}`;
    }
    
    // Initialize the page
    displayImages();
    updateVisitorCount();