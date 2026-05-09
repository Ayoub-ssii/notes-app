# 📝 Notes App — Personal Notes Management

A full-stack web application for managing personal notes, built with **Laravel 11** (API) and **React 18** (frontend).

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Backend    | Laravel 11, Laravel Sanctum, Eloquent ORM       |
| Frontend   | React 18, React Router v6, Axios                |
| Database   | SQLite (default) or MySQL                       |
| Styling    | Custom CSS (responsive, dark theme)             |

---

## Project Structure

```
notes-app/
├── backend/          ← Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── AuthController.php   ← Register / Login / Logout
│   │   │   └── NoteController.php   ← CRUD for notes
│   │   └── Models/
│   │       ├── User.php
│   │       └── Note.php
│   ├── database/
│   │   ├── migrations/              ← notes table migration
│   │   └── seeders/DatabaseSeeder.php
│   ├── routes/api.php               ← All API routes
│   └── config/cors.php
│
└── frontend/         ← React 18 (Vite)
    └── src/
        ├── context/
        │   ├── AuthContext.jsx      ← Token + user state (useContext)
        │   └── ToastContext.jsx     ← Global toast notifications
        ├── services/api.js          ← Axios instance + interceptors
        ├── components/
        │   ├── Navbar.jsx
        │   ├── NoteList.jsx         ← Filter + grid of notes
        │   ├── NoteItem.jsx         ← Single note card with Edit/Delete
        │   ├── NoteForm.jsx         ← Create / Edit modal form
        │   └── PrivateRoute.jsx     ← Auth guard
        └── pages/
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            └── NotesPage.jsx
```

---

## API Endpoints

| Method | Endpoint           | Action                  | Auth?          |
|--------|--------------------|-------------------------|----------------|
| POST   | /api/register      | Register new user       | Public         |
| POST   | /api/login         | Login (returns token)   | Public         |
| POST   | /api/logout        | Logout (revokes token)  | auth:sanctum   |
| GET    | /api/notes         | List user's notes       | auth:sanctum   |
| POST   | /api/notes         | Create a note           | auth:sanctum   |
| PUT    | /api/notes/{id}    | Update a note           | auth:sanctum   |
| DELETE | /api/notes/{id}    | Delete a note           | auth:sanctum   |

---

## Installation & Setup

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- npm

### Frontend (React + Vite)
- Da5el l-folder `frontend`: `cd frontend`
- Install el dependencies: `npm install`
- Start el app: `npm run dev`
# → App available at http://localhost:5173

---

### Backend (Laravel)
- Da5el l-folder `backend`: `cd backend`
- Install el dependencies: `composer install`
- Thabbet f-el file `.env` elli el DB_DATABASE esmha `5edma_notes`.
- Ran el migrations: `php artisan migrate`
- Start el server: `php artisan serve`
# → API available at http://localhost:8000
```

**MySQL alternative**: in `.env`, set:
```
DB_CONNECTION=mysql
DB_DATABASE=notes_app
DB_USERNAME=root
DB_PASSWORD=ayoub.123
```
-------------------------------------------------------------------

```
----------------------------------------------------------------------------
The Vite dev server is configured to proxy `/api` requests to `http://localhost:8000`, so **no CORS issues** in development.


---

## Test Credentials


After seeding, you can log in with:

| Field    | Value              |
|----------|--------------------|
| Email    | test@example.com   |
| Password | password           |

---

## Features

- **Authentication**: Register, Login, Logout via Laravel Sanctum tokens
- **Notes CRUD**: Create, read, update, delete notes without page reloads
- **Priority system**: High / Medium / Low with colour-coded badges and top border
- **Filter by priority**: Filter bar on the notes page
- **Toast notifications**: Success and error feedback after every action
- **Confirmation on delete**: Inline confirmation before deleting
- **Responsive design**: Works on mobile and desktop
- **Token persistence**: Stored in localStorage; auto-attached to every request via Axios interceptor
- **Auto-logout**: 401 responses redirect to `/login` automatically

---



## Bonus Features Implemented

- ✅ Filter by priority (bonus +3 pts)
- ✅ Inline delete confirmation
- ✅ Auto-refresh list after every CRUD operation
- ✅ Responsive card grid layout
