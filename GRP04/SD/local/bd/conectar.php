<?php
$serverName = "localhost";
$database = "bd_sd";
$username = "root";
$password = "";

$strcon = mysqli_connect($serverName, $username, $password, $database);

if (!$strcon) {
    die("Falha na Conexão: " . mysqli_connect_error());
}