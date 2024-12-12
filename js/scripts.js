// Function to fetch data from the database and update the "Marca" section
function fetchMarcaData() {
  fetch('/path/to/your/api/endpoint')
    .then(response => response.json())
    .then(data => {
      const marcaSection = document.querySelector('.marca-section');
      marcaSection.innerHTML = ''; // Clear existing content

      data.forEach(item => {
        const marcaItem = document.createElement('div');
        marcaItem.className = 'marca-item';
        marcaItem.textContent = item.marca; // Assuming 'marca' is the field name
        marcaSection.appendChild(marcaItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchMarcaData);