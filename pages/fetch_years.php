<?php
$servername = "localhost";
$username = "root"; // Cambia si es necesario
$password = "729802"; // Cambia si es necesario
$dbname = "gestion_autos"; // Cambia por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$model_id = $_POST['model_id'];

$sql = "SELECT DISTINCT anio FROM anios WHERE modelo_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $model_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<option value="' . $row["anio"] . '">' . $row["anio"] . '</option>';
    }
} else {
    echo '<option value="">No hay años disponibles</option>';
}

$stmt->close();
$conn->close();
?>