function main(item) {
    const id = item.id || 'hljws';
    const n = {
		'hljws': 'hljws_own',  // 黑龙江卫视
		'hljys': 'hljys_hd', // 黑龙江影视
		'hljwt': 'hljwy_hd',   // 黑龙江文体
		'hljds': 'dushi_hd',  // 黑龙江都市
		'hljxwfz': 'hljxw_hd', // 黑龙江新闻法治
		'hljnykj': 'hljgg_hd',   // 黑龙江农业科教
		'hljse': 'hljse_hd'  // 黑龙江少儿
    };
    const targetUrl = `https://idclive.hljtv.com:4430/live/${n[id]}.m3u8`;
    return JSON.stringify({
        url: targetUrl 
    });
}