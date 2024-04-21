<?php

require 'vendor/autoload.php';

// echo 'Goodbye World!' . "\n";
echo
'<div>
    <ul>
        <li>DB_USER: ' . getenv('DATABASE_USER') . '</li>
        <li>DB_HOST: ' .  getenv('DATABASE_HOST') . '</li>
        <li>DB_PORT: ' . getenv('DATABASE_PORT') . '</li>
        <li>DB_NAME: ' . getenv('DATABASE_NAME') . '</li>
        <li>DB_PASSWD: ' . getenv('DATABASE_PASSWORD') . '</li>
    </ul>
</div>';

$dbhost = 'database';
$dbname = 'demo';
$dbuser = 'user';
$dbpass = 'admin';

$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
    or die('Could not connect: ' . pg_last_error());

$query = 'SELECT VERSION();';
$result = pg_query($dbconn, $query) or die('Error message: ' . pg_last_error());

$res = pg_fetch_all($result);
print_r($result);
echo '<br>';

echo "version: ";
print_r($res[0]['version']);
echo '<br>';

echo "row count: ";
print_r(pg_num_rows($result));
echo '<br>';

pg_free_result($result);
pg_close($dbconn);
?>
