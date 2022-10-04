<?php

$dsn = "mysql:host=10.0.80.32;dbname=teste";
$username = "abreu";
$password = "226069";
// Create connection

try {
  $pdo = new PDO($dsn, $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $ex) {
  echo 'Erro: ' . $ex->getMessage();
}