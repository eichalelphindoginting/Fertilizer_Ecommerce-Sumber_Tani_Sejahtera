# Sumber Tani Sejahtera - Fertilizer Ecommerce

## Deskripsi Aplikasi Web

Sumber Tani Sejahtera adalah sebuah platform e-commerce yang dirancang untuk mempermudah proses jual beli pupuk secara online. Aplikasi web ini dikembangkan sebagai bagian dari Tugas Besar mata kuliah Pemrograman Web (Semester Genap 2024/2025) di Institut Teknologi Sumatera.

Proyek ini dibangun dengan menggunakan:
* **Backend**: Framework Python Pyramid, menyediakan RESTful API.
* **Frontend**: React JS dengan Vite.
* **Database**: PostgreSQL (database relasional).

## Dependensi Paket (Library)

### Backend (Python Pyramid - Sumber_Tani_Sejahtera)
Untuk menjalankan backend, pastikan Anda memiliki Python dan pip terinstal.
* **Direktori**: `Sumber-Tani-Sejahtera_Fertilizer-Ecommerce_122140165/BackEnd_PythonPyramid/sumber_tani_sejahtera/`
* **Setup Awal**:
    1.  Masuk ke direktori proyek backend: `cd Sumber-Tani-Sejahtera_Fertilizer-Ecommerce_122140165/BackEnd_PythonPyramid/sumber_tani_sejahtera`
    2.  Buat Python virtual environment: `python3 -m venv env`
    3.  Upgrade packaging tools: `env/bin/pip install --upgrade pip setuptools`
    4.  Instal proyek dalam mode editable beserta requirements untuk testing: `env/bin/pip install -e ".[testing]"`
* **Dependensi Utama**:
    * Python Pyramid
    * SQLAlchemy (untuk interaksi dengan PostgreSQL)
    * Alembic (untuk migrasi database)
    * psycopg2-binary (driver PostgreSQL)
    * pytest (untuk testing)
    * Lihat `setup.py` di direktori backend untuk daftar lengkap.

### Frontend (React JS + Vite)
Proyek frontend dibangun menggunakan React dengan Vite.
* **Direktori**: `Sumber-Tani-Sejahtera_Fertilizer-Ecommerce_122140165/FrontEnd_JavaScript/`
* **Dependensi Utama**:
    * React
    * Vite
    * React Router DOM (untuk routing)
    * Redux Toolkit (untuk state management)
    * Axios atau Fetch API (untuk integrasi dengan backend)
    * Lihat `package.json` di direktori frontend untuk daftar lengkap.

## Fitur pada Aplikasi
Aplikasi ini akan mengimplementasikan fitur-fitur berikut:
* **Operasi CRUD**: Create, Read, Update, Delete untuk minimal 2 entitas (misalnya, User dan Produk).
    * Manajemen Pengguna (User)
    * Manajemen Produk (Pupuk)
* **Autentikasi**: Sistem autentikasi dasar untuk proteksi endpoint.
* **RESTful API**: Backend menyediakan endpoint API untuk operasi CRUD.
* **Frontend Responsif**: Tampilan antarmuka pengguna (UI) yang responsif dan intuitif.
* **Navigasi Halaman**: Menggunakan React Router DOM untuk navigasi antar halaman.
* **Manajemen State**: Menggunakan Redux Toolkit.

**PEMBERITAHUAN PENGEMBANGAN:**
Untuk bagian **logika keranjang (cart)** dan **pelacakan (tracking)** pada proyek ini **belum dapat ditambahkan sepenuhnya**. Saat ini, kedua bagian tersebut masih dalam tahap perbaikan intensif dikarenakan mengalami banyak kendala dan eror yang memerlukan penanganan lebih lanjut.

## Menjalankan Proyek

### Backend
1.  Pastikan PostgreSQL sudah terinstal dan berjalan.
2.  Setup database (inisialisasi dan migrasi):
    * Generate revisi awal: `env/bin/alembic -c development.ini revision --autogenerate -m "init"`
    * Upgrade ke revisi tersebut: `env/bin/alembic -c development.ini upgrade head`
3.  (Opsional) Load data default ke database: `env/bin/initialize_sumber_tani_sejahtera_db development.ini`
4.  Jalankan tes (opsional): `env/bin/pytest`
5.  Jalankan server backend: `env/bin/pserve development.ini`

### Frontend
1.  Masuk ke direktori frontend: `cd Sumber-Tani-Sejahtera_Fertilizer-Ecommerce_122140165/FrontEnd_JavaScript/`
2.  Install dependensi: `npm install` (atau `yarn install`)
3.  Jalankan server development: `npm run dev` (atau `yarn dev`)
    Untuk detail lebih lanjut, lihat `README.md` di dalam direktori frontend.

## Referensi
* Dokumentasi Python Pyramid: [https://docs.pylonsproject.org/projects/pyramid/en/latest/](https://docs.pylonsproject.org/projects/pyramid/en/latest/)
* Dokumentasi React JS: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
* Dokumentasi Vite: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
* Dokumentasi PostgreSQL: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
* Dokumentasi Alembic: [https://alembic.sqlalchemy.org/en/latest/](https://alembic.sqlalchemy.org/en/latest/)

---
