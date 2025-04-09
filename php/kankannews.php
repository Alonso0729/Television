<?php
error_reporting(0);
$id = $_GET['id']??'1';
/**
* 参数 id  字符串型
* 1======东方卫视
* 2=====新闻频道
* 4=====都市频道
* 5=====第一财经
* 9=====哈哈炫动
* 10====五星体育
* 11=====魔都眼
* 12=====新纪实
*
*/
$t = time();
$nonce = getnonce(8);
$ooo = "Api-Version=v1&channel_id={$id}&nonce={$nonce}&platform=pc×tamp={$t}&version=2.23.0&28c8edde3d61a0411511d3b1866f0636" ;

$sign = md5(md5($ooo));

$h = array(
    "api-version: v1",
    "nonce:$nonce",
    "m-uuid: L0IeLeKpqJPOqrFNNAK_k",
    "platform:pc",
    "version:2.23.0",
    "timestamp:$t",
    "referer: https://live.kankanews.com/",
    "sign:$sign",
    "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "channel_id:$id",
    "referer: https://live.kankanews.com/"
);

$apiret = get("https://kapi.kankanews.com/content/pc/tv/channel/detail?channel_id=$id",$h);

$json = json_decode($apiret) -> result -> live_address;
$decrypted= fe($json);

if($id=='shds1'||$id=='hhxd') {
    $ret = m3u8($decrypted);
    //echo $ret;
$playurl = strstr($ret,'https');
    header('location:'.$playurl);
    //echo $playurl;
} else {
    $burl =  dirname($decrypted).'/';
    $playurl = preg_replace("/(.*?.ts)/i",$burl."$1",m3u8($decrypted));
    header('Content-Type: application/vnd.apple.mpegurl');
    header('location:'.$playurl);
    print_r($playurl);
}
function get($url,$header){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_REFERER, 'https://live.kankanews.com/');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    $d = curl_exec($ch);
    curl_close($ch);
    return $d;
}
function m3u8($url){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_REFERER, 'https://live.kankanews.com/');
    $d = curl_exec($ch);
    curl_close($ch);
    return $d;
}
function getnonce($length) {
    $base36 = base_convert(mt_rand()/mt_getrandmax(), 10, 36);
    return substr($base36, -$length);
}

function he($e) {
    $e = str_replace(array("\r", "\n"), "", $e);
    preg_match_all('/([\da-fA-F]{2}) ?/', $e, $matches);
    $hexArray = $matches[0];
    $n = '';
    foreach ($hexArray as $hex) {
        $n .= chr(hexdec(trim($hex)));
    }
    return base64_encode($n);
}

function fe($e) {
    $decoded = base64_decode($e);
    $hexString = '';
    for ($i = 0; $i < strlen($decoded); $i++) {
        $char = $decoded[$i];
        $hex = strtoupper(dechex(ord($char)));
        $hexString .= str_pad($hex, 2, '0', STR_PAD_LEFT);
    }
    return jm(he(substr($hexString, 0, 256))).jm(he(substr($hexString, 256, 256))).jm(he(substr($hexString, 512, 256))).jm(he(substr($hexString, 768, 256))).jm(he(substr($hexString, 1024, 256)));
}
function jm($encrypted){
    $public_key = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDP5hzPUW5RFeE2xBT1ERB3hHZI
Votn/qatWhgc1eZof09qKjElFN6Nma461ZAwGpX4aezKP8Adh4WJj4u2O54xCXDt
wzKRqZO2oNZkuNmF2Va8kLgiEQAAcxYc8JgTN+uQQNpsep4n/o1sArTJooZIF17E
tSqSgXDcJ7yDj5rc7wIDAQAB
-----END PUBLIC KEY-----';
    $pu_key = openssl_pkey_get_public($public_key);
    openssl_public_decrypt(base64_decode($encrypted),$decrypted,$pu_key);
    return $decrypted;
}

?>