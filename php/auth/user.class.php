<?php

require "../db_connection.php";

function get_user($emailUser) {
    global $connessione;

    $sql_select = "SELECT * FROM users WHERE email = '$emailUser' OR username = '$emailUser'";    // Selezione della row con o email o username corrispondenti
    if($result = $connessione->query($sql_select)) {
        if($result->num_rows == 1) {
            $row = $result->fetch_array(MYSQLI_ASSOC);
            return $row;
        } else {
            return false;
        }
    }
}

function match_password($emailUser, $password) {
    $user = get_user($emailUser);

    if($user != false) {
        if(password_verify($password, $user['password'])) {  
            return array(true, $user['username']);
        } else {
            return array(false);
        }
    } else {
        return array(false);
    }
}

function signup($name, $surname, $user, $email, $password) {
    global $connessione;
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $user = strtolower($user);
    $email = strtolower($email);

    $sql = "INSERT INTO users (name, surname, username, email, password) VALUES ('$name', '$surname', '$user', '$email', '$password_hash')";

    if($connessione->query($sql)) {
        return true;
    } else {
        return false;
    }
}


function checkUserExist($username) {
    global $connessione;
    $query = "SELECT * FROM users WHERE username = '$username'";
    
    if($result = $connessione->query($query)) {
        if($result->num_rows > 0) {
            return true; // Trovato
        } else {
            return false; // Non trovato
        }
    } else {
        return false;
    }
}

function checkEmailExist($email) {
    global $connessione;
    $query = "SELECT * FROM users WHERE email = '$email'";
    
    if($result = $connessione->query($query)) {
        if($result->num_rows > 0) {
            return true; // Trovato
        } else {
            return false; // Non trovato
        }
    } else {
        return false;
    }
}

function setSessionId($user) {
    global $connessione;

    $session_id = date("Ymdhis");

    $sql = "UPDATE users SET session_id = '$session_id' WHERE username = '$user'";

    $connessione->query($sql);

    return $session_id;
}

function checkSession($user, $session_id){
    global $connessione;
    $sql = "SELECT * FROM users WHERE username = '$user' AND session_id = '$session_id'";
            
    if($result = $connessione->query($sql)){
        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}