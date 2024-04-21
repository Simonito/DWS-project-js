<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/get-user.php';
require __DIR__ . '/dbactions/create-user.php';

require __DIR__ . '/session/session.php';

use Ramsey\Uuid\Uuid;

// REGISTRATION
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['username'];
    $passwd = $_POST['password'];

    header('Content-Type: application/json');

    // var_dump($_REQUEST);
    // $sessid = $_REQUEST['session_id'];

    // verify that username is available
    $res_user = get_user_by_name($name);
    if (pg_num_rows($res_user) != 0) {
        // username is taken
        http_response_code(409);
        echo json_encode([
            'status' => 'Conflict',
            'code' => 409,
            'message' => 'User already exists'
        ]);
    } else {
        // username is available
        $hashed_pass = password_hash($passwd, PASSWORD_BCRYPT);
        $user_id = Uuid::uuid4();
        create_user($user_id, $name, $hashed_pass);

        $session_cookie = new_session($user_id);
        
        setcookie('pfa_cookie', $session_cookie, time() + 3600);
        http_response_code(201);
        $response = [
            'status' => 'Created',
            'code' => 201,
            'pfa_cookie' => $session_cookie,
        ];
        echo json_encode($response);
    }
}
