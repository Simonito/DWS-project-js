<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/get-user.php';
require __DIR__ . '/dbactions/get-user-expenses.php';

require __DIR__ . '/session/session.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sessid = $_REQUEST['pfa_cookie'];
    $user_id = get_user_from_session($sessid);
    if (!$user_id) {
        http_response_code(401);
        setcookie('pfa_cookie', $sessid, -3600);
        echo json_encode([
            'status' => 'Unauthenticated',
            'code' => 401,
            'message' => 'Malformed cookie. log in again'
        ]);
    } else {
        try {
            $res_user = get_user($user_id);
            $res_user_expenses = get_expenses_by_user_id($user_id);
    
            if (pg_num_rows($res_user) == 0) {
                header('Content-Type: application/json');
                http_response_code(404);
                echo json_encode([
                    'status' => 'Not Found',
                    'code' => 404,
                    'message' => 'User does not exist'
                ]);
            } else {
                $username = pg_fetch_all($res_user)[0]['username'];
                $user_expenses = pg_fetch_all($res_user_expenses);
                
                http_response_code(200);
                $response = [
                    'status' => 'Ok',
                    'code' => 200,
                    'username' => $username,
                    'user_expenses' => $user_expenses,
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            }
        } catch (Exception $e) {
            // Handle unexpected exceptions here
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode([
                'status' => 'Internal Server Error',
                'code' => 500,
                'message' => 'An error occurred'
            ]);
        }

    }
}