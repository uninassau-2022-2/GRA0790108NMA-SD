<?php
$sql = "SELECT * FROM tb_senha ORDER BY data_hora_criacao DESC LIMIT 5";
$resultado = mysqli_query($strcon, $sql);
