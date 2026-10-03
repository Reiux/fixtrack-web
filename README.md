# FixTrack - White-Label Repair Tracking

FixTrack is a front-end web application that works like Shopify, but for gadget repair shops. It gives repair shops a ready-made website where their customers can book repairs and track their devices step-by-step. Shop staff get a built-in dashboard to manage these repair tickets.

This project was built as an academic case study for IT-WS02. The current demo is configured for a fictional shop called "Demo Repair Shop".

## Features & Configuration

* **Easy Rebranding (`config.js`):** You can change the shop's name, contact info, supported devices, and tax rates just by editing the `config.js` file. The whole site reads from this file and updates automatically.
* **Real-Time Tracking & Booking:** Customers can submit repair requests online and check their repair status using a ticket ID (try demo ticket `1042`).
* **Staff Dashboard:** A simple admin panel for technicians to update ticket statuses and add notes.
* **Local Data Storage:** All ticket data is saved locally in your browser's `localStorage`. You can easily reset the demo data back to its original state using a button inside the dashboard.
* **Simulated Authentication:** The login system is simulated using `sessionStorage` and is **not secure**. Passwords are saved in plain text in `config.js` for demo purposes.
* **SEO Note:** While the site's `<title>` updates automatically using JavaScript to match the shop name, the meta and OpenGraph tags in the HTML `<head>` are static. You must update those manually if you want proper search engine indexing.

## Demo Logins

To test the staff dashboard, use these credentials:
* **Owner/Admin:** `alex.rivera@demorepairshop.ph` / `demo`
* **Technician:** `carlos@demorepairshop.ph` / `demo`

## Tech Stack

* **HTML5:** Clean and properly structured page layouts.
* **CSS3 / Tailwind CSS (v4):** Styled using the Tailwind browser CDN for quick styling, responsive mobile layouts, and dark mode support.
* **Vanilla JavaScript:** Handles all the page logic, form validation, theme switching, and local data storage without needing a backend.

## Project Structure

```text
fixtrack-web/
├── index.html        # Main landing page with ticket search
├── request.html      # Form for customers to book a repair
├── status.html       # Live repair tracker and cost breakdown
├── dashboard.html    # Staff control panel to manage active repairs
├── login.html        # Staff login page
├── register.html     # Staff account request page
├── privacy.html      # Privacy policy
├── terms.html        # Terms of service
├── 404.html          # Custom error page
├── config.js         # Master settings for shop name, branding, and demo data
├── script.js         # Main logic for data saving, auth, and interactivity
└── styles.css        # Custom CSS and print styles
