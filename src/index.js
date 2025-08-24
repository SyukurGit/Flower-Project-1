// File: src/index.js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Mengatur CORS agar GitHub Pages bisa mengakses Worker ini
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Izinkan dari semua domain
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
    };

    // Jika request adalah OPTIONS (preflight request dari browser), langsung izinkan.
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // --- LOGIKA UTAMA ---

    // Jika path-nya adalah '/count', tampilkan data statistik
    if (url.pathname === '/count') {
      const totalVisits = await env.VISITOR_STATS.get('totalVisits') || '0';
      const visitorLog = await env.VISITOR_STATS.get('visitorLog') || '[]';

      const responseData = {
        totalVisits: parseInt(totalVisits, 10),
        recentVisitors: JSON.parse(visitorLog),
      };
      
      return new Response(JSON.stringify(responseData, null, 2), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders // Gabungkan dengan header CORS
        },
      });
    }

    // Jika path-nya adalah '/' atau path lain, catat pengunjung baru
    if (url.pathname === '/') {
      // 1. Ambil total kunjungan saat ini, jika tidak ada, mulai dari 0.
      let totalVisits = parseInt(await env.VISITOR_STATS.get('totalVisits') || '0', 10);
      
      // 2. Tambah 1 ke total kunjungan.
      totalVisits++;

      // 3. Simpan total kunjungan yang baru.
      await env.VISITOR_STATS.put('totalVisits', totalVisits.toString());

      // 4. Kumpulkan data pengunjung.
      const visitorData = {
        timestamp: new Date().toISOString(),
        ip: request.headers.get('CF-Connecting-IP') || 'N/A',
        country: request.cf ? request.cf.country : 'N/A',
        userAgent: request.headers.get('User-Agent') || 'N/A',
      };

      // 5. Ambil log pengunjung yang sudah ada.
      let visitorLog = JSON.parse(await env.VISITOR_STATS.get('visitorLog') || '[]');
      
      // 6. Tambahkan data pengunjung baru ke awal log.
      visitorLog.unshift(visitorData);
      
      // 7. Batasi log agar tidak terlalu besar (misal, hanya 50 entri terakhir).
      if (visitorLog.length > 50) {
        visitorLog = visitorLog.slice(0, 50);
      }

      // 8. Simpan log yang sudah diperbarui.
      await env.VISITOR_STATS.put('visitorLog', JSON.stringify(visitorLog));

      // Kirim respons "OK" kembali ke halaman bunga.
      return new Response('Visit logged!', { 
        headers: { ...corsHeaders } 
      });
    }

    // Jika path tidak dikenal, kirim not found.
    return new Response('Not Found', { 
      status: 404,
      headers: { ...corsHeaders } 
    });
  },
};