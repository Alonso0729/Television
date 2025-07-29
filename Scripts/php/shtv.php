<?php
//https://weixinpay.bestv.cn/pay/smg_gongzhonghao_h5/index.html#/home
error_reporting(0);
$id = isset($_GET['id'])?$_GET['id']:'dfws';
$n = [
'dfws' => 22, //东方卫视
'xwzh' => 20, //上海新闻综合
'xjs' => 1600, //新纪实
'mdy' => 1601, //魔都眼
'ly' => 1745, //乐游
'dycj' => 21, //第一财经
'ds' => 18, //上海都市
'wxty' => 1605, //五星体育
];
$url = "https://bp-api.bestv.cn/cms/api/live/channels";
$post = '{}';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-type: application/json']);
$d = curl_exec($ch);
curl_close($ch);
$p = json_decode($d, 1);
foreach($p['dt'] as $k){
   if($n[$id] == $k['id']) $playurl = $k['channelUrl'];
   }
header("location:". $playurl);
//print_r($playurl);
?>