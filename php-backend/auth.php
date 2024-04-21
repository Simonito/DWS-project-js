<?php

require 'vendor/autoload.php';

require __DIR__ . '/session/session.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (!isset($_REQUEST['pfa_cookie'])) {
        // base case if the cookie is not set
        http_response_code(401);
        echo json_encode([
            'status' => 'Unauthorized',
            'code' => 401,
            'message' => 'Unauthorized, log in!'
        ]);
    } else {
        $sessid = $_REQUEST['pfa_cookie'];
        $user_id = get_user_from_session($sessid);

        if (!$user_id) {
            // the provided cookie is not tracked in the session tracker
            http_response_code(401);
            setcookie('pfa_cookie', $sessid, -3600);
            echo json_encode([
                'status' => 'Unauthenticated',
                'code' => 401,
                'message' => 'Malformed cookie, log in again'
            ]);
        } else {
            // User id is tracked -> it is a valid user
            http_response_code(200);
            echo json_encode([
                'status' => 'Ok',
                'code' => 200,
                'message' => 'Authenticated'
            ]);
        }
    }
}