function main(item) {
    const apiUrl = "https://srv-news.hkatv.vip/TVHandler/GetTV";
    const postBody = JSON.stringify({
        Offset: 1,
        Limit: 100,
        Conditions: { Status: 2, Aes: 1 }
    });
    const headers = {
        'Content-Type': 'application/json'
    };
    const resText = ku9.post(apiUrl, headers, postBody);
    const data = JSON.parse(resText);
    const encryptedStr = data.TVList[3].SourceURL;
    const key = "4kqvNg8LyIe1WQTs";
    const iv = "0000000000".padEnd(16, "0");          
    const aesType = "AES-128-CBC";
    const decrypted = ku9.opensslDecrypt(encryptedStr, aesType, key, 0, iv);
    const query = decrypted.split("?")[1];
    const playUrl = "https://al-pull.hkatv.vip/live/hkstv3.m3u8?" + query;
    return { url: playUrl };
}