<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require '../db_connection.php';

function getQuery() {
    $postdata = file_get_contents("php://input");
    return json_decode($postdata);
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $req = getQuery();

    switch($req->request) {
        case 'get-cart':
            global $connessione;
            $user = $req->username;
            $sql = "SELECT cart FROM users WHERE username = '$user'";
            if($result = $connessione->query($sql)) {
                if($result->num_rows == 1) {
                    $result = $result->fetch_assoc()['cart'];
    
                    echo json_encode($result);
                }
            } else {
                echo json_encode(false);
            }
            break;

        case 'product-data':
            global $connessione;
            $product = $req->product;
            $sql = "SELECT * FROM products WHERE name = '$product'";
            if($result = $connessione->query($sql)) {
                if($result->num_rows == 1) {
                    $result = $result->fetch_assoc();
    
                    echo json_encode($result);
                }
            } else {
                echo json_encode(false);
            }
            break;

            case 'addToCart':
                global $connessione;
                $user = $req->user;
                $productName = $req->product;
        
                $sql = "SELECT cart FROM users WHERE username = '$user'";
                if($result = $connessione->query($sql)) {
                    if($result->num_rows == 1) {
                        $result = $result->fetch_assoc()['cart'];
                        $result = json_decode($result, true);
                        
                        if(array_key_exists($productName, $result)){
                            $result[$productName] += 1;
                        } else {
                            $result[$productName] = 1;
                        }
        
                        $result = json_encode($result, true);
        
                        $sql = "UPDATE users SET cart = '$result' WHERE username = '$user'";
                        if($connessione->query($sql)){
                            echo json_encode(true);
                        } else {
                            echo json_encode(false);
                        }
                    }
                } else {
                    echo json_encode(false);
                }
                break;


        case 'rmToCart':
            global $connessione;
            $user = $req->user;
            $productName = $req->product;
    
            $sql = "SELECT cart FROM users WHERE username = '$user'";
            if($result = $connessione->query($sql)) {
                if($result->num_rows == 1) {
                    $result = $result->fetch_assoc()['cart'];
                    $result = json_decode($result, true);
                    
                    if(array_key_exists($productName, $result)){
                        if($result[$productName] > 0){
                            $result[$productName] -= 1;
                        }
                    } else {
                        $result[$productName] = 1;
                    }
    
                    $result = json_encode($result, true);
    
                    $sql = "UPDATE users SET cart = '$result' WHERE username = '$user'";
                    if($connessione->query($sql)){
                        echo json_encode(true);
                    } else {
                        echo json_encode(false);
                    }
                }
            } else {
                echo json_encode(false);
            }
            break;

        case 'total':
            global $connessione;
            $user = $req->user;
            $total = 0.00;
        
            $sql = "SELECT cart FROM users WHERE username = '$user'";
            if($result = $connessione->query($sql)) {
                if($result->num_rows == 1) {
                    $result = $result->fetch_assoc();
    
                    $cart = json_decode($result['cart'], true);
                    $elements = array_keys($cart);
                    // calcolo del totale
                    foreach ($elements as $name_element) {
                        $price = $connessione->query("SELECT price FROM products WHERE name  = '$name_element'");
                        $price = floatval(implode($price->fetch_assoc()));
                        
                        $total += $price * $cart[$name_element];
    
                    }
                }
            }
            echo json_encode($total);
            break;
    }
}