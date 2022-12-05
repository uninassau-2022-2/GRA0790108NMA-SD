<?php
include_once('./bd/conectar.php');
?><!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Chamar Senha</title>
</head>

<body class="bg-ligth">
    <div class="w-50 m-auto bg-white shadow p-3 rounded">
        <h2 class="text-center">CHAMAR SENHA</h2>
        <h3 class="text-center mt-3">Guichê 01</h3>
        <form action="./bd/atualizarSenha.php" method="POST">
            <div class="text-center"><input name="guiche" hidden type="text" value="1"></div>
            <div class="text-center"><button class="btn btn-primary " type="submit">Chamar próxima</button></div>
        </form>
        <h3 class="text-center mt-3">Guichê 02</h3>
        <form action="./bd/atualizarSenha.php" method="POST">
            <div class="text-center"><input name="guiche" hidden type="text" value="2"></div>
            <div class="text-center"><button class="btn btn-primary " type="submit">Chamar próxima</button></div>
        </form>
        <h3 class="text-center mt-3">Guichê 03</h3>
        <form action="./bd/atualizarSenha.php" method="POST">
            <div class="text-center"><input name="guiche" hidden type="text" value="3"></div>
            <div class="text-center"><button class="btn btn-primary" type="submit">Chamar próxima</button></div>
        </form>
        <h3 class="text-center mt-4">Últimas senhas chamadas</h3>
        <table class="table table-striped mt-3">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Senha</th>
                    <th scope="col" class="text-center">Guichê</th>
                    <th scope="col" class="text-center">Data/Hora Emissão</th>
                    <th scope="col" class="text-center">Data/Hora Atendimento</th>
                    
                </tr>
            </thead>
            <tbody>
                <?php
                include_once('./bd/consultaSenhasChamadas.php');
                while ($dados = mysqli_fetch_assoc($resultado)) {
                ?>
                    <tr>
                        <td class="text-center"> <?php echo $dados['numero']; ?></td>
                        <td class="text-center"> <?php echo $dados['guiche_atendimento']; ?></td>
                        <td class="text-center"><?php echo $dados['data_hora_criacao']; ?></td>
                        <td class="text-center"><?php echo $dados['data_hora_atendimento']; ?></td>
                    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>
    </div>




    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>

</html>