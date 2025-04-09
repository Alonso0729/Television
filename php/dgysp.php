<?php
//https://www.yangshipin.cn/#/tv/home
$id = isset($_GET['id'])?$_GET['id']:'cctv1';
$n = [
    //央视
    'cctv4k' => 2022575203,//cccv-4k
    'cctv8k' => 2020603421,//cccv-8k
    'cctv1' => 2022576803,//cccv1
    'cctv2' => 2022576703,//cccv2
    'cctv3' => 2022576503,//cccv3(vip)
    'cctv4' => 2022576603,//cccv4
    'cctv5' => 2022576403,//cccv5
    'cctv5p' => 2022576303,//cccv5+
    'cctv6' => 2022574304,//cccv6(vip)
    'cctv7' => 2022576203,//cccv7
    'cctv8' => 2022576103,//cccv8(vip)
    'cctv9' => 2022576003,//cccv9
    'cctv10' => 2022573003,//CCTV10
    'cctv11' => 2022575903,//CCTV11
    'cctv12' => 2022575803,//CCTV12
    'cctv13' => 2022575703,//CCTV13
    'cctv14' => 2022575603,//CCTV14
    'cctv15' => 2022575503,//CCTV15
    'cctv16' => 2022575403,//CCTV16
    'cctv16-4k' => 2022575103,//CCTV16-4k(vip)
    'cctv17' => 2022575303,//CCTV17
    //央视数字
    'bqkj' => 2012513403,//CCTV兵器科技(vip)
    'dyjc' => 2012514403,//CCTV第一剧场(vip)
    'hjjc' => 2012511203,//CCTV怀旧剧场(vip)
    'fyjc' => 2012513603,//CCTV风云剧场(vip)
    'fyyy' => 2012514103,//CCTV风云音乐(vip)
    'fyzq' => 2012514203,//CCTV风云足球(vip)
    'dszn' => 2012514003,//CCTV电视指南(vip)
    'nxss' => 2012513903,//CCTV女性时尚(vip)
    'whjp' => 2012513803,//CCTV央视文化精品(vip)
    'sjdl' => 2012513303,//CCTV世界地理(vip)
    'gefwq' => 2012512503,//CCTV高尔夫网球(vip)
    'ystq' => 2012513703,//CCTV央视台球(vip)
    'wsjk' => 2012513503,//CCTV卫生健康(vip)
    //央视国际
    'cgtn' => 2022575003,//CGTN
    'cgtnjl' => 2022574703,//CGTN纪录
    'cgtne' => 2022574803,//CGTN西语
    'cgtnf' => 2022574903,//CGTN法语
    'cgtna' => 2022574603,//CGTN阿语
    'cgtnr' => 2022574803,//CGTN俄语
    //卫视
    'bjws' => 2000272103,//北京卫视
    'dfws' => 2000292403,//东方卫视
    'tjws' => 2019927003, //天津卫视
    'cqws' => 2000297803,//重庆卫视
    'hljws' => 2000293903,//黑龙江卫视
    'lnws' => 2000281303,//辽宁卫视
    'hbws' => 2000293403,//河北卫视
    'sdws' => 2000294803,//山东卫视
    'ahws' => 2000298003,//安徽卫视
    'hnws' => 2000296103,//河南卫视
    'hubws' => 2000294503,//湖北卫视
    'hunws' => 2000296203,//湖南卫视
    'jxws' => 2000294103,//江西卫视
    'jsws' => 2000295603,//江苏卫视
    'zjws' => 2000295503,//浙江卫视
    'dnws' => 2000292503,//东南卫视
    'gdws' => 2000292703,//广东卫视
    'szws' => 2000292203,//深圳卫视
    'gxws' => 2000294203,//广西卫视
    'gzws' => 2000293303,//贵州卫视
    'scws' => 2000295003,//四川卫视
    'xjws' => 2019927403, //新疆卫视
    'hinws' => 2000291503,//海南卫视
    ];
$cnlid = $n[$id];
$guid = "lsvnggzr_uhi48nki26e";//随意字符或字符串
$salt = '0f$IVHi9Qno?G';
$platform = "5910204";
$key = hex2bin("48e5918a74ae21c972b90cce8af6c8be");
$iv = hex2bin("9a7e7d23610266b1d9fbf98581384d92");
$ts = time();
$el = "|{$cnlid}|{$ts}|mg3c3b04ba|V1.0.0|{$guid}|{$platform}|https://www.yangshipin.c|mozilla/5.0 (windows nt ||Mozilla|Netscape|Win32|";
// 生成随机字符串并存储在变量中
function nu($t = 10) {
    $e = "ABCDEFGHIJKlMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    $r = strlen($e);
    $n = "";
    for ($i = 0; $i < $t; $i++) {
        $n .= $e[rand(0, $r - 1)];
    }
    return $n;
}
$randomString = nu(10);
//获取当前毫秒级别时间
$currentTimeMillis = round(microtime(true) * 1000);
$request_id = "999999".$randomString.$currentTimeMillis;

$len = strlen($el);
$xl = 0;
for($i=0;$i<$len;$i++){
    $xl = ($xl << 5) - $xl + ord($el[$i]);
    $xl &= $xl & 0xFFFFFFFF;
    }

$xl = ($xl > 2147483648) ? $xl - 4294967296 : $xl;

$el = '|'.$xl.$el;
$ckey = "--01".strtoupper(bin2hex(openssl_encrypt($el,"AES-128-CBC",$key,1,$iv)));

$params = [
        "adjust"=>1,
        "appVer"=>"V1.0.0",
        "app_version"=>"V1.0.0",
        "cKey"=>$ckey,
        "channel"=>"ysp_tx",
        "cmd"=>"2",
        "cnlid"=>"{$cnlid}",
        "defn"=>"fhd",
        "devid"=>"devid",
        "dtype"=>"1",
        "encryptVer"=>"8.1",
        "guid"=>$guid,
        "otype"=>"ojson",
        "platform"=>$platform,
        "rand_str"=>"{$ts}",
        "sphttps"=>"1",
        "stream"=>"2"
        ];

$sign = md5(http_build_query($params).$salt);
$params["signature"] = $sign;

$bstrURL = "https://player-api.yangshipin.cn/v1/player/get_live_info";
$headers = [
        "Content-Type: application/json",
        "Referer: https://www.yangshipin.cn/",
        "Cookie: guid={$guid};  versionName=99.99.99; versionCode=999999; vplatform=109; platformVersion=Chrome; deviceModel=94; updateProtocol=1; seqId=1; request-id={$request_id}",
        "Yspappid: 519748109",
        ];
$ch = curl_init($bstrURL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
curl_setopt($ch, CURLOPT_POST,1);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($params));
$data = curl_exec($ch);
// 关闭CURL会话
curl_close($ch);

$json = json_decode($data);
$live = $json->data->playurl;
$extended_param = $json->data->extended_param;
$chanllCode = json_decode($json->data->chanll)->code;
$decodeChanll = base64_decode($chanllCode);
// 定义正则表达式来匹配des_key和des_iv的赋值语句
$patternKey = '/var des_key = "(.*?)";/';
$patternIv = '/var des_iv = "(.*?)";/';
// 初始化变量用于存储提取的值
$desKey = "";
$desIv = "";
// 使用正则表达式提取des_key的值
if (preg_match($patternKey, $decodeChanll, $matchesKey)) {
    $desKey = $matchesKey[1];
}
// 使用正则表达式提取des_iv的值
if (preg_match($patternIv, $decodeChanll, $matchesIv)) {
    $desIv = $matchesIv[1];
}
//定义待加密数组
$jsonString = '{"mver":"1","subver":"1.2","host":"www.yangshipin.cn/#/tv/home?pid=","referer":"","canvas":"YSPANGLE(Intel,Intel(R)Iris(R)XeGraphics(0x000046A6)Direct3D11vs_5_0ps_5_0,D3D11)"}';
$data = json_decode($jsonString, true);
function encryptData($data,$desKey,$desIv) {
    $plaintext = json_encode($data,JSON_UNESCAPED_SLASHES);
    $key = base64_decode($desKey);
    $iv = base64_decode($desIv);
    $encrypted = openssl_encrypt($plaintext, 'des-ede3-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return strtoupper(bin2hex($encrypted));
}
//定义变量保存revoi值
$encryptedHex = encryptData($data,$desKey,$desIv);
$burl = explode("{$n[$id]}.m3u8",$live)[0];
$d = file_get_contents($live);
$pattern = '/\.m3u8(.*)/';
preg_match($pattern, $live, $matches);
$str = preg_replace("/(.*?.ts)/", $burl."$1$matches[1]&revoi=$encryptedHex$extended_param",$d);
$filteredContent = preg_replace('/outlivecloud-cdn.ysp.cctv.cn/', 'hlslive-tx-cdn.ysp.cctv.cn',$str);
header("Content-Type: application/vnd.apple.mpegurl");
header("Content-Disposition: inline; filename=index.m3u8");
echo $filteredContent;

?>