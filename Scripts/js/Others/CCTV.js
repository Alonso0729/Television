const CryptoJS = require("crypto");
function main(item) {
    var id = item.id || 'cctv4k'; 
    var channelMap = {
        'cctv1': '11200132825562653886',
        'cctv2': '12030532124776958103',
        'cctv4': '10620168294224708952',
        'cctv7': '8516529981177953694',
        'cctv9': '7252237247689203957',
        'cctv10': '14589146016461298119',
        'cctv12': '13180385922471124325',
        'cctv13': '16265686808730585228',
        'cctv17': '4496917190172866934',
        'cctv4k': '2127841942201075403'
    }; 
    var articleId = channelMap[id] || channelMap['cctv4k'];
    var playUrl = getCCTVNEWSPlayUrl(articleId);
    if (playUrl && playUrl.indexOf('http') === 0) {
        return { url: playUrl };
    }
    return { url: '' };
}
function javaStringHashCode(str) {
    var h = 0;
    var len = str.length;
    for (var i = 0; i < len; i++) {
        h = (31 * h + str.charCodeAt(i)) | 0;
    }
    return h;
}
function generateRandomIMEI(length) {
    length = length || 15;
    var imei = '';
    
    for (var i = 0; i < length; i++) {
        imei += Math.floor(Math.random() * 10).toString();
    }
    return imei;
}
function generateUTDID() {
    var timestamp = Math.floor(Date.now() / 1000);
    var randomInt = Math.floor(Math.random() * 4294967296) - 2147483648;
    var version = 0x0300;
    var imei = generateRandomIMEI();
    var imeiHash = javaStringHashCode(imei);
    var timestampHex = toHex32(timestamp);
    var randomHex = toHex32(randomInt);
    var versionHex = toHex16(version);
    var imeiHashHex = toHex32(imeiHash);
    var dataToSign = timestampHex + randomHex + versionHex + imeiHashHex;
    var hmacKey = 'd6fc3a4a06adbde89223bvefedc24fecde188aaa9161';
    var dataBytes = hexToBytes(dataToSign);
    var dataWordArray = CryptoJS.lib.WordArray.create(dataBytes);
    var hmacResult = CryptoJS.HmacSHA1(dataWordArray, hmacKey);
    var hmacBase64 = hmacResult.toString(CryptoJS.enc.Base64);
    var signatureHash = javaStringHashCode(hmacBase64);
    var signatureHashHex = toHex32(signatureHash);
    var rawUtdid = dataToSign + signatureHashHex;
    var rawBytes = hexToBytes(rawUtdid);
    var binary = '';
    for (var i = 0; i < rawBytes.length; i++) {
        binary += String.fromCharCode(rawBytes[i]);
    }
    return ku9.encodeBase64(binary);
}
function toHex32(num) {
    var hex = (num >>> 0).toString(16);
    return ('00000000' + hex).slice(-8);
}
function toHex16(num) {
    var hex = (num & 0xFFFF).toString(16);
    return ('0000' + hex).slice(-4);
}
function hexToBytes(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}
function getCCTVNEWSPlayUrl(articleId) {
    var APP_KEY = '20000008';
    var APP_VER = '10.9.0';
    var FEATURES = '27';
    var HMAC_KEY = '3df8017cb9367f5997ab9e4b19c1e028';
    var UTDID = generateUTDID();
    var TTID = '702006@CCNews_Android_10.9.0';
    var t = Math.floor(Date.now() / 1000).toString();
    var urlpath = 'articleId=' + articleId + '&channelId=1212&scene_type=6';
    var md5Content = ku9.md5(urlpath);
    var msg = UTDID + '&&&' + APP_KEY + '&' + md5Content + '&' + t +
              '&emas.feed.article.live.detail&1.0.0&&' + TTID + '&&&' + FEATURES;
    var sign = CryptoJS.HmacSHA256(msg, HMAC_KEY).toString();
    var url = 'https://emas-api.cctvnews.cctv.com/gw/emas.feed.article.live.detail/1.0.0/?' + urlpath;
    var headers = {
        'appVersion': APP_VER,
        'x-emas-gw-utdid': encodeURIComponent(UTDID),
        'utdid': UTDID,
        'x-emas-gw-ttid': encodeURIComponent(TTID),
        'x-emas-gw-sign': sign,
        'x-emas-gw-t': t,
        'ua': 'Android/13 (HUAWEI cn.cntvnews;zh_CN) App/4.5.15 AliApp() HONOR-400/11358758 Channel/702006 language/zh-CN Device/CCNews CCNews/' + APP_VER,
        'x-emas-gw-features': FEATURES,
        'x-emas-gw-auth-ticket': '20000008',
        'x-emas-gw-appkey': APP_KEY,
        'x-emas-gw-pv': '6.1',
        'timezone': '28800',
        'osVersion': '13',
        'User-Agent': 'MTOPSDK%2F3.0.6+%28Android%3B13%3BHUAWEI%3BHONOR-400%29',
        'Connection': 'keep-alive',
        'Host': 'emas-api.cctvnews.cctv.com'
    };
    try {
        var res = ku9.request(url, 'GET', headers);
        var outer = JSON.parse(res.body);
        var decoded = ku9.decodeBase64(outer.response);
        var inner = JSON.parse(decoded);
        var liveRoom = inner.data.live_room;
        var liveCameraList = liveRoom.liveCameraList;
        for (var i = 0; i < liveCameraList.length; i++) {
            var cam = liveCameraList[i];
            var pullUrlList = cam.pullUrlList;
            for (var j = 0; j < pullUrlList.length; j++) {
                var item = pullUrlList[j];
                if (item.format === 'HLS' && item.drm === 0) {
                    var authResultUrl = item.authResultUrl;
                    for (var k = 0; k < authResultUrl.length; k++) {
                        if (authResultUrl[k].authUrl) {
                            return authResultUrl[k].authUrl;
                        }
                    }
                }
            }
        } 
    } catch (e) {
    }
}