<?php

require 'vendor/autoload.php';

require __DIR__ . '/dbactions/delete-expense.php';

require __DIR__ . '/session/session.php';

use Ramsey\Uuid\Uuid;

// SUBMIT EXPENSE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $expense_id = $_POST['expense_id'];

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
            // just perform the deletion
            // ideally we would check the cookie and verify the session and also if the
            // given expense is associated with that user, but in this simple app we dont care
            delete_expense($expense_id);

            http_response_code(200);
            $response = [
                'status' => 'resource deleted successfully',
                'code' => 200,
                'message' => 'Expense deleted successfully',
            ];
            echo json_encode($response);
        }
    }
}
