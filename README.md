# 💸 Sentra - "Meraba Finansial, Meraih Impian"
![Pitchdeck Sentra Hackathon Find IT 2025](https://github.com/user-attachments/assets/9adc8c65-3e80-41db-8af1-7f62e0218439?raw=true)
Sentra adalah solusi finansial komprehensif yang dirancang khusus untuk pengguna tunanetra dan mereka yang memiliki penglihatan rendah. Aplikasi ini menggabungkan desain inklusif dengan alat manajemen keuangan yang canggih untuk memberikan kemandirian dan aksesibilitas yang lebih besar.

### Nama Tim: Gedag Gedig

#### Anggota:
- Richard (virgobulan05@student.ub.ac.id)
- Jason Surya Wijaya (jasonsurya17@student.ub.ac.id)
- Kadek Nandana Tyo Nayotama (nandanatyon@student.ub.ac.id)

Links

You can access APK File https://drive.google.com/drive/u/0/my-drive

## 🔍 Ringkasan

Sentra bertujuan untuk menjembatani kesenjangan dalam layanan keuangan bagi individu tunanetra melalui aplikasi mobile inklusif yang menawarkan:

- **Perbankan yang Dapat Diakses:** Antarmuka intuitif yang dirancang dengan dukungan pembaca layar
- **Deteksi Mata Uang:** Identifikasi real-time uang kertas Rupiah Indonesia
- **Manajemen Keuangan:** Pelacakan anggaran, kategorisasi pengeluaran, dan pelaporan keuangan
- **Literasi Keuangan:** Akses ke berita keuangan terkurasi dengan kemampuan text-to-speech
- **Otentikasi Aman:** Pengenalan wajah dan opsi login biometrik

## ✨ Fitur

### 🔐 Otentikasi & Keamanan

- Pendaftaran berbasis nomor telepon dan email
- Otentikasi biometrik (sidik jari)
- Verifikasi wajah untuk keamanan yang lebih baik
- Pembuatan PIN untuk akses aman

### 📝 E-KYC (Electronic Know Your Customer)

- Sistem verifikasi kartu identitas (KTP)
- Verifikasi pengenalan wajah
- Proses konfirmasi identitas yang aman

### 📊 Beranda & Dashboard Keuangan

- Riwayat dan kategorisasi transaksi
- Pelacakan pendapatan dan pengeluaran
- Visualisasi progres anggaran
- Pemfilteran data keuangan berdasarkan rentang tanggal

### 💵 Deteksi Mata Uang

- Pengenalan uang kertas Rupiah Indonesia
- Umpan balik audio untuk mata uang yang teridentifikasi
- Pengaturan flash dan kamera untuk berbagai lingkungan

### 📚 Literasi Keuangan

- Berita dan artikel keuangan terkurasi
- Fungsionalitas text-to-speech
- Mode membaca dengan sorotan teks
- Pemfilteran konten berdasarkan kategori

### 👤 Manajemen Profil

- Pengeditan informasi pengguna
- Pengaturan notifikasi
- Opsi keamanan
- Preferensi akun

### 📱 Pembayaran Kode QR

- Pemindaian kode QR untuk pembayaran
- Menghasilkan kode QR pribadi untuk menerima pembayaran
- Verifikasi transaksi melalui PIN

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React Native dengan Expo
- **UI Framework:** Native styling dengan TailwindCSS (NativeWind)
- **State Management:** React Query
- **Otentikasi:** Secure Store & JWT Tokens
- **Formulir:** React Hook Form dengan validasi Zod
- **Aksesibilitas:** React Native Accessibility APIs
- **Computer Vision:** (Untuk deteksi mata uang dan verifikasi KTP)
- **Biometrik:** Expo Local Authentication

## 📁 Struktur Proyek

```
sentra/
├── app/                  # Layar dan rute aplikasi utama
│   ├── (auth)/           # Layar otentikasi
│   ├── (e-kyc)/          # Layar verifikasi KYC
│   ├── (main)/           # Layar aplikasi utama
│   ├── (sentra-pay)/     # Layar pembayaran
│   └── qrCode/           # Fungsionalitas kode QR
├── assets/               # Gambar, font, dan sumber daya statis
├── components/           # Komponen UI yang dapat digunakan kembali
├── constants/            # Konstanta aplikasi
├── context/              # Penyedia React Context
├── features/             # Modul berbasis fitur
│   ├── auth/             # Logika otentikasi
│   ├── deteksi-uang/     # Deteksi mata uang
│   ├── e-kyc/            # Verifikasi KYC
│   ├── home/             # Fungsionalitas dashboard
│   ├── literasi/         # Literasi keuangan
│   ├── profiles/         # Manajemen profil pengguna
│   ├── qr/               # Komponen kode QR
│   └── verification/     # Proses verifikasi
├── hooks/                # Custom React hooks
└── lib/                  # Fungsi utilitas dan helper
```

## 🚀 Memulai

### 📋 Prasyarat

- Node.js (v16 atau lebih tinggi)
- Yarn atau npm
- Expo CLI
- Android Studio (untuk pengembangan Android)
- Xcode (untuk pengembangan iOS, hanya Mac)

### ⚙️ Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/yourusername/sentra.git
   cd sentra
   ```

2. Instal dependensi:

   ```bash
   yarn install
   # atau
   npm install
   ```

3. Mulai server pengembangan:

   ```bash
   npx expo start
   ```

4. Jalankan pada perangkat atau emulator:
   - Tekan `a` untuk Android
   - Tekan `i` untuk iOS (hanya Mac)
   - Pindai kode QR dengan aplikasi Expo Go untuk perangkat fisik

## ♿ Fitur Aksesibilitas

Sentra dirancang dengan aksesibilitas sebagai prinsip utama:

- **Dukungan Pembaca Layar:** Kompatibilitas penuh dengan TalkBack (Android) dan VoiceOver (iOS)
- **Mode Kontras Tinggi:** Opsi visibilitas yang ditingkatkan
- **Umpan Balik Audio:** Panduan suara di seluruh aplikasi
- **Ukuran Teks yang Dapat Disesuaikan:** Teks yang dapat disesuaikan untuk pengguna dengan penglihatan rendah
- **Navigasi Sederhana:** Tata letak intuitif dengan beban kognitif minimal

## 🤝 Kontribusi

Kami menyambut kontribusi untuk membuat Sentra lebih mudah diakses dan fungsional bagi pengguna tunanetra. Silakan lihat [CONTRIBUTING.md](CONTRIBUTING.md) kami untuk detail tentang kode etik kami dan proses untuk mengirimkan permintaan pull.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).

## 👏 Ucapan Terima Kasih

- Terima kasih khusus kepada semua kontributor dan organisasi yang mendukung inklusi keuangan untuk individu tunanetra
- Ikon disediakan oleh Expo Vector Icons
- Mitra pengujian aksesibilitas dan penguji beta tunanetra yang memberikan umpan balik yang sangat berharga

---

Sentra - Kemandirian finansial untuk semua. 🌟
