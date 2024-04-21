<?php

require __DIR__ . '/database.php';


function create_user($user_id, $username, $password) {
    global $dbconn;
    $query = "INSERT INTO users (user_id, username, password) VALUES ($1, $2, $3);";
    $result = pg_query_params($dbconn, $query, [$user_id, $username, $password]);

    if (!$result) {
        return null;
    }
}
