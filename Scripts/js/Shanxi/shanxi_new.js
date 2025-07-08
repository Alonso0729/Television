function main(item) {
    let url = item.url,
        id = ku9.getQuery(url,'id');

        m = {
   "sxws" : 'q8RVWgs',//山西卫视
   "sxjj" : '4j01KWX',//山西经济
   "sxys" : 'Md571Kv',//山西影视
   "sxfz" : 'p4y5do9',//山西社会与法治
   "sxwt" : 'Y00Xezi',//山西文体生活
   "sxhh" : 'lce1mC4',//山西黄河
        };

const jsonUrl = "http://dyhhplus.sxrtv.com/apiv3.8/m3u8_notoken.php?channelid=" + m[id] ;
    const headers = {};
    let playData =  ku9.get(jsonUrl, JSON.stringify(headers));
      const regex = /"address":"(.*?)"/;
  const match = playData.match(regex);
  const finalUrl = match[1].replace(/\\/g, '');
  return JSON.stringify({ url: finalUrl });

    
}
