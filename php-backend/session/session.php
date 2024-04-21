<?php

require 'vendor/autoload.php';

require __DIR__ . '/redis.php';

use Ramsey\Uuid\Uuid;

function new_session($user_id) {
    global $redis;

    $new_id = Uuid::uuid4();
    $redis->set($new_id, $user_id);

    return $new_id;
}

function terminate_session($session_id) {
    global $redis;

    $redis->del($session_id);
}

function get_user_from_session($session_id) {
    global $redis;

    return $redis->get($session_id);
}
