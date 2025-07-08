function main(item) {
    let id = item.id || "11342412"; 
    let cid = id[0];
    if (/^[a-zA-Z]+$/.test(cid)){ id = id.slice(1);  }    
    if (cid == 'U'){ return getDouyu(id); }
    
    const c = ["tx", "hw", "hs", "hy"];
    const n = [0, 1, 2, 3];
    const c_rand = c[Math.floor(Math.random() * c.length)];
    let n_rand = n[Math.floor(Math.random() * n.length)];

    const roomurl = `https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=${id}`;
    const res = ku9.request(roomurl, "GET");    
    const json = JSON.parse(res.body);
    
    //id错误或未开播返回的视频
    let errA = 'https://cdn12.yzzy-tv-cdn.com/20221209/8943_e3bd0850/index.m3u8'; //中南海保镖  
    let errB = 'https://vip.ffzy-play6.com/20221019/118_1367b8f6/index.m3u8'; //卧虎藏龙
    
    if (json.status !== 200) return { url: errB };//房间信息无效
    if (json.data.realLiveStatus == 'OFF') return { url: errA };//房间未直播

    const data = json.data;
    const uid = data.profileInfo?.uid || "";
    const streamname = data.stream?.baseSteamInfoList?.[0]?.sStreamName || "";
    let burl = "";
    let uri = "";

    do {
        const urlObj = data.stream?.flv?.multiLine?.[n_rand]?.url;
        if (!urlObj) continue;
        uri = ku9.Uri( urlObj );        
        burl = uri.Scheme + '://' + uri.Host + uri.FullPath;  
        n_rand = n[Math.floor(Math.random() * n.length)];
    } while (!burl);

    const seqid = String(parseInt(uid) + Date.now());
    const ctype = "tars_wap";
    const t = "102";
    const ss = ku9.md5(`${seqid}|${ctype}|${t}`);
    const wsTime = Math.floor(Date.now() / 1000 + 21600).toString(16);
    const fm = `DWq8BcJ3h6DJt6TY_${uid}_${streamname}_${ss}_${wsTime}`;
    const wsSecret = ku9.md5(fm);

    const params = [
        `wsSecret=${wsSecret}`,
        `wsTime=${wsTime}`,
        `ctype=${ctype}`,
        `seqid=${seqid}`,
        `uid=${uid}`,
        `fs=bgct`,
        `ver=1`,
        `t=${t}`
    ].join("&");    

    const playurl = `${burl}?${params}`;
    return { url: playurl };
}

function getDouyu(id) {
    let apiUrl = 'https://wxapp.douyucdn.cn/api/nc/stream/roomPlayer';    
    let postData = "room_id=" + id + "&big_ct=cph-androidmpro&did=10000000000000000000000000001501&mt=2&rate=0";    
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };    
    let res = ku9.request(apiUrl, "POST", headers, postData);    
    let jsonData = JSON.parse(res.body);
    
     //id错误或未开播返回的视频
    let errC = 'https://vip.ffzy-play7.com/20221115/4617_be0491ea/index.m3u8'; //英雄本色1
    
    if (jsonData.error !== 0) return { url: errC };//房间信息无效 或未开播    
    let playurl = jsonData.data.live_url;
    return { url: playurl };
	
	//食用方法：
	//虎牙：http://A/ku9/js/XXX.js?id=11342412
	//斗鱼：http://A/ku9/js/XXX.js?id=U4332 即：输入斗鱼id 时，在前面加一个 大写 的字母 U
}
