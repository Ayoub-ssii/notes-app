# 📝 Notes App — Personal Notes Management

Full-stack web application lel management mta3 l-notes, m5douma b-**Laravel 11** (API) w **React 18** (Frontend).

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Laravel 11, Laravel Sanctum, Eloquent ORM |
| **Frontend** | React 18 (Vite), React Router v6, Axios |
| **Database** | MySQL (Primary) / SQLite (Default) |
| **Styling** | Custom CSS (Responsive & Dark Theme) |


---

## 📂 Project Structure

```bash
notes-app/
├── backend/                # Laravel 11 API
│   ├── app/Http/Controllers/
│   │   ├── AuthController.php   # Login/Register Logic
│   │   └── NoteController.php   # CRUD Operations
│   ├── database/migrations/    # DB Schema
│   └── routes/api.php          # API Routes Definition
└── frontend/               # React 18 (Vite)
    ├── src/
    │   ├── context/            # Auth & Toast State Management
    │   ├── services/api.js     # Axios Instance & Interceptors
    │   ├── components/         # Reusable UI Components
    │   └── pages/              # Main Views (Notes, Login, etc.)



1. Backend (Laravel)
cd backend
composer install
# Thabbet mel DB configuration fi .env
php artisan migrate
php artisan serve



2. Frontend (React + Vite)
cd frontend
npm install
npm run dev


Features & Bonus
Secure Auth: Laravel Sanctum integration b-tokens persistants.

Full CRUD: Management kemel lel notes (Create, Read, Update, Delete).

Priority System: 🟢 Low | 🟡 Medium | 🔴 High (b-color-coded badges).

Advanced Filtering: Filter notes by priority level.

UX Focused:

Toast notifications lel feedback.

Inline delete confirmation.

Responsive design (Mobile/Desktop).

Auto-logout ki youfa el token (401 handling).

🔑 Test Credentials
Email: test@example.com

Password: password

💡 MySQL Configuration
Fi west el .env mta3 el backend, thabbet m-el settings hadhom:

Extrait de code
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=notes_app
DB_USERNAME=root
DB_PASSWORD=ayoub.123

