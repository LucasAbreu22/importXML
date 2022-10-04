<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once 'class/class.connect.php';

$evento = $_POST['event'];

if($evento == 'select'){
  $sql = "SELECT * FROM tabela";
  $query = $pdo->prepare($sql);
  $query->execute();
  $call = $query->fetchAll(PDO::FETCH_OBJ);
  echo json_encode($call, JSON_NUMERIC_CHECK);
}

if($evento == 'insert'){
 
  $dados_alunos = $_POST['dados_alunos'];

  foreach($dados_alunos as $ln){
  $nome = $ln['nome'];
  $inscricao = $ln['inscricao'];

  $sql = "INSERT INTO tabela (name, inscricao, email_enviado)
          VALUES ( '$nome', '$inscricao', 0)";
  
  print_r($sql);
  $query = $pdo->prepare($sql);
  $query->execute();
  
  }
}