<?php
function openConnection() {
    $servername = "localhost";
    $username = "root"; // Cambia si es necesario
    $password = "729802"; // Cambia si es necesario
    $dbname = "gestion_autos"; // Cambia por el nombre de tu base de datos

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    return $conn;
}

function closeConnection($conn) {
    $conn->close();
}
?>