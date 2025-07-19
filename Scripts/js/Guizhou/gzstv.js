function main(item) {
    const id = item.id || 'ch01';
    const url = `https://api.gzstv.com/v1/tv/${id}`;
    const res = ku9.request(url);
    const data = JSON.parse(res.body);
    const m3u8 = data.stream_url;
    return { url: m3u8 };
}