# FixTrack - Real-Time Tech Repair Tracking

FixTrack is an interactive, front-end web application designed to bring transparency to gadget repair services. It allows customers to track their device's repair journey step-by-step using a unique ticket ID, while giving technicians a clean interface to manage active jobs.

This project was built as an academic presentation mockup aligned with NEUST design guidelines (Navy Blue & Gold motif).

---

## Key Features

* **Real-Time Ticket Lookup:** Customers can search for active repair tickets (demo ticket ID: `1042`).
* **6-Stage Progress Tracker:** Visual breakdown showing the device state from drop-off, diagnosis, and repair, all the way to completion.
* **Technician Dashboard:** A simplified admin panel showcasing the active repair queue.
* **Customer Feedback System:** Testimonial cards and an interactive review submission form.
* **Pure Static Architecture:** Lightweight and fast, requiring no backend or database setup.

---

## Tech Stack

* **HTML5:** Semantic page structures
* **CSS3 / Tailwind CSS:** Styled using Tailwind CDN with custom Navy and Gold theme tokens
* **JavaScript (Vanilla JS):** Handles client-side navigation and form interactions

---

## Project Structure

```text
fixtrack-web/
├── index.html        # Landing page with ticket lookup and customer feedback
├── status.html       # 6-stage live repair tracker page
├── dashboard.html    # Technician queue dashboard
├── styles.css        # Custom CSS styling
└── script.js        # Interactive logic and routing
