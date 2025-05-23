function main(item) {

  let id = item.id;

  let tid = item.tid;

  let url = `https://345iptv.com/?tid=${tid}`;

  let headers = {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
  };

  let html = ku9.get(url, headers);

  const regex = new RegExp(`<a href="([^"]+)"[^>]*>${id}<\\/a>`);
  const match = html.match(regex);
  const href = match ? match[1] : null;

  let webview = "https://345iptv.com/" + href;

  let jscode = `
  (function() {
      const startTime = Date.now();
  
      function getVideoParentShadowRoots() {
          const allElements = document.querySelectorAll('*');
          for (const element of allElements) {
              const shadowRoot = element.shadowRoot;
              if (shadowRoot) {
                  const video = shadowRoot.querySelector('video');
                  if (video) return video
              }
          }
          return null
      }
  
      function removeControls() {
          ['#control_bar', '.controls', '.vjs-control-bar', 'xg-controls'].forEach(selector => {
              document.querySelectorAll(selector).forEach(e => e.remove())
          })
      }
  
      function setupVideo(video) {
          video.style.position = 'fixed';
          video.style.top = '0';
          video.style.left = '0';
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.zIndex = '9999';
          video.style.objectFit = 'contain';
          video.style.backgroundColor = 'black';
      }
  
      function checkVideo() {
          if (Date.now() - startTime > 15000) {
              clearInterval(interval);
              return
          }
          let video = document.querySelector('video') || getVideoParentShadowRoots();
          if (video && video.readyState > 0) {
              clearInterval(interval);
              removeControls();
              setupVideo(video);
          }
      }
      const interval = setInterval(checkVideo, 1000)
  })();
    `;

  return JSON.stringify({
    webview: webview,
    jscode: jscode,
    headers: headers,
  });
}