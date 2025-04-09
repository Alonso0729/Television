<?php
//常州tv
$id = !empty($_GET['id']) ? $_GET['id'] : 'czds';
$n = [
   'czzh' => 1, //常州综合
   'czds' => 2, //常州都市
   'czsh' => 3, //常州生活
   'czgg' => 4, //常州公共
];
$json = json_decode(file_get_contents("https://kcz.cztv.tv/api/v1/channel/tv"));  
header("Location: " .  $json->data->data[$n[$id]-1]->stream_url);
?>