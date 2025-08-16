window.onload = () => {
    const letterContainer = document.getElementById('letter-container');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const audio = document.getElementById('background-music');
    // 1. Ambil elemen video berdasarkan ID-nya
const video = document.getElementById('background-video'); // <-- PERBAIKI DI SINI

    // Pastikan semua elemen ada
    if (letterContainer && envelopeWrapper && audio && video) {
        
        let isOpening = false;

        letterContainer.addEventListener('click', () => {
            if (isOpening) {
                return;
            }
            isOpening = true;
            
            audio.play();
            envelopeWrapper.classList.add('open');

            // Tunggu 2.5 detik (saat amplop menghilang)
            setTimeout(() => {
                letterContainer.classList.add('hidden');
                document.body.classList.remove("container");
                
                // 2. Tampilkan dan putar video
                video.classList.add('visible'); // Memicu fade-in di CSS
                video.play(); // Mulai memutar video
                
            }, 2500);
        });
    }
};