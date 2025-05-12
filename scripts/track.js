import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yljxlcsghbhzxaaghwrk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsanhsY3NnaGJoenhhYWdod3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzI2NDMsImV4cCI6MjA2MjY0ODY0M30.AHShuafmXRvM_keBsGYokkUH9cloAJ9DOKKBB0Y_go8'; 

const supabase = createClient(supabaseUrl, supabaseKey);

// Diese Funktion ruft die IP-Adresse des Nutzers ab
async function getVisitorInfo() {
  const page = window.location.pathname;
  
  const ip = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(d => d.ip)
    .catch(() => null);

  const userAgent = navigator.userAgent;

  // Rufe die trackVisit-Funktion auf, um die Daten zu speichern
  await trackVisit(page, ip, userAgent);
}

// Diese Funktion fügt die Besuchsdaten in die Supabase-Tabelle ein
async function trackVisit(page, ip, userAgent) {
  const { error } = await supabase
    .from('page_views')
    .insert([
      { page: page, ip: ip, user_agent: userAgent }
    ]);

  if (error) {
    console.error('Fehler beim Tracken:', error.message);
  }
}

// Aufrufen der getVisitorInfo-Funktion, um die Daten zu tracken
getVisitorInfo();
