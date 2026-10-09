# Library Loans API

REST API sederhana untuk layanan pencatatan peminjaman buku perpustakaan.

Project ini dibuat menggunakan Node.js, Express.js, dan Supabase sebagai database.

## Deskripsi

Library Loans API digunakan untuk mengelola data peminjaman buku oleh anggota perpustakaan.

API menyediakan operasi CRUD:

* Create
* Read
* Update
* Delete

Selain CRUD, API menyediakan fitur filter berdasarkan status peminjaman.

Contoh:

```text
GET /api/loans?status=Terlambat
```

## Teknologi

* Node.js
* Express.js
* Supabase PostgreSQL
* JavaScript ES Module
* Postman
* Vercel

## Struktur Folder

```text
library-loans-api/
│
├── src/
│   ├── config/
│   │   └── supabaseClient.js
│   │
│   ├── models/
│   │   ├── memberModel.js
│   │   ├── bookModel.js
│   │   └── loanModel.js
│   │
│   ├── controllers/
│   │   ├── memberController.js
│   │   ├── bookController.js
│   │   └── loanController.js
│   │
│   ├── routes/
│   │   ├── memberRoutes.js
│   │   ├── bookRoutes.js
│   │   └── loanRoutes.js
│   │
│   └── index.js
│
├── database.sql
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## Database Schema

### Members

| Field      | Type        | Keterangan    |
| ---------- | ----------- | ------------- |
| id         | UUID        | Primary Key   |
| name       | TEXT        | Nama anggota  |
| email      | TEXT        | Email anggota |
| phone      | TEXT        | Nomor telepon |
| address    | TEXT        | Alamat        |
| created_at | TIMESTAMPTZ | Waktu dibuat  |

### Books

| Field      | Type        | Keterangan   |
| ---------- | ----------- | ------------ |
| id         | UUID        | Primary Key  |
| title      | TEXT        | Judul buku   |
| author     | TEXT        | Penulis      |
| isbn       | TEXT        | ISBN         |
| stock      | INTEGER     | Jumlah stok  |
| created_at | TIMESTAMPTZ | Waktu dibuat |

### Loans

| Field       | Type        | Keterangan             |
| ----------- | ----------- | ---------------------- |
| id          | UUID        | Primary Key            |
| member_id   | UUID        | Foreign Key ke members |
| book_id     | UUID        | Foreign Key ke books   |
| loan_date   | DATE        | Tanggal peminjaman     |
| due_date    | DATE        | Batas pengembalian     |
| return_date | DATE        | Tanggal dikembalikan   |
| status      | TEXT        | Status peminjaman      |
| created_at  | TIMESTAMPTZ | Waktu dibuat           |

### Relasi

```text
members 1 ---- * loans
books   1 ---- * loans
```

## Status Peminjaman

Status yang tersedia:

```text
Dipinjam
Dikembalikan
Terlambat
```

## Instalasi

Clone repository:

```bash
git clone https://github.com/USERNAME/library-loans-api.git
```

Masuk ke folder:

```bash
cd library-loans-api
```

Install dependency:

```bash
npm install
```

Buat file `.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```

Jalankan server:

```bash
npm run dev
```

Server akan berjalan pada:

```text
http://localhost:3000
```

## Endpoint

### Members

```text
GET     /api/members
GET     /api/members/:id
POST    /api/members
PUT     /api/members/:id
DELETE  /api/members/:id
```

### Books

```text
GET     /api/books
GET     /api/books/:id
POST    /api/books
PUT     /api/books/:id
DELETE  /api/books/:id
```

### Loans

```text
GET     /api/loans
GET     /api/loans/:id
POST    /api/loans
PUT     /api/loans/:id
DELETE  /api/loans/:id
```

## Contoh POST Loan

Request:

```http
POST /api/loans
Content-Type: application/json
```

Body:

```json
{
    "member_id": "MEMBER_ID",
    "book_id": "BOOK_ID",
    "loan_date": "2026-10-04",
    "due_date": "2026-10-11",
    "status": "Dipinjam"
}
```

## Contoh Response

```json
{
    "id": "LOAN_ID",
    "member_id": "MEMBER_ID",
    "book_id": "BOOK_ID",
    "loan_date": "2026-10-04",
    "due_date": "2026-10-11",
    "return_date": null,
    "status": "Dipinjam"
}
```

## Filter Loan

Menampilkan semua peminjaman dengan status tertentu:

```http
GET /api/loans?status=Terlambat
```

Contoh status lain:

```http
GET /api/loans?status=Dipinjam
```

```http
GET /api/loans?status=Dikembalikan
```

Filter berdasarkan anggota:

```http
GET /api/loans?member_id=MEMBER_ID
```

Filter berdasarkan buku:

```http
GET /api/loans?book_id=BOOK_ID
```

Filter dapat dikombinasikan:

```http
GET /api/loans?status=Terlambat&member_id=MEMBER_ID
```

## Contoh Update Loan

```http
PUT /api/loans/LOAN_ID
```

Body:

```json
{
    "status": "Dikembalikan",
    "return_date": "2026-10-10"
}
```

## Contoh Delete Loan

```http
DELETE /api/loans/LOAN_ID
```

Response:

```json
{
    "message": "Loan deleted successfully"
}
```

## Deployment

API dideploy menggunakan Vercel.

Base URL:

```text
https://library-loans-api.vercel.app
```

Contoh endpoint:

```text
https://library-loans-api.vercel.app/api/loans
```

> Ganti URL di atas dengan URL Vercel yang diperoleh setelah deployment.

## Pengujian

API dapat diuji menggunakan Postman.

Endpoint utama:

```text
GET    /api/loans
POST   /api/loans
GET    /api/loans/:id
PUT    /api/loans/:id
DELETE /api/loans/:id
```

Filter:

```text
GET /api/loans?status=Terlambat
```

## Repository

```text
https://github.com/USERNAME/library-loans-api
```

## Deployment

```text
https://library-loans-api.vercel.app
```
