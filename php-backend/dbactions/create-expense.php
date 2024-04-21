<?php

require __DIR__ . '/database.php';


function create_expense($expense_id, $category_id, $user_id, $amount, $paid_at, $created_at) {
    global $dbconn;
    $query = "INSERT INTO expenses
            (expense_id, category_id, user_id, amount, paid_at, created_at)
            VALUES ($1, $2, $3, $4, $5, $6);";
    $result = pg_query_params($dbconn, $query, [$expense_id, $category_id, $user_id, $amount, $paid_at, $created_at]);

    if (!$result) {
        return null;
    }
}
