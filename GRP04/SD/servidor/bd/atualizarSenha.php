<?php
include('./conectar.php');
$guiche = $_POST['guiche'];
$numero = "";
//Verificando qual foi a última senha chamada
$sql = "SELECT * FROM tb_senha WHERE numero LIKE '$numero%' AND data_hora_atendimento IS NOT NULL ORDER BY data_hora_atendimento DESC LIMIT 1";
$resultado = mysqli_query($strcon, $sql);
//conferindo se foi chamada alguma senha hoje
if (mysqli_num_rows($resultado) == 1) {
    $dados = mysqli_fetch_assoc($resultado);
    print_r($dados);

    if ($dados['tipo'] == "SP") {
        chamarSenha("SE", "SG", "SE", $guiche);
    } else if ($dados['tipo'] == "SE") {
        chamarSenha("SP", "SG", "SE", $guiche);
    } else {
        chamarSenha("SP", "SE", "SG", $guiche);
    }
} else {
    chamarSenha("SP", "SE", "SG", $guiche);
}

function chamarSenha($s1, $s2, $s3, $guiche)
{
    include('./conectar.php');
    $numero = date('ymd') . '' . $s1;
    $sql = "SELECT * FROM tb_senha WHERE numero LIKE '$numero%' AND data_hora_atendimento IS NULL ORDER BY data_hora_criacao ASC";
    $resultado = mysqli_query($strcon, $sql);
    if (mysqli_num_rows($resultado) >= 1) {
        $dados = mysqli_fetch_assoc($resultado);
        //setar a data de atendimetno aqui
        $hoje = date("Y-m-d H:i:s");
        $id = $dados['numero'];
        $sql = "UPDATE tb_senha SET data_hora_atendimento = '$hoje', guiche_atendimento= '$guiche' WHERE numero = '$id'";
        $resultado = mysqli_query($strcon, $sql);
        print_r($dados);
        echo "setei a senha: " . $id;
    } else {
        $numero = date('ymd') . '' . $s2;
        $sql = "SELECT * FROM tb_senha WHERE numero LIKE '$numero%' AND data_hora_atendimento IS NULL ORDER BY data_hora_criacao ASC";
        $resultado = mysqli_query($strcon, $sql);
        if (mysqli_num_rows($resultado) >= 1) {
            $dados = mysqli_fetch_assoc($resultado);
            //setar a data de atendimetno aqui
            $hoje = date("Y-m-d H:i:s");
            $id = $dados['numero'];
            $sql = "UPDATE tb_senha SET data_hora_atendimento = '$hoje', guiche_atendimento= '$guiche'  WHERE numero = '$id'";
            $resultado = mysqli_query($strcon, $sql);
            print_r($dados);
            echo "setei a senha: " . $id;
        } else {
            $numero = date('ymd') . '' . $s3;
            $sql = "SELECT * FROM tb_senha WHERE numero LIKE '$numero%' AND data_hora_atendimento IS NULL ORDER BY data_hora_criacao ASC";
            $resultado = mysqli_query($strcon, $sql);
            if (mysqli_num_rows($resultado) >= 1) {
                $dados = mysqli_fetch_assoc($resultado);
                //setar a data de atendimetno aqui
                $hoje = date("Y-m-d H:i:s");
                $id = $dados['numero'];
                $sql = "UPDATE tb_senha SET data_hora_atendimento = '$hoje', guiche_atendimento= '$guiche'  WHERE numero = '$id'";
                $resultado = mysqli_query($strcon, $sql);
                print_r($dados);
                echo "setei a senha: " . $id;
            }
        }
    }
}
