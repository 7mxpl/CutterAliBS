const channelId = "UCQvIv_ykxkHH9BQDQXem_Qg";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const latestVideoUrl = data.items[0].link;
    const linkElement = document.getElementById("videoLink");
    linkElement.href = latestVideoUrl;
    linkElement.textContent = "🎬 Zum neuesten YouTube-Video!";
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("videoLink").textContent = "Fehler beim Laden 😢";
  });
