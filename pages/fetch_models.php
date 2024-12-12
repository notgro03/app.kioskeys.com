<?php
$servername = "localhost";
$username = "root"; // Cambia si es necesario
$password = "729802"; // Cambia si es necesario
$dbname = "gestion_autos"; // Cambia por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$brand_id = $_POST['brand_id'];

$sql = "SELECT id, nombre FROM modelos WHERE marca_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $brand_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<option value="' . $row["id"] . '">' . $row["nombre"] . '</option>';
    }
} else {
    echo '<option value="">No hay modelos disponibles</option>';
}

$stmt->close();
$conn->close();
?>