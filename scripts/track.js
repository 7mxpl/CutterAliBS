// track.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';  // Supabase Client importieren

const supabaseUrl = 'https://yljxlcsghbhzxaaghwrk.supabase.co';  // Deine Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsanhsY3NnaGJoenhhYWdod3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzI2NDMsImV4cCI6MjA2MjY0ODY0M30.AHShuafmXRvM_keBsGYokkUH9cloAJ9DOKKBB0Y_go8';  // Dein Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

const page = window.location.pathname;  // Ermittelt die aktuelle Seite
const userAgent = navigator.userAgent;  // Benutzer-Agent (Browser/OS)
const ip = await fetch('https://api.ipify.org?format=json')  // Holt die öffentliche IP-Adresse
  .then(res => res.json())
  .then(d => d.ip)
  .catch(() => null);  // Fehlerbehandlung, falls IP nicht ermittelt werden kann

export async function trackVisit() {
  const { error } = await supabase.from('page_views').insert([
    { page, ip, user_agent: userAgent }  // Eintrag in die Tabelle `page_views`
  ]);

  if (error) {
    console.error('Fehler beim Tracken:', error.message);  // Fehler ausgeben, falls vorhanden
  } else {
    console.log('Besuch erfolgreich getrackt');
  }
}
