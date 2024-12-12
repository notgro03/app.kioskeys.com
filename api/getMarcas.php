<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Consulta a la base de datos
$sql = "SELECT id, marca FROM marcas";
$result = $conn->query($sql);

$marcas = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $marcas[] = $row;
    }
}

echo json_encode($marcas);

$conn->close();
?>