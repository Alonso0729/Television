function main(item) {
 
  // 获取频道ID参数
  const channelId = ku9.getQuery(item.url, "id") || "TNT_Sports_1";
  
  // 直播流URL
  const streamUrl = `https://smartstream.lioncdn.net/${channelId}/index.m3u8`;
  
  // 返回结果
  return JSON.stringify({
    url: streamUrl,
    headers: {
      "Referer": "https://p.lioncdn.net/"
    }
  });
}