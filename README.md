# ujian_pweb

Aplikasi Manajemen Manga
Aplikasi web full-stack untuk mengelola koleksi manga dengan sistem login dan kontrol akses berdasarkan role.

Fitur Utama
- Sistem Login/Logout dengan session management
- Multi Role - Admin (bisa CRUD) dan User (hanya baca)
- CRUD Lengkap - Tambah, Lihat, Edit, Hapus manga
- Desain Responsif - Support mobile & desktop
- Background Aesthetic - Gambar anime keren
- API RESTful - Komunikasi frontend-backend

Teknologi yang Digunakan
Frontend
- React 19 + Vite
- Tailwind CSS
- React Router DOM

Backend
- PHP Native
- MySQL Database
- Apache (XAMPP)

Cara Menjalankan
1. Setup Backend (PHP)
bash
- Copy folder manga-app ke C:\xampp\htdocs\
- Jalankan XAMPP, start Apache dan MySQL
- Buka phpMyAdmin (http://localhost/phpmyadmin)
- Buat database: manga_app
- Import file database/manga_app.sql
- Setup Frontend (React)

2. Setup Frontend (React)
bash
- Buka terminal di folder frontend (cd C:\manga-project\)
- Install dependencies (npm install)
- Jalankan development server (npm run dev)

3. Akses Aplikasi
Frontend: http://localhost:5173


Login Default
- Role	Username	Password
- Admin	admin	admin123
- User	user	user123
