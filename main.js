window.onload = () => {
    const letterContainer = document.getElementById('letter-container');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const audio = document.getElementById('background-music');

    if (letterContainer && envelopeWrapper && audio) {
        
        let isOpening = false;

        letterContainer.addEventListener('click', () => {
            if (isOpening) {
                return;
            }
            isOpening = true;
            
            audio.play();
            envelopeWrapper.classList.add('open');

            // Tunggu 1.5 detik (amplop mulai terbuka)
            setTimeout(() => {
                // Buat seluruh kontainer amplop mulai menghilang (fade-out)
                letterContainer.classList.add('fade-out');
                
                // Hapus kelas .container dari body agar animasi bunga dimulai
                document.body.classList.remove("container");

            }, 1500); // Waktu diubah ke 1.5 detik
        });
    }
};



// File: main.js

// === KODE UNTUK MENGIRIM SINYAL KE WORKER ===
// Ganti URL di bawah ini dengan URL worker-mu yang sebenarnya
const workerUrl = 'https://flower-visitor-counter.syukur.workers.dev/';

window.addEventListener('load', () => {
    fetch(workerUrl, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to log visit.');
        }
    })
    .catch(error => {
        console.error('Error logging visit:', error);
    });

    // ... (kode window.onload yang sudah ada biarkan di sini) ...
});