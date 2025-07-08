function main(item) {
  const id = item.id;

  let url = `https://www.insurancegogogo.com/${id}/playlist.m3u8`;

  return JSON.stringify({
    url: url,
    headers: {
      referer: "https://www.kds.tw/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
    },
  });
}