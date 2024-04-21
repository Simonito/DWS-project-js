<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/get-expenses.php';

require __DIR__ . '/session/session.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (!isset($_REQUEST['pfa_cookie'])) {
        // not set cookie
        http_response_code(401);
        echo json_encode([
            'status' => 'Unauthorized',
            'code' => 401,
            'message' => 'Unauthorized, log in!'
        ]);
    } else {
        // cookie set
        $sessid = $_REQUEST['pfa_cookie'];
        $user_id = get_user_from_session($sessid);
        if (!$user_id) {
            // malformed cookie, not tracking any user to that cookie
            http_response_code(401);
            setcookie('pfa_cookie', $sessid, -3600);
            echo json_encode([
                'status' => 'Unauthenticated',
                'code' => 401,
                'message' => 'Malformed cookie. log in again'
            ]);
        } else {
            try {
                $res_user_expenses = get_expenses_by_user_id($user_id);

                $user_expenses = pg_fetch_all($res_user);
                
                http_response_code(200);
                $response = [
                    'status' => 'Ok',
                    'code' => 200,
                    'user_expenses' => $user_expenses,
                ];
                header('Content-Type: application/json');
                echo json_encode($response);
            } catch (Exception $e) {
                // Handle unexpected exceptions here
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode([
                    'status' => 'Internal Server Error',
                    'code' => 500,
                    'message' => 'An error occurred',
                ]);
            }

        }
    }
}