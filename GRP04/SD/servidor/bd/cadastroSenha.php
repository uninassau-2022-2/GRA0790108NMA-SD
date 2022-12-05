<?php
include_once('./conectar.php');

$tipoSenha = $_POST['tipoSenha'];
$numero = date('ymd') . '' . $tipoSenha;
//Consultando se hoje já foi gerada alguma senha pra esse tipo
$sql = "SELECT * FROM tb_senha WHERE numero LIKE '$numero%' ORDER BY data_hora_criacao DESC LIMIT 1";



$resultado = mysqli_query($strcon, $sql);
//Manipulando a última senha emitida para gerar a nova senha com a sequência correta
if (mysqli_num_rows($resultado) == 1) {
    $dados = mysqli_fetch_assoc($resultado);
    print_r($dados);
    
    $sequencia = intval(substr($dados['numero'], 8));
    $sequencia++;

    $numero = $numero . '' . $sequencia;

}
//Caso não tenha sido gerado senha hoje para este tipo, ela inicia com o valor 1
else {
    $numero =  $numero . '1';
}

$sql = "INSERT INTO tb_senha (numero, tipo) VALUES ('$numero', '$tipoSenha')";
$resultado = mysqli_query($strcon, $sql);



