<?php

require __DIR__ . '/database.php';

function get_category($category_id) {
    global $dbconn;
    $query = "SELECT * FROM categories WHERE category_id = $1;";
    return pg_query_params($dbconn, $query, [$category_id]);
}

function get_category_by_name($name) {
    global $dbconn;
    $query = "SELECT * FROM categories WHERE name = $1;";
    return pg_query_params($dbconn, $query, [$name]);
}


function get_categories() {
    global $dbconn;
    $query = "SELECT * FROM categories;";
    return pg_query_params($dbconn, $query, []);
}