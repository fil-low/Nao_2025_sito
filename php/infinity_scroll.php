<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

function getQuery() {
    $postdata = file_get_contents("php://input");
    return json_decode($postdata);
}

function imgList($percorso){
    $fileTrovati= array();
    // apro la cartella che voglio leggere   
    $aperturaPercorso = opendir($percorso);
    // scrorro tutti i file prensenti nella cartella e li inserirsco nell'array   
    while ($file = readdir($aperturaPercorso)) {
        if(is_file($percorso.$file)){
            array_push($fileTrovati, $file);
        }
    }
    // chiudo la cartella che ho letto   
    $aperturaPercorso = closedir($aperturaPercorso);
    // ritorno l'array con tutti i file   
    return $fileTrovati;
}

/* Template
{
    "page": integer,
    "n_photos": integer,
}
*/

// Test
// $req = [
//     "page" => 1,
//     "n_photos" => 2,
// ];

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $req = getQuery();
    $p = $req->page;
    $n = $req->n_photos;

    $res = [];

    $imgList = imgList("../src/assets/photos/");

    for($i = 0; $i < $n; $i++) {
        if(array_key_exists($i + $p * $n, $imgList)) {
            array_push($res, $imgList[$i + $p * $n]);
        }
    }
}

if($res) echo json_encode($res);