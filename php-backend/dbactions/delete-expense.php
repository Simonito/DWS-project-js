<?php

require __DIR__ . '/database.php';


function delete_expense($expense_id) {
    global $dbconn;
    $query = "DELETE FROM expenses WHERE expense_id = $1;";
    $result = pg_query_params($dbconn, $query, [$expense_id]);

    if (!$result) {
        return null;
    }
}
