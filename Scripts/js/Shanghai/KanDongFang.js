function main(item) {
    var id = item.id || 'dfws';
    const channelMap = {
        'dfws': 2030,    // 东方卫视
        'xwzh': 20,    // 上海新闻综合
        'xjs': 1600,   // 新纪实
        'mdy': 1601,   // 魔都眼
        'ash': 2029,    // 爱上海
        'dycj': 21,    // 第一财经
        'shds': 18,      // 上海都市
        'wxty': 1605   // 五星体育
    };
    const apiUrl = "https://bp-api.bestv.cn/cms/api/live/channels";
    const requestConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: "{}"
    };
    let res = ku9.request(apiUrl, requestConfig.method, requestConfig.headers, requestConfig.body);
    if (!res || !res.body) {
        return { error: "请求失败" };
    }
    const responseData = JSON.parse(res.body);
    const channelList = responseData.dt || [];
    const targetChannelId = channelMap[id];
    const targetChannel = channelList.find(channel => channel.id === targetChannelId);
    return targetChannel 
        ? { url: targetChannel.channelUrl } 
        : { error: "未找到对应的频道" };
}
