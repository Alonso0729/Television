//酷9群153686431
//更多JS请加入酷9更新群424765458
//酷9群690022129
//关注公共号❤️❤️：AI科技生活

function main(item) {
    let url = item["url"];
    let id = ku9.getQuery( url,  "id" );
    
    n ={
     'ssxwzh':'395fa76975f92c603ffd04561ea125fd',//嵊泗新闻综合
 'ptxwzh':'01a8a217f622f6c0222ed8e673e87eb7',//普陀新闻综合
    }
    const jsonUrl = `https://aikanvod.miguvideo.com/video/p/live.jsp?user=guest&channelcode=${n[id]}&isEncrypt=1`;
    const headers = {
    'Content-Type': 'application/vnd.apple.mpegURL'
    };
let playData =  ku9.get(jsonUrl, JSON.stringify(headers));
    let regex = /<source src="(.*?)"/;
    let match = playData["match"](regex);
    let finalUrl = match[1];
    return JSON["stringify"]({
        url: finalUrl,headers:headers
    })
}