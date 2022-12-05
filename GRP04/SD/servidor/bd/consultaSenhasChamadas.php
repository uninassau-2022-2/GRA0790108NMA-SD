<?php
$sql = "SELECT * FROM tb_senha WHERE data_hora_atendimento IS NOT NULL ORDER BY data_hora_atendimento DESC LIMIT 5";
$resultado = mysqli_query($strcon, $sql);
