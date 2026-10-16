/* ==========================================================================
 * Demo Repair Shop — Configuration & Default Data
 * Powered by FixTrack
 * ========================================================================== */

const CONFIG = {
  dataVersion: "2",

  // 1. Shop Details
  shopName: "Demo Repair Shop",
  vendorName: "FixTrack",
  tagline: "Fast, reliable device repairs you can count on",

  // 2. Contact Information
  phone: "+63 999 010 1782",
  email: "support@demorepairshop.ph",
  address: "Maharlika Highway, Cabanatuan City, Nueva Ecija, Philippines",
  hours: "Mon–Sat, 9:00 AM – 6:00 PM",
  mapsUrl: "https://maps.google.com/?q=Cabanatuan+City+Nueva+Ecija",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
  },

  // 3. Service Details
  warrantyDays: 90,
  turnaroundTime: "3–5 business days",
  trustedCount: "2,500+",

  // 4. Billing & Tax
  currencySymbol: "₱",
  taxLabel: "VAT (12%)",
  taxRate: 0.12,
  defaultDiagnosticFee: 500.0,

    // 5. Options & Categories
    supportedBrands: ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Huawei", "Other"],
    deviceCategories: ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Other"],
    serviceTypes: ["In-store Drop-off", "Courier Pickup / Delivery"],

    // 6. Canonical Pipeline Statuses & Descriptions
    statuses: [
      "Device Received",
      "Diagnostic",
      "Awaiting Parts",
      "Active Repair",
      "Quality Check",
      "Ready for Pickup",
    ],
    statusDescriptions: {
      "Device Received": "Your device has been securely checked in at our facility.",
      "Diagnostic": "Our technicians are running multi-point tests to isolate the hardware fault.",
      "Awaiting Parts": "We have ordered the specific, high-quality replacement parts required.",
      "Active Repair": "A technician is currently working on your device at the bench.",
      "Quality Check": "The repair is finished and undergoing final stress testing and cleaning.",
      "Ready for Pickup": "Your device is fully repaired and waiting for you to collect it."
    },

    deviceImages: {
      // Local sample assets
      "iphone 13": "images/devices/iphone-13.jpg",
      "samsung galaxy tab s9": "images/devices/galaxy-tab-s9.jpg",
      "macbook pro m3 14": "images/devices/macbook-pro-14-m3.jpg",
      "google pixel 8": "images/devices/pixel-8.jpg",
      "apple watch ultra 2": "images/devices/apple-watch-ultra-2.jpg",

      // Samsung Galaxy S series (HD)
      "galaxy s20": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s20-1.jpg",
      "galaxy s21": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg",
      "galaxy s22": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-1.jpg",
      "galaxy s23": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-5g-1.jpg",
      "galaxy s24": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-5g-sm-s921-1.jpg",
      "galaxy s25": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-sm-s931-1.jpg",

      // Apple iPhone series (HD)
      "iphone 12": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg",
      "iphone 14": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg",
      "iphone 15": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
      "iphone 16": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",

      // Google Pixel series (HD)
      "pixel 6": "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
      "pixel 7": "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-1.jpg",
      "pixel 9": "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-1.jpg",

      // OnePlus series (HD)
      "oneplus 10 pro": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10-pro-1.jpg",
      "oneplus 11": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg",
      "oneplus 12": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg",
      "oneplus 13": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg",

      // Xiaomi / Redmi / POCO (HD)
      "xiaomi 13t": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-13t-1.jpg",
      "xiaomi 14t": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14t-1.jpg",
      "xiaomi 14": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg",
      "xiaomi 15": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-1.jpg",
      "redmi turbo 3": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-turbo3-1.jpg",
      "turbo 3": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-turbo3-1.jpg",
      "redmi note 13": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-5g-1.jpg",
      "poco f6": "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-poco-f6-1.jpg",

      // Huawei P / Pura series (HD)
      "huawei p50": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p50-1.jpg",
      "huawei p60": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p60-1.jpg",
      "p50": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p50-1.jpg",
      "p60": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p60-1.jpg",
      "pura 70": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-pura70-1.jpg",
      "huawei pura 70": "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-pura70-1.jpg"
    },

    // 7. Roles & Auth
    roles: ["Owner/Admin", "Technician"],
    technicians: [
      "Alex Rivera",
      "Prinz Charles Paderes",
      "Carlos Mendoza",
      "Sara Chen",
      "Mark Bautista",
      "Adolph Jeremy Mangrubang",
      "Stephen Chua",
      "Shian Chua"
    ],
    shopCode: "DEMO-01",
    staff: [
      { email: "alex.rivera@demorepairshop.ph", password: "demo", name: "Alex Rivera", role: "Owner/Admin" },
      { email: "prinz.paderes@demorepairshop.ph", password: "demo", name: "Prinz Charles Paderes", role: "Owner/Admin" },
      { email: "carlos@demorepairshop.ph", password: "demo", name: "Carlos Mendoza", role: "Technician" },
      { email: "sara.chen@demorepairshop.ph", password: "demo", name: "Sara Chen", role: "Technician" },
      { email: "mark.bautista@demorepairshop.ph", password: "demo", name: "Mark Bautista", role: "Technician" },
      { email: "adolph.mangrubang@demorepairshop.ph", password: "demo", name: "Adolph Jeremy Mangrubang", role: "Technician" },
      { email: "stephen.chua@demorepairshop.ph", password: "demo", name: "Stephen Chua", role: "Technician" },
      { email: "shian.chua@demorepairshop.ph", password: "demo", name: "Shian Chua", role: "Technician" }
    ],

    // 8. Initial Sample Tickets
    initialTickets: [
      {
        id: "1042",
        customer: "Maria Santos",
        phone: "09171112222",
        email: "maria.santos@example.ph",
        deviceBrand: "Apple",
        device: "iPhone 13",
        deviceType: "phone",
        repairTitle: "Screen Repair",
        serial: "G0H29KJML01",
        status: "Active Repair",
        leadTech: "Alex Rivera",
        serviceType: "In-store Drop-off",
        intakeDate: "Jul 26, 2026",
        preferredDate: "2026-07-26",
        estimatedReady: "Jul 31, 2026",
        costItems: [
          { desc: "Replacement OLED Screen (Original Quality)", amount: 11700.0 },
          { desc: "Waterproof Adhesive Seal Replacement", amount: 1000.0 },
          { desc: "Installation & Display Calibration Labor", amount: 2800.0 },
        ],
        logs: [
          {
            timestamp: "Jul 28, 2026 • 02:15 PM",
            title: "Started Screen Repair",
            desc: "Our technician is currently installing the new OLED screen and transferring TrueTone sensors.",
          },
          {
            timestamp: "Jul 27, 2026 • 01:30 PM",
            title: "Parts Arrived",
            desc: "The replacement screen arrived at our shop and passed inspection.",
          },
          {
            timestamp: "Jul 27, 2026 • 09:00 AM",
            title: "Diagnostic Complete",
            desc: "We inspected the phone. Only the front glass and touch digitizer are damaged; the battery and motherboard are working fine.",
          },
          {
            timestamp: "Jul 26, 2026 • 04:15 PM",
            title: "Device Received",
            desc: "Phone received at our front counter and ticket #1042 was issued.",
          },
        ],
        notes: [
          "Customer asked to replace the waterproof seal.",
          "Screen was delivered in original protective packaging.",
        ],
      },
      {
        id: "1041",
        customer: "Elena Reyes",
        phone: "09182223333",
        email: "elena.reyes@example.ph",
        deviceBrand: "Samsung",
        device: "Samsung Galaxy Tab S9",
        deviceType: "tablet",
        repairTitle: "Charging Port Replacement",
        serial: "R52N39001A",
        status: "Ready for Pickup",
        leadTech: "Alex Rivera",
        serviceType: "In-store Drop-off",
        intakeDate: "Jul 24, 2026",
        preferredDate: "2026-07-24",
        estimatedReady: "Jul 28, 2026",
        costItems: [
          { desc: "Charging Port Replacement", amount: 3200.0 },
          { desc: "Labor", amount: 1200.0 },
        ],
        logs: [
          {
            timestamp: "Jul 28, 2026 • 09:15 AM",
            title: "Testing Complete",
            desc: "Charging port replaced and fast charging tested successfully. Device is ready for pickup.",
          },
          {
            timestamp: "Jul 27, 2026 • 11:00 AM",
            title: "Active Repair",
            desc: "Port assembly desoldered and replaced.",
          },
          {
            timestamp: "Jul 25, 2026 • 02:00 PM",
            title: "Diagnostic Complete",
            desc: "Requires charging port replacement.",
          },
          {
            timestamp: "Jul 24, 2026 • 10:00 AM",
            title: "Device Received",
            desc: "Tablet checked in.",
          },
        ],
        notes: ["Tested with original fast charger. Ready for customer."],
      },
      {
        id: "1040",
        customer: "Juan Dela Cruz",
        phone: "09193334444",
        email: "juan.delacruz@example.ph",
        deviceBrand: "Apple",
        device: 'MacBook Pro M3 14"',
        deviceType: "laptop",
        repairTitle: "Keyboard Replacement",
        serial: "C02G8901MD",
        status: "Awaiting Parts",
        leadTech: "Carlos Mendoza",
        serviceType: "In-store Drop-off",
        intakeDate: "Jul 22, 2026",
        preferredDate: "2026-07-22",
        estimatedReady: "Aug 2, 2026",
        costItems: [
          { desc: "OEM Keyboard Assembly", amount: 6500.0 },
          { desc: "Hardware Diagnostics", amount: 800.0 }
        ],
        logs: [
          {
            timestamp: "Jul 28, 2026 • 10:00 AM",
            title: "Parts Ordered",
            desc: "Original keyboard assembly ordered from supplier.",
          },
          {
            timestamp: "Jul 27, 2026 • 03:00 PM",
            title: "Diagnostic Complete",
            desc: "Verified liquid damage isolated to the keyboard. Motherboard passes tests.",
          },
          {
            timestamp: "Jul 22, 2026 • 09:00 AM",
            title: "Device Received",
            desc: "Laptop checked in. Keys sticking.",
          },
        ],
        notes: ["Customer reported liquid spill.", "Part expected to arrive next week."],
      },
      {
        id: "1039",
        customer: "Jose Reyes",
        phone: "09185551234",
        email: "jose.reyes@example.ph",
        deviceBrand: "Google",
        device: "Google Pixel 8",
        deviceType: "phone",
        repairTitle: "Battery Replacement",
        serial: "9A120KMN41",
        status: "Diagnostic",
        leadTech: "Carlos Mendoza",
        serviceType: "Courier Pickup / Delivery",
        intakeDate: "Jul 21, 2026",
        preferredDate: "2026-07-21",
        estimatedReady: "Aug 1, 2026",
        costItems: [{ desc: "Initial Diagnostics", amount: 500.0 }],
        logs: [
          {
            timestamp: "Jul 28, 2026 • 09:30 AM",
            title: "Diagnostic in Progress",
            desc: "Testing battery charge cycles and health.",
          },
          {
            timestamp: "Jul 21, 2026 • 01:00 PM",
            title: "Device Received",
            desc: "Received via courier.",
          },
        ],
        notes: ["Customer reported sudden battery drops."],
      },
      {
        id: "1038",
        customer: "Anna Mendoza",
        phone: "09215556666",
        email: "anna.mendoza@example.ph",
        deviceBrand: "Apple",
        device: "Apple Watch Ultra 2",
        deviceType: "watch",
        repairTitle: "Digital Crown Repair",
        serial: "H89PL014AA",
        status: "Device Received",
        leadTech: "Carlos Mendoza",
        serviceType: "In-store Drop-off",
        intakeDate: "Jul 20, 2026",
        preferredDate: "2026-07-20",
        estimatedReady: "Jul 30, 2026",
        costItems: [{ desc: "Initial Inspection", amount: 500.0 }],
        logs: [
          {
            timestamp: "Jul 28, 2026 • 08:00 AM",
            title: "Added to Queue",
            desc: "Watch is awaiting bench assignment.",
          },
          {
            timestamp: "Jul 20, 2026 • 08:00 AM",
            title: "Device Received",
            desc: "Watch received at shop. Customer reported stuck digital crown.",
          },
        ],
        notes: [],
      },
    ],
};
