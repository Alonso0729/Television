//酷9群153686431
//更多JS请加入酷9更新群424765458
//酷9群690022129
//关注公共号❤️❤️：AI科技生活

function main(item) {
    let url = item["url"];
    let id = ku9.getQuery( url,  "id" );
    const jsonUrl = "http://p.ytelc.com/169l/zj/ningbo.php?id=" + id;
    const headers = {};
    let playData = ku9.get(jsonUrl, JSON.stringify(headers));
    let regex = /<source src="(http:\/\/.+?)"/;
    let match = playData["match"](regex);
    let finalUrl = match[1];
    return JSON["stringify"]({
        url: finalUrl
    })
}