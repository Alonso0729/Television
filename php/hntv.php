<?php
    $id = isset($_GET['id'])?$_GET['id']:'hnws';
    $n = [
         'hnws' => 145,//河南卫视
         'hnds' => 141,//河南都市
         'hnms' => 146,//河南民生
         'hmfz' => 147,//河南法治
         'hndsj' => 148,//河南电视剧
         'hnxw' => 149,//河南新闻
         'htgw' => 150,//欢腾购物
         'hngg' => 151,//河南公共
         'hnxc' => 152,//河南乡村
         'hngj' => 153,//河南国际
         'hnly' => 154,//河南梨园
         'wwbk' => 155,//文物宝库
         'wspd' => 156,//武术世界
         'jczy' => 157,//睛彩中原
         'ydxj' => 163,//移动戏曲
         'xsj' => 183,//象视界
         'gxpd' => 194,//国学频道
         ];
   	$url = "https://pubmod.hntv.tv/program/getAuth/live/class/xiaobeibi/11";
    $timestamp = time();
    $sign = hash('sha256', '6ca114a836ac7d73'.$timestamp);
    $headers_4 = ['timestamp: ' .$timestamp,'sign: '.$sign];
    $api_data=curl_get($url,array('SSL'=>1,'ADD_HEADER_ARRAY'=>$headers_4));
    $api_json = json_decode($api_data,true);
	foreach($api_json as $list){
        if($list['cid'] == $n[$id]) $playurl = $list['video_streams'][0];
        }
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