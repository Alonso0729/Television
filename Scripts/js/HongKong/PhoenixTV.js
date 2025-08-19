function main(item) {
    const id = item.id || 'fhzw';
    const n = {
        'fhzw': 'cn',  // 凤凰中文
        'fhzx': 'info', // 凤凰资讯
        'fhhk': 'hk'   // 凤凰香港
    };
    const token = "id=cn&prefix=86&phone=13256889895&pwd=Fan2345678";//备用号码1:phone=13389247903&pwd=Llxxcc198,备用号码2:phone=13955036885&pwd=make123456MAKE
    const targetUrl = `http://tv.groupshare.com.cn/fhtv?id=${n[id]}&token=${token}`;
    return JSON.stringify({
        url: targetUrl
    });
}