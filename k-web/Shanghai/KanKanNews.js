const PREFIX = "KANKAN_"
const FIXED_SECRET = "28c8edde3d61a0411511d3b1866f0636"

function debugLog(data, debug = false) {
    // if (!debug) return;
    // ku9.request("http://192.168.3.214:8901/play/log", "POST", {"Content-Type": "application/json"},
    //     JSON.stringify(data))
}

function atobPolyfill(base64) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const lookup = Object.fromEntries([...chars].map((c, i) => [c, i]));

    base64 = base64.replace(/=+$/, ''); // 去掉填充字符
    let buffer = '';
    let bits = 0;
    let value = 0;

    for (let i = 0; i < base64.length; i++) {
        const c = base64[i];
        if (!(c in lookup)) throw new Error(`Invalid character '${c}' in base64 string`);

        value = (value << 6) | lookup[c];
        bits += 6;

        if (bits >= 8) {
            bits -= 8;
            const byte = (value >> bits) & 0xFF;
            buffer += String.fromCharCode(byte);
        }
    }

    return buffer;
}

function btoaPolyfill(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let output = '';
    let i = 0;

    while (i < str.length) {
        const byte1 = str.charCodeAt(i++) & 0xFF;
        const byte2 = i < str.length ? str.charCodeAt(i++) & 0xFF : NaN;
        const byte3 = i < str.length ? str.charCodeAt(i++) & 0xFF : NaN;

        const triplet = (byte1 << 16) | ((byte2 || 0) << 8) | (byte3 || 0);

        output += chars[(triplet >> 18) & 0x3F];
        output += chars[(triplet >> 12) & 0x3F];
        output += isNaN(byte2) ? '=' : chars[(triplet >> 6) & 0x3F];
        output += isNaN(byte3) ? '=' : chars[triplet & 0x3F];
    }

    return output;
}


function extractBaseUrl(linkage) {
    const lastSlashIndex = linkage.lastIndexOf("/");
    return linkage.substring(0, lastSlashIndex);
}

function buildAbsoluteUrl(baseUrl, m3u8Data) {
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

    return m3u8Data
        .split('\n')
        .map(line => {
            if (line.startsWith('#') || line.trim() === '') {
                return line;
            }
            return normalizedBaseUrl + line;
        })
        .join('\n');
}

function getM3u8Linkage(id) {
    let ret = ku9.getCache(PREFIX + id)
    if (!!ret) return ret
    ret = fetchM3u8Linkage(id)
    ku9.setCache(PREFIX + id, ret, 1000 * 60 * 25)
    return ret
}

function fetchM3u8Linkage(id) {
    let headers = {
        "channel_id": id,
        "Api-Version": "v1",
        "platform": "pc",
        "version": "2.23.0",
        "timestamp": nowSecond(),
        "nonce": Math.random().toString(36).slice(-8),
    }

    const sortedKeys = Object.keys(headers).sort();

    // 2. 遍历排序后的 keys，拼接成 key=value& 格式
    const signData = sortedKeys
        .map(key => `${key}=${headers[key]}`)
        .join('&') + "&" + FIXED_SECRET;

    const sign = ku9.md5(ku9.md5(signData))

    headers.sign = sign
    let mUUID = ku9.getCache(PREFIX + "mUUID");
    if (!mUUID) {
        mUUID = "D-8XPI8xaE6RMX4NZsu3e"
        ku9.setCache(PREFIX + "mUUID", mUUID, 1000 * 60 * 30)
    }
    headers["M-Uuid"] = mUUID;
    debugLog({mUUID}, true)
    headers["Accept"] = "application/json"

    debugLog({headers}, true)

    const channelResultStr = ku9.request(`https://kapi.kankanews.com/content/pc/tv/channel/detail?channel_id=${id}`,
        "GET", headers).body
    const channelResult = JSON.parse(channelResultStr)
    const encodedData = channelResult.result.live_address
    debugLog({encodedData}, true)

    return descryptSegament(encodedData);

}

function descryptSegament(encodedData) {
    const jsencrypt = require("jsencrypt");
    const verify = new jsencrypt();
    verify.setPublicKey("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDP5hzPUW5RFeE2xBT1ERB3hHZI\nVotn/qatWhgc1eZof09qKjElFN6Nma461ZAwGpX4aezKP8Adh4WJj4u2O54xCXDt\nwzKRqZO2oNZkuNmF2Va8kLgiEQAAcxYc8JgTN+uQQNpsep4n/o1sArTJooZIF17E\ntSqSgXDcJ7yDj5rc7wIDAQAB\n-----END PUBLIC KEY-----");

    const wrapperData = encodedData.replace(/\\/g, '');

    let ret = "";
    try {
        let r = hexDecode(wrapperData);
        let n = 0;
        debugLog({r}, true)
        do {
            let o = r.slice(n, n + 256);

            n = n + 256;
            ret += verify.decrypt(hexEncode(o))

        } while (n < r.length)
    } catch (e) {
    }

    debugLog({"url": ret}, true)
    return ret

}


function hexEncode(e) {
    let t = e.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")
        , n = String.fromCharCode.apply(null, t);

    return btoaPolyfill(n)
}


function hexDecode(e) {
    const decodeStr = atobPolyfill(e)
    return decodeStr.split("").map((function (e) {
            return ("0" + e.charCodeAt(0).toString(16)).slice(-2)
        }
    )).join("").toUpperCase()
}


function nowSecond() {
    return Math.floor(Date.now() / 1000);
}

function fetchM3U8Data(firstM3u8Url) {
    const m3u8Data = ku9.request(firstM3u8Url, "GET", {Referer: 'https://live.kankanews.com/'}).body
    debugLog({m3u8Data}, true)
    let baseUrl = extractBaseUrl(firstM3u8Url)

    if (m3u8Data.includes("EXT-X-STREAM-INF")) {
        const lines = m3u8Data.trim().split('\n');
        const lastLine = lines[lines.length - 1].trim();

        // 若是相对路径则拼接成绝对路径
        const finalUrl = lastLine;
        debugLog({finalUrl}, true)
        baseUrl = extractBaseUrl(finalUrl)
        const dataM3u8V2 = ku9.request(finalUrl, "GET", {Referer: 'https://live.kankanews.com/'}).body
        debugLog({dataLink: dataM3u8V2}, true)
        return buildAbsoluteUrl(baseUrl, dataM3u8V2);
    }

    return buildAbsoluteUrl(baseUrl, m3u8Data);
}

function main(item) {
    const debug = item.debug ? Boolean(item.debug) : false

    const m3u8Link = getM3u8Linkage(item.id);
    debugLog({"ret1": m3u8Link}, debug)
    return {
        m3u8: fetchM3U8Data(m3u8Link),
        headers: {Referer: 'https://live.kankanews.com/', Origin: "https://live.kankanews.com"}
    };
}