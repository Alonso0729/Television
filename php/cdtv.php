<?php
error_reporting(0);
$id = isset($_GET['id']) ? $_GET['id'] : 'xwpd';
$n = [
  'xwpd' => 1, //成都新闻频道
  'jjpd' => 2, //成都经济频道
  'shpd' => 3, //成都生活频道
  'yspd' => 45, //成都影视频道
  'ggpd' => 5, //成都公共频道
  'sepd' => 6, //成都少儿频道
  'rcxf' => 15, //成都蓉城先锋
] ;
$url="http://mob.api.cditv.cn/show/192-" . $n[$id] . ".html";
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
$re = curl_exec($ch);
curl_close($ch);
$obj = json_decode($re);
$m3u8=$obj->data->android_HDlive_url;
$m3u8=str_replace('http://','https://',$m3u8);
header('Location:'.$m3u8);
?>