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