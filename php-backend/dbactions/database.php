<?php

require 'vendor/autoload.php';

use Ramsey\Uuid\Uuid;

$dbhost = getenv('DATABASE_HOST');
$dbname = getenv('DATABASE_NAME');
$dbuser = getenv('DATABASE_USER');
$dbpass = getenv('DATABASE_PASSWORD');

$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
    or die('Could not connect: ' . pg_last_error());

// function check_unique_username($username) {
//     $result = get_user_by_name($username);
//     $rows = pg_num_rows($result);
//     return $rows == 0;
// }

// function create_user($username, $password) {
//     global $dbconn;
//     $user_id = Uuid::uuid4();
//     $query = "INSERT INTO users (user_id, username, password) VALUES ($1, $2, $3);";
//     $result = pg_query_params($dbconn, $query, [$user_id, $username, $password]);

//     if (!$result) {
//         // Handle the database error
//         die('Error creating user: ' . pg_last_error());
//     }
// }

// function get_user_by_name($username) {
//     global $dbconn;
//     $query = "SELECT * FROM users WHERE username = $1;";
//     return pg_query_params($dbconn, $query, [$username]);
// }