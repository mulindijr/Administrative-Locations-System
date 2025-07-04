# 🌍 Administrative Locations System
A full-stack application for managing hierarchical administrative locations (Countries → States → Cities → Districts) with filtering, breadcrumbs, dark mode, import/export, and more.

### ✨ Features
- ✅ Manage hierarchical locations (CRUD)

- 📍 Filter by country, state, city, or district

- 🧭 Breadcrumb navigation

- ➕ Add, edit, delete with real-time UI updates

- 🌑 Dark mode toggle

- 🧹 Bulk delete multiple locations

### 🛠️ Tech Stack

| Layer       | Tech                                                |
| ----------- | --------------------------------------------------- |
| Frontend    | React, Tailwind CSS, React Icons, CountUp.js, toast |
| Backend     | Node.js, Express.js, MongoDB, Mongoose              |
| File Upload | multer, json2csv, csv-parse                         |

### 🚀 Getting Started
1. Clone the repository:
```bash
   git clone git@github.com:mulindijr/Administrative-Locations-System.git
```
2. Navigate to the project directory:
```bash
   cd Administrative-Locations-System
```
3. Backend Setup:
```bash
    cd backend
    npm install
```
Create .env:
```bash
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/admin-locations
```
Start Backend:
```bash
   npm run server
```
Server will run on http://localhost:4000/api/locations

4. Frontend Setup
```bash
    cd frontend
    npm install
    npm run dev
```
Frontend will run on http://localhost:5173

### 🧪 API Endpoints

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | `/api/locations`              | List all or filter by query   |
| GET    | `/api/locations/:id`          | Get single location           |
| GET    | `/api/locations/level/:lvl`   | Get locations by level        |
| POST   | `/api/locations`              | Create location               |
| PUT    | `/api/locations/:id`          | Update location               |
| DELETE | `/api/locations/:id`          | Delete location (no children) |
| GET    | `/api/locations/:id/path`     | Get full breadcrumb path      |
| GET    | `/api/locations/:id/children` | Get child locations           |
| GET    | `/api/locations/search`       | Global search by name/code    |
| POST   | `/api/locations/import`       | Import via CSV/JSON           |
| GET    | `/api/locations/export`       | Export to CSV/JSON            |
| GET    | `/api/locations/stats`        | Get counts per level          |

### 🧩 To Do
- 🔍 Global search with breadcrumb path display
- 📊 Dashboard stats with clickable filters
- 📁 Bulk import/export via CSV/JSON

### 🤝 Contributing
Feel free to fork, clone, and open PRs or issues to improve the project!

### 📝 License
MIT © [LICENSE](License)