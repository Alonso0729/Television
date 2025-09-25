export default {
  async fetch(request, env) {
    // 你的真实 IPTV 链接
    const targetUrl = "https://fy.188766.xyz/?ip=996.icu&mima=blackdogsanditsfamilyarealldead";

    return fetch(targetUrl, {
      headers: request.headers, // 保留原请求头
    });
  },
};