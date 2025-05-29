<?php

$db_host = "127.0.0.1";
$db_user = "root";
$db_password = "";
$db_database = "nao_2024";

$GLOBALS['dbhost'] = $db_host;
$GLOBALS['dbname'] = $db_database;
$GLOBALS['dbuser'] = $db_user;
$GLOBALS['dbpassword'] = $db_password;

$connessione = new mysqli($db_host, $db_user, $db_password, $db_database);

if($connessione == false) {
    die("Errore di connessione: ".$connessione->connect_error);
}
