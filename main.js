window.onload = () => {
    const letterContainer = document.getElementById('letter-container');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    // Baris baru: Mengambil elemen audio berdasarkan ID-nya
    const audio = document.getElementById('background-music');

    // Pastikan semua elemen ada sebelum melanjutkan
    if (letterContainer && envelopeWrapper && audio) {
        
        let isOpening = false;

        letterContainer.addEventListener('click', () => {
            if (isOpening) {
                return;
            }
            isOpening = true;

            // Baris baru: Memutar musik saat amplop diklik
            audio.play();

            // 1. Memicu animasi amplop terbuka
            envelopeWrapper.classList.add('open');

            // 2. Tunggu 2.5 detik
            setTimeout(() => {
                // 3. Tambahkan kelas .hidden untuk memulai transisi fade-out
                letterContainer.classList.add('hidden');
                
                // 4. Hapus .container dari body untuk memulai animasi bunga
                document.body.classList.remove("container");
            }, 2500);
        });
    }
};