<?php
header('Content-Type: text/json;charset=utf-8');
error_reporting(0);
    $id = isset($_GET['id'])?$_GET['id']:'hbws';
    $n = [
         'hbws' => 0,//河北卫视
         'jjsh' => 1,//经济生活
         'nmpd' => 2,//农民频道
         'hbds' => 3,//河北都市
         'hbys' => 4,//河北影视剧
         'sekj' => 5,//少儿科教
         'hbgg' => 6,//河北公共
         'sjgw' => 7,//三佳购物
         ];
        if(empty($n[$id]))$n[$id]='3';
           $url = "https://api.cmc.hebtv.com/scms/api/com/article/getArticleList?catalogId=32557&siteId=1";
        $api_data = curl_get($url,array('SSL'=>1));
        $api_json = json_decode($api_data,true);
        $m3u8 = $api_json['returnData']['news'][$n[$id]]['liveVideo'][0]['formats'][0]['liveStream'];
        $liveKey = $api_json['returnData']['news'][$n[$id]]['appCustomParams']['movie']['liveKey'];
        $liveUri = $api_json['returnData']['news'][$n[$id]]['appCustomParams']['movie']['liveUri'];
    $t = time()+7200;
        $k = md5($liveUri.$liveKey.$t);
        $playurl = $m3u8."?t=".$t."&k=".$k;
    header("location:".$playurl);

function curl_get($url, $array=array()){
                $defaultOptions = array(
                        'IPHONE_UA'=>1,
                        'SSL'=>0,
                        'TOU'=>0,
                        'ADD_HEADER_ARRAY'=>0,
                        'POST'=>0,
                        'REFERER'=>0,
                        'USERAGENT'=>0,
                        'ARRAY'=>0,
                        'CURLOPT_FOLLOWLOCATION'=>0
                );
                $array = array_merge($defaultOptions, $array);
                $ch = curl_init($url);
                if($array['SSL']){
                        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
                }
                if ($array['IPHONE_UA'])
                {
                        curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16'));
                }
                if (is_array($array['ADD_HEADER_ARRAY']))
                {
                        curl_setopt($ch, CURLOPT_HTTPHEADER, $array['ADD_HEADER_ARRAY']);
                }
                if ($array['POST'])
                {
                        curl_setopt($ch, CURLOPT_POSTFIELDS, $array['POST']);
                }
                if ($array['REFERER'])
                {
                        curl_setopt($ch, CURLOPT_REFERER, $array['REFERER']);
                }
                if ($array['USERAGENT'])
                {
                        curl_setopt($ch, CURLOPT_USERAGENT, $array['USERAGENT']);
                }
                if($array['TOU']){
                        curl_setopt($ch, CURLOPT_HEADER, 1); //输出响应头
                }
                if ($array['CURLOPT_FOLLOWLOCATION'])
                {
                        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);//自动跟踪跳转的链接
                }
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $get_url = curl_exec($ch);
                if($array['ARRAY']){
                $get_url = curl_getinfo($ch);//输出数组
                }
                curl_close($ch);
                return $get_url;
        }        
?>