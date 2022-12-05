<?php
$serverName = "localhost";
$database = "id19839225_totemuninassau";
$username = "id19839225_totem";
$password = "P@blodias85652293";

$strcon = mysqli_connect($serverName, $username, $password, $database);

if (!$strcon) {
    die("Falha na Conexão: " . mysqli_connect_error());
}
