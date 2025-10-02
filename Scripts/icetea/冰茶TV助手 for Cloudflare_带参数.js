export default {
  async fetch(request, env) {
    // 从 Cloudflare 环境变量里读取
    //const ip = env.ip;
	const url = env.url;
    const mima = env.mima;

    // 拼接真实目标 URL,const targetUrl = `https://fy.188766.xyz/?ip=${ip}&mima=${mima}`;
	
	const targetUrl = `https://fy.188766.xyz/?url=${url}&mishitong=true&mima=${mima}&haiwai=true`;
	
    // 代理请求
    return fetch(targetUrl, {
      headers: request.headers,
    });
  },
};