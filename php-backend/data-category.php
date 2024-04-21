<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/get-category.php';

require __DIR__ . '/session/session.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $res_cats = get_categories();

        if (pg_num_rows($res_cats) == 0) {
            header('Content-Type: application/json');
            http_response_code(404);
            echo json_encode([
                'status' => 'Not Found',
                'code' => 404,
                'message' => 'User does not exist'
            ]);
        } else {
            $cats = pg_fetch_all($res_cats);
            
            http_response_code(200);
            $response = [
                'status' => 'Ok',
                'code' => 200,
                'categories' => $cats,
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
