function main(item) {
    const id = item.id || 'cctv3';
    
    const channelMap = {
    "cctv3": "265667206", //CCTV3
    "cctv4": "265667639", //CCTV4
    "cctv4a": "265667335", //CCTV4美洲
    "cctv4o": "265667313", //CCTV4欧洲
    "cctv5": "265667565", //CCTV5
    "cctv5p": "265106763", //CCTV5+
    "cctv6": "265667482", //CCTV6
    "cctv7": "265667268", //CCTV7
    "cctv8": "265667466", //CCTV8
    "cctv9": "265667202", //CCTV9
    "cctv10": "265667631", //CCTV10
    "cctv11": "265667429", //CCTV11
    "cctv12": "265667607", //CCTV12
    "cctv13": "265667474", //CCTV13
    "cctv14": "265667325", //CCTV14
    "cctv15": "265667535", //CCTV15
    "cctv17": "265667526", //CCTV17
    "cgtnd": "265218920", //CGTN纪录
    "cgtna": "265219154", //CGTN阿语
    "cgtne": "265218872", //CGTN西语
    "cgtnf": "265219025", //CGTN法语
    "cgtnr": "265218806", //CGTN俄语
    "lgs": "810326846", //中央新影-老故事
    "fxzl": "810326624", //中央新影-发现之旅
    "zxs": "810326679", //中央新影-中学生*
    "chcjt": "265667645", //CHC家庭影院
    "chcdz": "265218967", //CHC动作电影
    "dfws": "264104266", //东方卫视
    "jlws": "1066865348", //吉林卫视
    "sxws": "816409120", //陕西卫视
    "qhws": "1066885177", //青海卫视
    "hnws": "1008007050", //河南卫视
    "hubws": "1066830679", //湖北卫视
    "jxws": "810783159", //江西卫视
    "jsws": "264104188", //江苏卫视
    "dnws": "810326620", //东南卫视
    "hxws": "810326850", //海峡卫视
    "gdws": "263541274", //广东卫视
    "dwqws": "265218882", //大湾区卫视
    "hinws": "1066884988", //海南卫视
    "shdy": "265667494", //四海钓鱼 x
    "yxfy": "265667664", //游戏风云
    "sdjy": "265218942", //山东教育卫视
    "jsjy": "265219146", //江苏教育
    "zjjl": "80891335", //之江纪录 
    "hzzh": "76680661", //杭州综合 
    "hzmz": "76680568", //杭州明珠 
    "hzsh": "76680574", //杭州生活 
    "hzys": "76680745", //杭州影视 
    "hzse": "76680756", //杭州少儿体育 
    "ssxwzh": "932470412", //嵊泗新闻综合
    "pttv": "903589402", //普陀电视台
    "qzgg": "770663754", //衢州公共
    "wzxwzh": "846913560", //温州新闻综合
    "qzxwzh": "1053893329" //衢州新闻综合
};

const apiUrl = `https://aikanvod.miguvideo.com/video/p/live.jsp?vt=9&type=1&user=guest&channel=${channelMap[id]}&isEncrypt=1&channelcode=`; 
    const headers = {
        'Referer': 'https://aikanvod.miguvideo.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36'
    };

    // 获取直播凭证
    const res = ku9.request(apiUrl, "GET", headers);
    if (!res.body) return JSON.stringify({});
    
    try {
        const data = JSON.parse(res.body);
const live = `${data.liveUrl}`;
        
        return JSON.stringify({
            url: live
        });
    } catch (e) {
        return JSON.stringify({});
    }
}
