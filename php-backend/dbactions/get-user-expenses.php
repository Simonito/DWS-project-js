<?php

require __DIR__ . '/database.php';

function get_expenses_by_user_id($user_id) {
    global $dbconn;
    $query = "SELECT
        expense_id,
        amount,
        TO_CHAR(paid_at, 'YYYY-MM-DD HH:MI:SS') as paid_at,
        name as category_name
        FROM expenses e JOIN users u USING(user_id) as eu
        JOIN categories c USING(category_id) as euc
        WHERE user_id = $1;";
    return pg_query_params($dbconn, $query, [$user_id]);
}
