# ujian_pweb

📚 Aplikasi Manajemen Manga
Aplikasi web full-stack untuk mengelola koleksi manga dengan sistem login dan kontrol akses berdasarkan role.

🚀 Fitur Utama
✅ Sistem Login/Logout dengan session management

✅ Multi Role - Admin (bisa CRUD) dan User (hanya baca)

✅ CRUD Lengkap - Tambah, Lihat, Edit, Hapus manga

✅ Desain Responsif - Support mobile & desktop

✅ Background Aesthetic - Gambar anime keren

✅ API RESTful - Komunikasi frontend-backend

🛠️ Teknologi yang Digunakan
Frontend
React 19 + Vite

Tailwind CSS

React Router DOM

Backend
PHP Native

MySQL Database

Apache (XAMPP)

📁 Struktur Folder
text
C:\xampp\htdocs\manga-app\          # Backend PHP
├── api/                            # File API
│   ├── auth.php                    # Login/logout
│   └── manga.php                   # CRUD manga
└── config/
    └── database.php                # Koneksi database

C:\manga-project\frontend\          # Frontend React
├── src/components/                 # Komponen React
├── src/styles/                     # CSS
└── config files                    # Konfigurasi build
⚡ Cara Menjalankan
1. Setup Backend (PHP)
bash
#1. Copy folder manga-app ke C:\xampp\htdocs\
#2. Jalankan XAMPP, start Apache dan MySQL
#3. Buka phpMyAdmin (http://localhost/phpmyadmin)
#4. Buat database: manga_app
#5. Import file database/manga_app.sql
2. Setup Frontend (React)
bash
# 1. Buka terminal di folder frontend
cd C:\manga-project\frontend

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
3. Akses Aplikasi
Frontend: http://localhost:5173

Backend API: http://localhost/manga-app/api/

🔑 Login Default
Role	Username	Password
Admin	admin	admin123
User	user	user123
