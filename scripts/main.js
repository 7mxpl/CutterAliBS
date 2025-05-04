const channelId = "UCQvIv_ykxkHH9BQDQXem_Qg";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    if (data.status === "ok" && data.items && data.items.length > 0) {
      const video = data.items[0];
      document.getElementById("videoTitle").textContent = video.title;
      document.getElementById("thumbnail").src = video.thumbnail;
      document.getElementById("videoLink").href = video.link;
      document.getElementById("videoInfo").classList.remove("hidden");

      // Countdown
      let count = 5;
      const counter = document.getElementById("countdown");
      const timer = setInterval(() => {
        count--;
        counter.textContent = count;
        if (count <= 0) {
          clearInterval(timer);
          window.location.href = video.link;
        }
      }, 1000);
    } else {
      throw new Error("No video found");
    }
  })
  .catch(err => {
    console.error("Fehler:", err);
    document.getElementById("error").classList.remove("hidden");
  });
