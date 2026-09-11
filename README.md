# FixTrack - Real-Time Tech Repair Tracking

FixTrack is an interactive, front-end web application designed to bring transparency to gadget repair services. It allows customers to track their device's repair journey step-by-step using a unique ticket ID, while giving technicians a secure interface to manage active jobs.

This project was built as an academic case study for IT-WS02, combining modern UI aesthetics (glassmorphism, premium typography) with strict academic web development fundamentals (semantic HTML, accessible forms, and structured data tables).

---

## Key Features

* **Real-Time Ticket Lookup:** Customers can search for active repair tickets (demo ticket ID: `1042`).
* **6-Stage Progress Tracker:** Visual breakdown showing the device state from drop-off, diagnosis, and repair, all the way to completion.
* **Technician Portal & Authentication:** Secure login portal and a registration system featuring simulated store owner approval workflows.
* **Technician Dashboard:** A semantic, data-rich admin panel showcasing the active repair queue with functional modal interactions.
* **Customer Feedback System:** Testimonial cards and an interactive review submission form with built-in client-side validation states.
* **Pure Static Architecture:** Lightweight and fast, requiring no backend or database setup. Includes a custom 404 error routing page.

---

## Tech Stack

* **HTML5:** Semantic page structures, accessible form controls (`<label>`, explicit inputs), and structured tables (`<caption>`, `<thead>`, `<tbody>`).
* **CSS3 / Tailwind CSS:** Styled using Tailwind CDN with custom theme tokens, dark mode support, and responsive multi-platform layouts.
* **JavaScript (Vanilla JS):** Handles client-side navigation, form validations, dynamic theme toggling, mobile menu interactions, and dynamic copyright dates.
* **Assets:** Lucide Icons for vector graphics and authentic Unsplash stock photography.

---

## Project Structure

```text
fixtrack-web/
├── index.html        # Landing page with ticket lookup and customer feedback
├── status.html       # 6-stage live repair tracker and service log
├── login.html        # Technician authentication portal
├── register.html     # Technician registration with simulated approval flow
├── dashboard.html    # Technician queue and ticket management dashboard
├── 404.html          # Custom error page for unresolved routes
├── styles.css        # Custom CSS styling and Tailwind theme configuration
└── script.js         # Interactive logic, form validation, and mobile menu handling
