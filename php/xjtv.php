<?php
error_reporting(0);
$n = [
     'xjws' => 1,   // 新疆卫视
     'xjwyzh' => 3,   // 新疆维语新闻综合
     'xjhyzh' => 4,   // 新疆哈语新闻综合
     'xjzy' => 16,  // 新疆综艺
     'xjwyys' => 17,  // 新疆维语影视
     'xjjjsh' => 18,  // 新疆经济生活
     'xjhyzy' => 19,  // 新疆哈语综艺
     'xjwyjjsh' => 20,  // 新疆维语经济生活
     'xjtyjk' => 21,  // 新疆体育健康
     'xjxxfw' => 22,  // 新疆信息服务
     'xjse' => 23   // 新疆少儿频道
     ];
$id = $_GET["id"] ?? "xjws";

$t = round(microtime(true) * 1000);
$sign = md5('@#@$AXdm123%)(ds'.$t.'api/TVLiveV100/TVChannelList');
$url = "https://slstapi.xjtvs.com.cn/api/TVLiveV100/TVChannelList?type=1&stamp={$t}&sign={$sign}";
$data = json_decode(file_get_contents($url),1)['data'];
foreach($data as $v){
   if($n[$id]==$v['Id']) $playurl = $v['PlayStreamUrl'];
   }
header('location:'.$playurl);
//echo $playurl;
?>