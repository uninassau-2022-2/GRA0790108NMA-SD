<?php
include_once('./bd/conectar.php');
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <title>Emitir Senha</title>
</head>

<body class="bg-ligth">
  <div class="w-50 m-auto bg-white shadow p-3 rounded">
    <h2 class="text-center">EMITIR SENHA</h2>
    <form action="./bd/cadastroSenha.php" method="POST">
      <div class="form-group">
        <label for="TipoSenha">Tipo de senha</label>
        <select class="form-control" id="tipoSenha" name="tipoSenha">
          <option value="SG">Geral</option>
          <option value="SE">Exames</option>
          <option value="SP">Prioritária</option>
        </select>
      </div>
      <div class="text-center"><button class="btn btn-success" type="submit">Confirmar</button></div>
    </form>
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col" class="text-center">Senha</th>
          <th scope="col" class="text-center">Data/Hora Emissão</th>
        </tr>
      </thead>
      <tbody>
        <?php
        include_once('./bd/consultaSenha.php');
        while ($dados = mysqli_fetch_assoc($resultado)) {
        ?>
          <tr>
            <td class="text-center"> <?php echo $dados['numero'];?></td>
            <td class="text-center"><?php echo $dados['data_hora_criacao'];?></td>
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