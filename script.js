/* FixTrack — plain JavaScript for theming, navigation and interactions */

/* ---------------------------------------------------------------
   1. Tailwind theme (compiled in the browser by the Tailwind CDN)
   --------------------------------------------------------------- */
(function injectTailwindTheme() {
  const style = document.createElement("style");
  style.type = "text/tailwindcss";
  style.textContent = `
    @custom-variant dark (&:is(.dark *));
    @theme inline {
      --radius-sm: calc(var(--radius) - 4px);
      --radius-md: calc(var(--radius) - 2px);
      --radius-lg: var(--radius);
      --radius-xl: calc(var(--radius) + 4px);
      --radius-2xl: calc(var(--radius) + 8px);
      --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
      --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
      --font-mono: "JetBrains Mono", ui-monospace, monospace;
      --color-background: var(--background);
      --color-foreground: var(--foreground);
      --color-card: var(--card);
      --color-card-foreground: var(--card-foreground);
      --color-popover: var(--popover);
      --color-popover-foreground: var(--popover-foreground);
      --color-primary: var(--primary);
      --color-primary-foreground: var(--primary-foreground);
      --color-secondary: var(--secondary);
      --color-secondary-foreground: var(--secondary-foreground);
      --color-muted: var(--muted);
      --color-muted-foreground: var(--muted-foreground);
      --color-accent: var(--accent);
      --color-accent-foreground: var(--accent-foreground);
      --color-destructive: var(--destructive);
      --color-destructive-foreground: var(--destructive-foreground);
      --color-success: var(--success);
      --color-success-foreground: var(--success-foreground);
      --color-warning: var(--warning);
      --color-warning-foreground: var(--warning-foreground);
      --color-border: var(--border);
      --color-input: var(--input);
      --color-ring: var(--ring);
      --color-surface: var(--surface);
      --shadow-panel: var(--shadow-panel);
    }
  `;
  document.head.appendChild(style);
})();

/* ---------------------------------------------------------------
   2. Dark / light theme (applied before paint to avoid a flash)
   --------------------------------------------------------------- */
const THEME_KEY = "fixtrack-theme";

function isDark() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.innerHTML = `<i data-lucide="${dark ? "sun" : "moon"}" class="h-4 w-4"></i>`;
  });
  if (window.lucide) window.lucide.createIcons();
}

applyTheme(isDark());

/* ---------------------------------------------------------------
   3. Hardcoded sample data
   --------------------------------------------------------------- */
const STATUS_OPTIONS = [
  "Pending",
  "Diagnosing",
  "Parts Ordered",
  "Repairing",
  "Ready for Pickup",
];

const DEVICE_ICONS = {
  phone: "smartphone",
  laptop: "laptop",
  tablet: "tablet",
  watch: "monitor-smartphone",
};

const tickets = [
  {
    id: "TKT-8291",
    customer: "Juan dela Cruz",
    device: "iPhone 15 Pro Max",
    deviceType: "phone",
    status: "Repairing",
    updated: "2026-05-21 14:30",
    notes: ["Screws replaced", "Screen assembly arrived"],
  },
  {
    id: "TKT-8292",
    customer: "Maria Santos",
    device: "Samsung Galaxy Tab S9",
    deviceType: "tablet",
    status: "Ready for Pickup",
    updated: "2026-05-21 09:15",
    notes: ["Final QC passed"],
  },
  {
    id: "TKT-8293",
    customer: "Jose Reyes",
    device: 'MacBook Pro M3 14"',
    deviceType: "laptop",
    status: "Diagnosing",
    updated: "2026-05-21 16:45",
    notes: ["Battery health check pending"],
  },
  {
    id: "TKT-8294",
    customer: "Mark Ramos",
    device: "Google Pixel 8",
    deviceType: "phone",
    status: "Parts Ordered",
    updated: "2026-05-20 11:20",
    notes: ["Charging port ordered"],
  },
  {
    id: "TKT-8295",
    customer: "Anna Mendoza",
    device: "Apple Watch Ultra 2",
    deviceType: "watch",
    status: "Pending",
    updated: "2026-05-21 08:00",
    notes: [],
  },
];

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

/* ---------------------------------------------------------------
   4. Page wiring
   --------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  applyTheme(document.documentElement.classList.contains("dark"));

  // Theme toggle buttons (present on every page)
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = !document.documentElement.classList.contains("dark");
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      applyTheme(next);
    });
  });

  initLanding();
  initDashboard();
});

/* ----------------------------- Landing ----------------------------- */
function initLanding() {
  const searchForm = document.getElementById("track-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "status.html";
    });
  }

  // FAQ accordion
  document.querySelectorAll("[data-faq]").forEach((item) => {
    const button = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    const sign = item.querySelector("[data-faq-sign]");
    button.addEventListener("click", () => {
      const open = !panel.hasAttribute("hidden");
      document.querySelectorAll("[data-faq]").forEach((other) => {
        other.querySelector("[data-faq-panel]").setAttribute("hidden", "");
        other.querySelector("[data-faq-sign]").textContent = "+";
      });
      if (!open) {
        panel.removeAttribute("hidden");
        sign.textContent = "\u2212";
      }
    });
  });

  // Star rating
  let rating = 0;
  const stars = document.querySelectorAll("[data-star]");
  stars.forEach((star, i) => {
    star.addEventListener("click", () => {
      rating = i + 1;
      stars.forEach((s, j) => {
        const svg = s.querySelector("svg") || s;
        svg.classList.toggle("fill-current", j < rating);
        svg.classList.toggle("text-accent", j < rating);
      });
    });
  });

  const feedback = document.getElementById("feedback-form");
  if (feedback) {
    feedback.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("feedback-sent");
      msg.textContent = `Thanks! Your ${rating || 0}-star feedback was recorded.`;
      msg.removeAttribute("hidden");
    });
  }
}

/* ---------------------------- Dashboard ---------------------------- */
function initDashboard() {
  const tbody = document.getElementById("ticket-rows");
  if (!tbody) return;

  const searchInput = document.getElementById("admin-search");
  const modal = document.getElementById("note-modal");
  const modalTitle = document.getElementById("modal-ticket-id");
  const notesList = document.getElementById("modal-notes");
  const noteInput = document.getElementById("observation");
  let activeId = null;

  function render() {
    const q = (searchInput?.value || "").toLowerCase();
    const rows = tickets.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.device.toLowerCase().includes(q),
    );

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="px-5 py-10 text-center text-muted-foreground">No tickets match &ldquo;${escapeHtml(searchInput.value)}&rdquo;.</td></tr>`;
    } else {
      tbody.innerHTML = rows
        .map(
          (t) => `
        <tr class="border-t border-border hover:bg-surface/60">
          <td class="px-5 py-4 font-mono text-xs">${t.id}</td>
          <td class="px-5 py-4">
            <p class="font-semibold">${escapeHtml(t.customer)}</p>
            <p class="text-xs text-muted-foreground">Priority Support</p>
          </td>
          <td class="px-5 py-4">
            <span class="flex items-center gap-2">
              <i data-lucide="${DEVICE_ICONS[t.deviceType]}" class="h-4 w-4 shrink-0 text-muted-foreground"></i>
              ${escapeHtml(t.device)}
            </span>
          </td>
          <td class="px-5 py-4">
            <select aria-label="Status for ${t.id}" data-status="${t.id}"
              class="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground outline-none">
              ${STATUS_OPTIONS.map(
                (s) =>
                  `<option value="${s}" class="bg-card text-foreground"${s === t.status ? " selected" : ""}>${s}</option>`,
              ).join("")}
            </select>
          </td>
          <td class="px-5 py-4 font-mono text-xs text-muted-foreground">${t.updated}</td>
          <td class="px-5 py-4">
            <div class="flex items-center justify-end gap-2">
              <button data-note="${t.id}" class="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-secondary">
                <i data-lucide="file-text" class="h-3.5 w-3.5"></i> Add Note
              </button>
              <i data-lucide="more-vertical" class="h-4 w-4 text-muted-foreground"></i>
            </div>
          </td>
        </tr>`,
        )
        .join("");
    }

    if (window.lucide) window.lucide.createIcons();

    tbody.querySelectorAll("[data-status]").forEach((select) => {
      select.addEventListener("change", (e) => {
        const ticket = tickets.find((t) => t.id === select.dataset.status);
        if (ticket) ticket.status = e.target.value;
      });
    });

    tbody.querySelectorAll("[data-note]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.note));
    });
  }

  function openModal(id) {
    activeId = id;
    const ticket = tickets.find((t) => t.id === id);
    modalTitle.textContent = id;
    notesList.innerHTML = ticket.notes.length
      ? ticket.notes
          .map(
            (n) =>
              `<li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-sm bg-muted-foreground"></span> ${escapeHtml(n)}</li>`,
          )
          .join("")
      : `<li class="text-sm text-muted-foreground">No notes yet.</li>`;
    noteInput.value = "";
    modal.classList.remove("hidden");
    modal.classList.add("grid");
  }

  function closeModal() {
    activeId = null;
    noteInput.value = "";
    modal.classList.add("hidden");
    modal.classList.remove("grid");
  }

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.getElementById("save-note").addEventListener("click", () => {
    const ticket = tickets.find((t) => t.id === activeId);
    const value = noteInput.value.trim();
    if (ticket && value) ticket.notes.push(value);
    closeModal();
    render();
  });

  searchInput.addEventListener("input", render);
  render();
}
