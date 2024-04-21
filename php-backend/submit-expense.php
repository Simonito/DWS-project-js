<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/create-expense.php';

require __DIR__ . '/session/session.php';

use Ramsey\Uuid\Uuid;

// SUBMIT EXPENSE
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $amount = $_POST['amount'];
    $cat_id = $_POST['category_id'];
    $paid_at = $_POST['paid_at'];
    $created_at = $_POST['created_at'];

    header('Content-Type: application/json');
    
    if (!isset($_REQUEST['pfa_cookie'])) {
        // cookie is not set
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
            // invalid cookie
            http_response_code(401);
            setcookie('pfa_cookie', $sessid, -3600);
            echo json_encode([
                'status' => 'Unauthenticated',
                'code' => 401,
                'message' => 'Malformed cookie. log in again'
            ]);
        } else {
            // just perform the insertion
            $expense_id = Uuid::uuid4();
            create_expense($expense_id, $cat_id, $user_id, $amount, $paid_at, $created_at);

            http_response_code(201);
            $response = [
                'status' => 'Created',
                'code' => 201,
                'message' => 'Expense created successfully',
            ];
            echo json_encode($response);
        }
    }
}
