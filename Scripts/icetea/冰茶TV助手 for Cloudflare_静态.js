export default {
  async fetch(request, env) {
    // 你的真实 IPTV 链接
    const targetUrl = "https://fy.188766.xyz/?url=http://996.icu:35455&mishitong=true&mima=blackdogsanditsfamilyarealldead&haiwai=true";
	
    return fetch(targetUrl, {
      headers: request.headers, // 保留原请求头
    });
  },
};