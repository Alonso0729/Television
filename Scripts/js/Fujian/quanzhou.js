function main(item) {
    let url = item["url"];
    let id = ku9.getQuery(url, "id") || 'qzzh'; // 获取id参数，默认'qzzh'
    
    // 频道映射表
    const n = {
        'qzzh': 'wq95wqbDnMKyd8KiwqzChnt0w5nChcKowoHCoQ/stream_name/news.html',
        'qzmny': 'wq95wqbDnMKyd8KiwqzChnt0w5nChcKofcKh/stream_name/mny.html'
    };

    // 构造请求URL
    const mediaId = n[id] || n['qzzh']; // 获取媒体ID，默认泉州新闻综合
    const apiUrl = 'https://control-center.qztv.cn/index/Medias/index/media_id/' + mediaId;
    
    // 设置请求头
    const headers = {
        'Referer': 'https://control-center.qztv.cn/',
        'User-Agent': 'Mozilla/5.0'
    };

    try {
        // 发送GET请求
        const response = ku9.get(apiUrl, JSON.stringify(headers));
        
        // 使用正则提取m3u8地址 
        const pattern = /urls\s*=\s*"([^"]+)"/;
        const match = response.match(pattern);
        
        if (!match || !match[1]) {
            return JSON.stringify({ error: "未找到直播地址" });
        }
const headers2 = {
'Host':'live.qztv.cn',
        'Referer': apiUrl,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HMA-AL00 Build/HUAWEIHMA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 Mobile Safari/537.36'
    };
        let liveStreamUrl = match[1];
        return JSON.stringify({ url: liveStreamUrl ,headers:headers2});
        
    } catch (e) {
        return JSON.stringify({ error: "请求失败：" + e.message });
    }
}