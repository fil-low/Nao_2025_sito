<?php

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

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $req = getQuery();

    switch($req->request) {
        case 'check':      // Controllo se sessione è valida
            if(isset($_SESSION['username'])) {
                echo json_encode(array(true));
            } else {
                echo json_encode(array(false, "Session expired..."));
            }
            break;

        case 'signin':
            if($matchRes = match_password($req->emailUser, $req->password)) {
                if($matchRes[0]) {
                    $_SESSION['username'] = $matchRes[1];
                    echo json_encode(array(
                        'status' => true,
                        'username' => $matchRes[1],
                        'session_id' => setSessionId($matchRes[1])
                    ));
                    return;
                }
            }
            echo json_encode(array(false, "Wrong password!"));
            break;
        
        case 'signup':
            if(!checkUserExist($req->user) && !checkEmailExist($req->email)) {
                if(isset($req->name, $req->surname, $req->user, $req->email, $req->password)) {
                    if(signup(
                        $req->name,
                        $req->surname,
                        $req->user,
                        $req->email,
                        $req->password
                    )){
                        echo json_encode(array(
                            'status' => true,
                            'username' => $req->user,
                            'session_id' => setSessionId($req->user)
                        ));
                    }
                }
            }
            break;

        case 'logout':
            unset($_SESSION['username']);
            session_destroy();
            echo json_encode(array(true));
            break;

        case 'checkUserExist':
            if(checkUserExist($req->user)) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;

        case 'checkEmailExist':
            if(checkEmailExist($req->email)) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;

        case 'checkSessionId':
            $user = $req->username;
            $session_id = $req->session_id;
            echo json_encode(checkSession($user, $session_id));
            break;
        
        default:
            break;
    }
}