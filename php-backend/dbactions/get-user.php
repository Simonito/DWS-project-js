<?php

require __DIR__ . '/database.php';

function get_user($user_id) {
    global $dbconn;
    $query = "SELECT * FROM users WHERE user_id = $1;";
    return pg_query_params($dbconn, $query, [$user_id]);
}


function get_user_by_name($username) {
    global $dbconn;
    $query = "SELECT * FROM users WHERE username = $1;";
    return pg_query_params($dbconn, $query, [$username]);
}
