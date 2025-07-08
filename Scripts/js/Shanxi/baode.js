///酷9群153686431
//更多JS请加入酷9更新群424765458
//酷9群690022129
//关注公共号❤️❤️：AI科技生活
function main(item) {
    let url = item["url"];
    let id = ku9.getQuery( url,  "id" );
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HMA-AL00 Build/HUAWEIHMA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.93 Mobile Safari/537.36'
    };
    let playData = ku9.get(id, JSON.stringify(headers)).replace(/\\/g, '');
 let regex = /"channelLiveUrl":"(https:\/\/.+?)"/;
    let match = playData.match(regex);
    let finalUrl = match[1];
    return JSON.stringify({
        url: finalUrl,headers:headers
    });
}
