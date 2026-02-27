# Hotel Booking and Room Management System

**Framework:** Angular (v17+)  
**Language:** TypeScript  
**UI Library:** Angular Material  
**Mock Backend:** JSON Server  

## 📖 Project Overview
The Hotel Booking and Room Management System is a fully functional, modular, and data-driven Angular Single-Page Application (SPA). It provides a seamless interface for guests to search for hotels, view room availability, and book rooms. It also features a secure, role-based Admin Panel for hotel staff to manage reservations and room inventory in real-time.

## 🌍 Live Deployment
🔹 Frontend (Production)

👉 https://hotel-booking-system-enterprise.vercel.app

🔹 Backend API (Render)

👉 https://hotel-booking-system-enterprise.onrender.com

## ✨ Key Features & Technical Highlights

* **Architecture & Component Design:** Highly modular components including `hotel-list`, `hotel-detail`, `booking-form`, `admin-panel`, and `navbar`. 
* **Routing & Security:** Smooth navigation between routes (`/hotels`, `/hotel/:id`, `/admin`). Implements **Angular Route Guards** to restrict admin access and secure routes.
* **Services & Dependency Injection:** Centralized data fetching using `HotelService`, `BookingService`, and `AuthService` with Angular's `HttpClient` to communicate with the REST API.
* **Advanced Forms:** * *Template-Driven Forms* for quick user authentication.
  * *Reactive Forms* with strict validators (required fields, numeric constraints) for room management and bookings.
* **Pipes & Directives:** Custom pipes for dynamic location and price filtering, combined with custom structural/attribute directives (e.g., highlighting booked vs. available statuses).
* **Angular Material UI:** A fully responsive, enterprise-grade user interface utilizing `MatCard`, `MatTable`, `MatTabs`, `MatDialog`, `MatSnackBar`, and `MatToolbar`.
* **Global Error Handling:** Features a custom **HTTP Interceptor** that catches API errors globally, triggers loading spinners, and presents user-friendly error messages.

---

## 🏗️ Architecture Diagram

```text
[ Angular SPA (Frontend) ]
   │
   ├── App Configuration & Routing (app.routes.ts, app.config.ts)
   │    ├── AuthGuard (Protects /admin dashboard)
   │    └── ErrorInterceptor (Global HTTP error catching & loading triggers)
   │
   ├── Shared Services (Dependency Injection)
   │    ├── AuthService (Manages active user sessions & roles)
   │    ├── HotelService (CRUD operations for hotels & rooms)
   │    └── LoadingService (Manages global progress bar state)
   │
   ├── UI Components
   │    ├── NavbarComponent (Dynamic role-based navigation bar)
   │    ├── HomeComponent (Search interface & role-based workspaces)
   │    ├── HotelListComponent (Grid of hotels utilizing Custom Pipes)
   │    ├── HotelDetailComponent (MatTabs for overview & room booking)
   │    ├── BookingFormComponent (Reactive form for reservations)
   │    ├── AdminPanelComponent (MatTable dashboards for data management)
   │    └── RoomFormDialogComponent (MatDialog reactive form for new rooms)
   │
   └── Pipes & Directives
        ├── FilterHotelsPipe (Search & filter logic)
        └── StatusHighlightDirective (Visual availability cues)

[ REST API (Mock Backend) ]
   └── json-server (db.json serving Hotels, Rooms, Bookings, Users)

```

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the application locally.

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **Angular CLI** installed globally (`npm install -g @angular/cli`)

### Step 1: Install Dependencies

Open your terminal, navigate to the project's root directory, and install the necessary packages:

```bash
npm install

```

### Step 2: Start the Mock Backend (JSON Server)

The application uses a `db.json` file to simulate a real database. Open a terminal window and run:

```bash
npm run mock:api

```

*(Note: This runs the json-server on `http://localhost:3000`. Keep this terminal window open.)*

### Step 3: Start the Angular Development Server

Open a **second** terminal window in the project folder and start the Angular app:

```bash
ng serve

```

Navigate to `http://localhost:4200/` in your web browser. The app will automatically reload if you change any of the source files.

---

## 🧪 Testing User Roles

To evaluate the different interfaces, you can log in using the following mock accounts provisioned in the database:

**1. Admin Access (Full Control)**

* **Email:** `admin@gmail.com`
* **Password:** `123`
* *Features:* Access to the Admin Panel. Can view all reservations, cancel bookings, view the full database of rooms, delete rooms, and add new rooms via Reactive Form dialogs.

**2. Guest Access (Public Booking View)**

* **Email:** `guest@gmail.com`
* **Password:** `123`
* *Features:* Can browse hotels, view tabs for room details, submit booking reservations, and view their personal booking history.


---

*Developed to fulfill the requirements of the Hotel Booking and Room Management System SPA Project.*

