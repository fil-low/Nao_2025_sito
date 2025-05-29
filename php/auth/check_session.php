<?php

// Inizia la sessione solo se non è già stata avviata
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require '../db_connection.php';
require 'user.class.php';

function getQuery() {
    $postdata = file_get_contents("php://input");
    return json_decode($postdata);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $req = getQuery();

    // Verifica se $req è null
    if ($req == null) {
        echo json_encode(array(false, "Request data is null"));
        exit;
    }

    // Debug output per verificare il contenuto di $req
    var_dump($req);

    switch($req->request) {
        case 'check':      // Controllo se sessione è valida
            if(isset($_SESSION['username'])) {
                echo json_encode(array(true));
            } else {
                echo json_encode(array(false, "Session expired..."));
            }
            break;

        // Resto del tuo codice...
    }
}
