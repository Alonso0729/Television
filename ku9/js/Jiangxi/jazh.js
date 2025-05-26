//吉安TV
function main(item) {
    const id = item.id || 'jazh';
    const n = { 
        'jazh' : 2, //吉安综合频道
        'jagg' : 3, //吉安公共频道
        'jagb' : 8, //吉安综合广播
        'jajt' : 9, //吉安交通广播
    }; 
    const url = 'https://www.ijatv.com/m2o/channel/channel_info.php?id=' + n[id];
    const res = ku9.request(url);
    const data = JSON.parse(res.body);
    const playurl = data[0].channel_stream[0].m3u8; 
    return { url: playurl };
}