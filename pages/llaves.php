<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Llaves - Kioskeys</title>
  <script src="../js/scripts.js"></script>
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    .search-container {
      max-width: 800px;
      margin: 0 auto 32px;
    }

    .search-box {
      background: white;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(0, 59, 142, 0.15);
      padding: 32px;
      margin-bottom: 32px;
      border: 1px solid rgba(0, 59, 142, 0.1);
    }

    .search-title {
      text-align: center;
      margin-bottom: 24px;
      color: var(--primary-blue);
    }

    .search-title h2 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .search-title p {
      color: #666;
      font-size: 15px;
    }

    .search-fields {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .search-field {
      position: relative;
    }

    .search-field label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-color);
    }

    .search-field select,
    .search-field input {
      width: 100%;
      padding: 14px 16px;
      border-radius: 12px;
      border: 2px solid rgba(0, 59, 142, 0.1);
      font-size: 15px;
      transition: all 0.3s ease;
      background: white;
      -webkit-appearance: none;
      appearance: none;
    }

    .search-field select {
      padding-right: 40px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23003B8E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 16px;
    }

    .search-field select:focus,
    .search-field input:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(0, 59, 142, 0.1);
    }

    .search-button {
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      border: none;
      background: var(--card-gradient);
      color: white;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .search-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 59, 142, 0.2);
    }

    .search-results {
      display: none;
      background: white;
      border-radius: 18px;
      padding: 32px;
      margin-top: 24px;
      box-shadow: 0 8px 32px rgba(0, 59, 142, 0.15);
      border: 1px solid rgba(0, 59, 142, 0.1);
    }

    .search-results.active {
      display: block;
    }

    .result-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 24px;
      padding: 24px;
      border-bottom: 1px solid rgba(0, 59, 142, 0.1);
      align-items: center;
      transition: all 0.3s ease;
    }

    .result-item:hover {
      background: rgba(0, 59, 142, 0.02);
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-logo {
      width: 100px;
      height: 80px;
      object-fit: contain;
      background: white;
      padding: 8px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .result-info h3 {
      margin: 0 0 8px;
      color: var(--primary-blue);
      font-size: 18px;
    }

    .result-info p {
      margin: 0 0 8px;
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }

    .result-features {
      display: flex;
      gap: 16px;
      margin-top: 8px;
    }

    .result-feature {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #666;
    }

    .result-feature i {
      color: var(--primary-blue);
    }

    .result-button {
      padding: 10px 20px;
      border-radius: 8px;
      background: var(--card-gradient);
      color: white;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-align: center;
      min-width: 120px;
    }

    .result-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 59, 142, 0.2);
    }

    .info-section {
      background: white;
      border-radius: 18px;
      padding: 32px;
      margin: 32px 0;
      box-shadow: 0 8px 32px rgba(0, 59, 142, 0.15);
      border: 1px solid rgba(0, 59, 142, 0.1);
    }

    .info-section h2 {
      color: var(--primary-blue);
      margin-bottom: 24px;
      text-align: center;
      font-size: 24px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    .feature-card {
      padding: 24px;
      background: var(--card-gradient);
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s ease;
      color: white;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 59, 142, 0.2);
    }

    .feature-icon {
      font-size: 32px;
      margin-bottom: 16px;
      background: rgba(255, 255, 255, 0.1);
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin: 0 auto 20px;
    }

    .feature-card h3 {
      margin-bottom: 12px;
      color: white;
    }

    .feature-card p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .search-fields {
        grid-template-columns: 1fr;
      }

      .result-item {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .result-logo {
        margin: 0 auto;
      }

      .result-features {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">
      <a href="/"><img src="/logo.svg" alt="Kioskeys"></a>
    </div>
    <div class="nav-links">
      <a href="/">Inicio</a>
      <a href="/pages/red-servicios.html">Red de Servicios</a>
      <a href="/pages/planes.html">Planes</a>
      <a href="/pages/productos.html">Productos</a>
      <a href="/pages/contacto.html">Contacto</a>
    </div>
    <button class="menu-button">
      <i class="fas fa-bars"></i>
    </button>
  </nav>

  <main>
    <section class="hero">
      <div class="hero-content">
        <h1>Llaves</h1>
        <p>Encuentra la llave perfecta para tu vehículo</p>
      </div>
    </section>

    <section class="main-content">
      <div class="content-container">
        <div class="search-container">
          <div class="search-box">
            <div class="search-title">
              <h2>Buscador de Llaves</h2>
              <p>Selecciona tu vehículo para encontrar las llaves compatibles</p>
            </div>
            <div class="search-fields">
              <div class="search-field">
                <label for="brandSelect">Marca</label>
                <select id="brandSelect" onchange="fetchModels()">
                  <option value="">Seleccionar marca</option>
                  <?php
                  // Conexión a la base de datos
                  $servername = "localhost";
                  $username = "root"; // Cambia si es necesario
                  $password = "729802"; // Cambia si es necesario
                  $dbname = "gestion_autos"; // Cambia por el nombre de tu base de datos

                  $conn = new mysqli($servername, $username, $password, $dbname);

                  // Verificar conexión
                  if ($conn->connect_error) {
                      die("Conexión fallida: " . $conn->connect_error);
                  }

                  // Consulta para obtener las marcas
                  $sql = "SELECT id, nombre FROM marcas";
                  $result = $conn->query($sql);

                  // Generar opciones dinámicamente
                  if ($result->num_rows > 0) {
                      while ($row = $result->fetch_assoc()) {
                          echo '<option value="' . $row["id"] . '">' . $row["nombre"] . '</option>';
                      }
                  } else {
                      echo '<option value="">No hay marcas disponibles</option>';
                  }

                  // Cerrar conexión
                  $conn->close();
                  ?>
                </select>
              </div>
              <div class="search-field">
                <label for="modelSelect">Modelo</label>
                <select id="modelSelect" onchange="fetchYears()">
                  <option value="">Seleccionar modelo</option>
                </select>
              </div>
              <div class="search-field">
                <label for="yearSelect">Año</label>
                <select id="yearSelect">
                  <option value="">Seleccionar año</option>
                </select>
              </div>
            </div>
            <button class="search-button" onclick="searchKeys()">
              <i class="fas fa-search"></i>
              Buscar Llaves Compatibles
            </button>
            </div>
          </div>
        </div>
      </div>
</section>

<script>
function fetchModels() {
    var brandId = document.getElementById('brandSelect').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_models.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('modelSelect').innerHTML = xhr.responseText;
            document.getElementById('yearSelect').innerHTML = '<option value="">Seleccionar año</option>'; // Reset year select
        }
    };
    xhr.send('brand_id=' + brandId);
}

function fetchYears() {
    var modelId = document.getElementById('modelSelect').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_years.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('yearSelect').innerHTML = xhr.responseText;
        }
    };
    xhr.send('model_id=' + modelId);
}
</script>

        <div class="info-section">
          <h2>¿Por qué elegir nuestras llaves?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <i class="fas fa-shield-alt feature-icon"></i>
              <h3>Calidad Garantizada</h3>
              <p>Llaves originales y alternativas de la más alta calidad, con garantía de funcionamiento.</p>
            </div>

            <div class="feature-card">
              <i class="fas fa-microchip feature-icon"></i>
              <h3>Tecnología Avanzada</h3>
              <p>Programación computarizada y chips de última generación.</p>
            </div>

            <div class="feature-card">
              <i class="fas fa-clock feature-icon"></i>
              <h3>Servicio Express</h3>
              <p>Duplicado en el momento y servicio de urgencia disponible 24/7.</p>
            </div>

            <div class="feature-card">
              <i class="fas fa-tag feature-icon"></i>
              <h3>Precios Competitivos</h3>
              <p>Mejores precios del mercado con opciones para todos los presupuestos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script>
    // Función para cargar las marcas desde la base de datos
    function loadBrands() {
      fetch('../api/getMarcas.php')
        .then(response => response.json())
        .then(data => {
          const brandSelect = document.getElementById('brandSelect');
          data.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error:', error));
    }

    // Cargar las marcas cuando se carga la página
    document.addEventListener('DOMContentLoaded', loadBrands);

    // Manejar cambio de marca
    document.getElementById('brandSelect').addEventListener('change', function() {
      const modelSelect = document.getElementById('modelSelect');
      const yearSelect = document.getElementById('yearSelect');
      
      modelSelect.innerHTML = '<option value="">Seleccionar modelo</option>';
      yearSelect.innerHTML = '<option value="">Seleccionar año</option>';
      
      if (this.value) {
        modelSelect.disabled = false;
        // Aquí puedes agregar lógica para cargar los modelos basados en la marca seleccionada
        const brand = this.value;
        fetch(`get_models.php?brand=${encodeURIComponent(brand)}`)
          .then(response => response.json())
          .then(models => {
            models.forEach(model => {
              const option = document.createElement('option');
              option.value = model;
              option.textContent = model;
              modelSelect.appendChild(option);
            });
          });
      } else {
        modelSelect.disabled = true;
        yearSelect.disabled = true;
      }
    });

    // Manejar cambio de modelo
    document.getElementById('modelSelect').addEventListener('change', function() {
      const yearSelect = document.getElementById('yearSelect');
      
      yearSelect.innerHTML = '<option value="">Seleccionar año</option>';
      
      if (this.value) {
        yearSelect.disabled = false;
        const brand = document.getElementById('brandSelect').value;
        const model = this.value;
        fetch(`get_years.php?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`)
          .then(response => response.json())
          .then(years => {
            years.forEach(year => {
              const option = document.createElement('option');
              option.value = year;
              option.textContent = year;
              yearSelect.appendChild(option);
            });
          });
      } else {
        yearSelect.disabled = true;
      }
    });

    // Función de búsqueda
    function searchKeys() {
      const brand = document.getElementById('brandSelect').value;
      const model = document.getElementById('modelSelect').value;
      const year = document.getElementById('yearSelect').value;

      if (!brand || !model || !year) {
        alert('Por favor, selecciona marca, modelo y año');
        return;
      }

      // Aquí puedes agregar la lógica para buscar las llaves en la base de datos
      // y mostrar los resultados en el elemento con id "searchResults"
      fetch(`search_keys.php?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`)
        .then(response => response.json())
        .then(data => {
          const results = document.getElementById('searchResults');
          results.innerHTML = '';

          if (data.error) {
            results.innerHTML = `<p>Error: ${data.error}</p>`;
          } else if (data.length === 0) {
            results.innerHTML = '<p>No se encontraron llaves compatibles.</p>';
          } else {
            data.forEach(key => {
              results.innerHTML += `
                <div class="result-item">
                  <img src="${key.imagen_url || 'https://via.placeholder.com/100x80?text=' + brand}" 
                       alt="${key.marca}" class="result-logo">
                  <div class="result-info">
                    <h3>${key.nombre}</h3>
                    <p>Compatible con ${key.marca} ${key.modelo} ${key.ano}</p>
                    <div class="result-features">
                      <span class="result-feature">
                        <i class="fas fa-check-circle"></i> ${key.tipo}
                      </span>
                      <span class="result-feature">
                        <i class="fas fa-shield-alt"></i> Garantía ${key.garantia}
                      </span>
                      <span class="result-feature">
                        <i class="fas fa-microchip"></i> ${key.caracteristicas}
                      </span>
                    </div>
                  </div>
                  <a href="/pages/contacto.html" class="result-button">Consultar</a>
                </div>
              `;
            });
          }

          results.classList.add('active');
        })
        .catch(error => {
          console.error('Error:', error);
          const results = document.getElementById('searchResults');
          results.innerHTML = '<p>Error al buscar llaves. Por favor, intenta de nuevo más tarde.</p>';
          results.classList.add('active');
        });
    }
  </script>

  <script src="/main.js"></script>
</body>
</html>

