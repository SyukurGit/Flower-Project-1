window.onload = () => {
    const letterContainer = document.getElementById('letter-container');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');

    if (letterContainer && envelopeWrapper) {
        
        let isOpening = false;

        letterContainer.addEventListener('click', () => {
            if (isOpening) {
                return;
            }
            isOpening = true;

            // 1. Memicu animasi amplop terbuka
            envelopeWrapper.classList.add('open');

            // 2. Tunggu 2.5 detik
            // (Cukup waktu untuk animasi buka + jeda sejenak)
            setTimeout(() => {
                // 3. Tambahkan kelas .hidden untuk memulai transisi fade-out
                letterContainer.classList.add('hidden');
                
                // 4. Hapus .container dari body untuk memulai animasi bunga
                // Ini berjalan bersamaan dengan fade-out, jadi transisinya mulus
                document.body.classList.remove("container");
            }, 2500); // Durasi diubah menjadi 2.5 detik
        });
    }
};