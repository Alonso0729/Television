<?php
//Written by Wheiss
error_reporting(0);
date_default_timezone_set("PRC");
$n = [
        'CCTV1HD'=>[10.240152,154973768],//CCTV1
        'CCTV2HD'=>[10.240202,155038711],//CCTV2
        'CCTV3HD'=>[10.240156,154985113],//CCTV3
        'CCTV4HD'=>[10.240059,155057518],//CCTV4
        'CCTV5HD'=>[10.24,154986064],//CCTV5
        'CCTV6HD'=>[10.239964,154987241],//CCTV6
        'CCTV7HD'=>[10.239988,155060464],//CCTV7
        'CCTV8HD'=>[10.239988,154992377],//CCTV8
        'CCTV9HD'=>[10.240152,155049902],//CCTV9
        'CCTV10HD'=>[10.240023,155073161],//CCTV10
        'CCTV11'=>[10.240023,155009597],//CCTV11
        'CCTV12HD'=>[10.240059,155065271],//CCTV12
        'CCTV13'=>[10.239976,154948653],//CCTV13
        'CCTV14HD'=>[10.240086,155059647],//CCTV14
        'CCTV15'=>[10.240055,155073411],//CCTV15
        'CCTV16HD'=>[10.240011,159578126],//CCTV16
        'CCTV17HD'=>[10.240055,155058775],//CCTV17
        'CCTV5_HD'=>[9.964799,160086277],//CCTV5+
        'hnwsHD'=>[10.24,154956761],//湖南卫视
        'dfwsHD'=>[10.240011,155019898],//东方卫视
        'jswsHD'=>[10.240121,155044384],//江苏卫视
        'gdwsHD'=>[10.239914,155057552],//广东卫视
        'zjwsHD'=>[10.240127,155013961],//浙江卫视
        'bjwsHD'=>[10.239964,155025524],//北京卫视
        'szwsHD'=>[10.240109,155026045],//深圳卫视
        'tjwsHD'=>[10.240202,155142205],//天津卫视
        'sdwsHD'=>[10.240259,154991046],//山东卫视
        'ahwsHD'=>[10.240067,155061363],//安徽卫视
        'jxwsHD'=>[10.240535,154916487],//江西卫视
        'hljwsHD'=>[10.240168,155145383],//黑龙江卫视
        'scwsHD'=>[10.240055,155072063],//四川卫视
        'gzws'=>[10.240219,155069097],//贵州卫视
        'hubwsHD'=>[10.239976,155072649],//湖北卫视
        'lnwsHD'=>[10.24,155152121],//辽宁卫视
        'cqwsHD'=>[10.240059,155088203],//重庆卫视
        'dnwsHD'=>[10.239976,155075168],//东南卫视
        'jlwsHD'=>[10.240293,154922501],//吉林卫视
        'hebwsHD'=>[10.000115,159172346],//河北卫视
];
$ip = $_GET['ip']??'c3.cdn.hunancatv.com';
$id = $_GET['id']??'CCTV1HD';
if(!isset($n[$id])) die(header("HTTP/1.1 404"));
$cut = $n[$id][0];
$offset = $n[$id][1];
$now = time();
$url_pre = 'http://'.$ip.'/live/'.$id.'-';
$url_end = '-1-hls.ts';
$playseek = $_GET['playseek']??'';
$TARGETDURATION = intval($cut)+1;
#模式判断
if ($playseek) {//回放
        $t_arr = explode('-',$playseek);
        $start = floor(strtotime($t_arr[0])/$cut-$offset+4);
        $end = floor((strtotime($t_arr[1])+4)/$cut-$offset+4);
        $m3u8 = "#EXTM3U".PHP_EOL."#EXT-X-VERSION:3".PHP_EOL."#EXT-X-TARGETDURATION:$TARGETDURATION".PHP_EOL."#EXT-X-MEDIA-SEQUENCE:$start".PHP_EOL;
        for (; $start < $end; $start++) {
                $m3u8 .= "#EXTINF:$cut,".PHP_EOL.$url_pre.$start.$url_end.PHP_EOL;
        }
        $m3u8 .= "#EXT-X-ENDLIST";//结束标志
} else {//直播
        $start = floor($now/$cut-$offset);
        $m3u8 = "#EXTM3U".PHP_EOL."#EXT-X-VERSION:3".PHP_EOL."#EXT-X-TARGETDURATION:$TARGETDURATION".PHP_EOL."#EXT-X-MEDIA-SEQUENCE:$start".PHP_EOL;//前4行
        for ($i = 0; $i<3; $i++,$start++) {//后6行
                $m3u8 .= "#EXTINF:$cut,".PHP_EOL.$url_pre.$start.$url_end.PHP_EOL;
        }
}
header("Content-Type: application/vnd.apple.mpegURL");
header("Content-Disposition: inline; filename=$id.m3u8");
echo $m3u8;
exit;
?>