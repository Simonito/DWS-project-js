<?php

require 'vendor/autoload.php';

require __DIR__ . '/session/session.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sessid = $_REQUEST['pfa_cookie'];
    terminate_session($sessid);

    http_response_code(200);
    setcookie('pfa_cookie', $sessid, -3600);
    echo json_encode([
        'status' => 'Ok',
        'code' => 200,
        'message' => 'Successfully logged out.'
    ]);
}
