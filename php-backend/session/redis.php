<?php


$redis_host = getenv('REDIS_HOST');
$redis_port = getenv('REDIS_PORT');

$redis = new Redis();
$redis->connect($redis_host, $redis_port);
