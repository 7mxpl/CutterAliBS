import { createClient } from '@supabase/supabase-js';

// Supabase-Verbindungsinformationen
const supabaseUrl = 'https://yljxlcsghbhzxaaghwrk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsanhsY3NnaGJoenhhYWdod3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzI2NDMsImV4cCI6MjA2MjY0ODY0M30.AHShuafmXRvM_keBsGYokkUH9cloAJ9DOKKBB0Y_go8';  // Dein API-Schlüssel hier
const supabase = createClient(supabaseUrl, supabaseKey);

// Funktion, um die Besucherinformationen zu tracken
async function trackVisit(page, ip, userAgent) {
  const { error } = await supabase
    .from('page_views')
    .insert([
      { 
        page: page, 
        ip: ip, 
        user_agent: userAgent, 
        timestamp: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Fehler beim Tracken:', error.message);
  }
}

// Funktion, um die IP und den User-Agent zu holen und zu speichern
async function getVisitorInfo() {
  const page = window.location.pathname;
  
  const ip = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(d => d.ip)
    .catch(() => null);

  const userAgent = navigator.userAgent;

  // Tracken der Besucherinformationen
  await trackVisit(page, ip, userAgent);
}

// YouTube Video holen
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

// Aufrufen der getVisitorInfo-Funktion, um die Daten zu tracken
getVisitorInfo();
