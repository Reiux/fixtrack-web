/* ==========================================================================
   FixTrack — Client Engine & Reactive State Store
   ========================================================================== */

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

const STORE_KEY_TICKETS = "fixtrack_tickets_store";
const STORE_KEY_VERSION = "fixtrack_data_version";
const STORE_KEY_SESSION = "fixtrack_staff_session";
const THEME_KEY = "fixtrack-theme";

const DEVICE_ICONS = {
  phone: "smartphone",
  laptop: "laptop",
  tablet: "tablet",
  watch: "watch",
  other: "hard-drive"
};

const DEVICE_IMAGES = {
  phone: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80",
  laptop: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
  tablet: "https://m.media-amazon.com/images/I/71wf0FpPBcL._AC_UF894,1000_QL80_.jpg",
  watch: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
  other: "https://images.unsplash.com/photo-1597762143003-2415170d10b7?auto=format&fit=crop&w=800&q=80"
};

const DataStore = {
  getTickets() {
    const version = localStorage.getItem(STORE_KEY_VERSION);
    const raw = localStorage.getItem(STORE_KEY_TICKETS);
    
    if (!raw || version !== String(CONFIG.dataVersion)) {
      localStorage.setItem(STORE_KEY_TICKETS, JSON.stringify(CONFIG.initialTickets));
      localStorage.setItem(STORE_KEY_VERSION, String(CONFIG.dataVersion));
      return CONFIG.initialTickets;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return CONFIG.initialTickets;
    }
  },
  saveTickets(tickets) {
    localStorage.setItem(STORE_KEY_TICKETS, JSON.stringify(tickets));
  },
  findTicket(query) {
    if (!query) return null;
    const cleanId = query.trim().toLowerCase().replace("#", "");
    const cleanPhone = query.trim().replace(/[\s-]/g, "").replace(/^0/, "+63");
    
    return this.getTickets().find((t) => {
      const idMatch = t.id.toLowerCase() === cleanId;
      const phoneRaw = (t.phone || "").replace(/[\s-]/g, "").replace(/^0/, "+63");
      const phoneMatch = phoneRaw.length > 5 && phoneRaw === cleanPhone;
      return idMatch || phoneMatch;
    });
  },
  addTicket(ticket) {
    const list = this.getTickets();
    list.unshift(ticket);
    this.saveTickets(list);
    return ticket;
  },
  getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(STORE_KEY_SESSION));
    } catch {
      return null;
    }
  },
  setSession(user) {
    sessionStorage.setItem(STORE_KEY_SESSION, JSON.stringify(user));
  },
  clearSession() {
    sessionStorage.removeItem(STORE_KEY_SESSION);
  },
};

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

function hydrateWhiteLabelConfig() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (CONFIG[key] !== undefined) {
      el.textContent = CONFIG[key];
    }
  });

  document.querySelectorAll("[data-bind-href]").forEach(el => {
    const key = el.dataset.bindHref;
    if (key === "phone") el.href = "tel:" + CONFIG.phone.replace(/\s+/g,'');
    else if (key === "email") el.href = "mailto:" + CONFIG.email;
    else if (key === "mapsUrl") el.href = CONFIG.mapsUrl;
    else if (CONFIG.socials && CONFIG.socials[key]) el.href = CONFIG.socials[key];
  });

  if (document.title.includes("|")) {
    const parts = document.title.split("|");
    document.title = `${parts[0].trim()} | ${CONFIG.shopName}`;
  }

  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const brandsList = document.getElementById("brands-list-text");
  if (brandsList) {
    const b = CONFIG.supportedBrands.filter(x => x.toLowerCase() !== "other");
    brandsList.textContent = b.length > 1 
      ? `We repair ${b.slice(0, -1).join(", ")}, and ${b[b.length - 1]}.` 
      : `We repair ${b[0]}.`;
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(isDark());
  hydrateWhiteLabelConfig();

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = !document.documentElement.classList.contains("dark");
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      applyTheme(next);
    });
  });

  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", function () {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", !isHidden);
      mobileMenu.classList.toggle("flex", isHidden);
      const icon = this.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", isHidden ? "x" : "menu");
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  initSearchHandler("track-form", "ticket-search", "search-error");
  initSearchHandler("status-track-form", "status-ticket-search", "status-search-error");
  
  initFaqAccordion();
  initStarRatings();
  initRequestForm();
  initStatusPage();
  initDashboard();
  initAuthForms();

  if (window.lucide) window.lucide.createIcons();
});

function initSearchHandler(formId, inputId, errorId) {
  const searchForm = document.getElementById(formId);
  if (!searchForm) return;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const val = (input?.value || "").trim();

    if (!val) {
      if (errorEl) {
        errorEl.textContent = "Please enter a ticket ID or registered phone number.";
        errorEl.classList.remove("hidden");
      }
      return;
    }

    const matched = DataStore.findTicket(val);
    if (!matched) {
      if (errorEl) {
        errorEl.textContent = `No repair record found matching "${val}". Try demo ticket 1042 or 09171112222.`;
        errorEl.classList.remove("hidden");
      }
      return;
    }

    if (errorEl) errorEl.classList.add("hidden");
    window.location.href = `status.html?id=${encodeURIComponent(matched.id)}`;
  });
}

function initFaqAccordion() {
  const faq2Panel = document.getElementById("faq2-panel-content");
  if (faq2Panel) {
      const ul = document.createElement("ul");
      ul.className = "list-disc pl-5 mt-2 space-y-1";
      CONFIG.statuses.forEach(status => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${status}:</strong> ${CONFIG.statusDescriptions[status]}`;
          ul.appendChild(li);
      });
      faq2Panel.appendChild(ul);
  }

  const faqItems = document.querySelectorAll("[data-faq]");
  faqItems.forEach((item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    const iconWrapper = item.querySelector("[data-faq-icon]");

    trigger?.addEventListener("click", (e) => {
      e.preventDefault();
      const isAlreadyOpen = panel && panel.style.display === "block";

      faqItems.forEach((other) => {
        const otherPanel = other.querySelector("[data-faq-panel]");
        const otherTrigger = other.querySelector("[data-faq-trigger]");
        const otherIcon = other.querySelector("[data-faq-icon]");
        const chevron = otherIcon?.querySelector("svg, i");

        if (otherPanel) {
          otherPanel.style.display = "none";
          otherPanel.classList.add("hidden");
        }
        if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        other.classList.remove("border-primary/60", "ring-2", "ring-primary/20");
        if (otherIcon) {
          otherIcon.classList.remove("bg-primary", "text-primary-foreground");
          otherIcon.classList.add("bg-secondary", "text-muted-foreground");
        }
        if (chevron) chevron.style.transform = "rotate(0deg)";
      });

      if (!isAlreadyOpen && panel) {
        panel.style.display = "block";
        panel.classList.remove("hidden");
        trigger.setAttribute("aria-expanded", "true");
        item.classList.add("border-primary/60", "ring-2", "ring-primary/20");
        if (iconWrapper) {
          iconWrapper.classList.remove("bg-secondary", "text-muted-foreground");
          iconWrapper.classList.add("bg-primary", "text-primary-foreground");
          const chevron = iconWrapper.querySelector("svg, i");
          if (chevron) chevron.style.transform = "rotate(180deg)";
        }
      }
    });
  });
}

function initStarRatings() {
  let rating = 0;
  const stars = document.querySelectorAll("[data-star]");
  if (!stars.length) return;

  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      stars.forEach((s, j) => {
        const svg = s.querySelector("svg, i");
        if (j <= index) {
          s.classList.add("text-accent");
          svg?.classList.add("fill-current");
        } else {
          s.classList.remove("text-accent");
          svg?.classList.remove("fill-current");
        }
      });
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach((s, j) => {
        const svg = s.querySelector("svg, i");
        if (j < rating) {
          s.classList.add("text-accent");
          svg?.classList.add("fill-current");
        } else {
          s.classList.remove("text-accent");
          svg?.classList.remove("fill-current");
        }
      });
    });

    star.addEventListener("click", () => {
      rating = index + 1;
      stars.forEach((s, j) => {
        const svg = s.querySelector("svg, i");
        if (j < rating) {
          s.classList.add("text-accent");
          svg?.classList.add("fill-current");
        } else {
          s.classList.remove("text-accent");
          svg?.classList.remove("fill-current");
        }
      });
    });
  });

  const feedback = document.getElementById("feedback-form");
  if (feedback) {
    feedback.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("feedback-sent");
      const comments = document.getElementById("comments")?.value.trim();

      if (!comments || rating === 0) {
        if (msg) {
          msg.textContent = "Please select a star rating and share your experience.";
          msg.className = "mt-3 text-center text-xs font-bold text-destructive";
          msg.removeAttribute("hidden");
        }
        return;
      }

      if (msg) {
        msg.textContent = `Thank you! Your ${rating}-star review was submitted to ${CONFIG.shopName}.`;
        msg.className = "mt-3 text-center text-xs font-bold text-success";
        msg.removeAttribute("hidden");
      }
      feedback.reset();
      rating = 0;
      stars.forEach((s) => {
        s.classList.remove("text-accent");
        s.querySelector("svg, i")?.classList.remove("fill-current");
      });
    });
  }
}

function initRequestForm() {
  const form = document.getElementById("repair-booking-form");
  if (!form) return;

  const dateInput = document.getElementById("preferred_date");
  const localDate = new Date();
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  const localISOTime = localDate.toISOString().split("T")[0];
  if (dateInput) {
    dateInput.min = localISOTime;
  }

  const categorySelect = document.getElementById("device_type");
  if (categorySelect && categorySelect.options.length <= 1) {
    CONFIG.deviceCategories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.toLowerCase();
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  const brandSelect = document.getElementById("device_brand");
  if (brandSelect && brandSelect.options.length <= 1) {
    CONFIG.supportedBrands.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = b;
      opt.textContent = b;
      brandSelect.appendChild(opt);
    });
  }

  const serviceSelect = document.getElementById("service_type");
  if (serviceSelect && serviceSelect.options.length === 0) {
     CONFIG.serviceTypes.forEach((s) => {
       const opt = document.createElement("option");
       opt.value = s;
       opt.textContent = s;
       serviceSelect.appendChild(opt);
     });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    const getVal = (id) => document.getElementById(id)?.value.trim() || "";
    const setError = (id, err) => {
      const el = document.getElementById(`error-${id}`);
      if (el) {
        el.textContent = err;
        el.classList.toggle("hidden", !err);
      }
      if (err) valid = false;
    };

    const fullname = getVal("fullname");
    setError("fullname", fullname.length >= 2 ? "" : "Full name must be at least 2 characters.");

    const phone = getVal("phone");
    const phPhoneRegex = /^(09|\+639)\d{9}$/;
    const cleanPhone = phone.replace(/[\s-]/g, "");
    setError("phone", phPhoneRegex.test(cleanPhone) ? "" : "Enter a valid Philippine mobile number (e.g. 09123456789).");

    const email = getVal("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError("email", emailRegex.test(email) ? "" : "Please provide a valid email address.");

    const brand = getVal("device_brand");
    setError("device_brand", brand ? "" : "Please select your device brand.");

    const category = getVal("device_type");
    setError("device_type", category ? "" : "Please select a device category.");

    const model = getVal("device_model");
    setError("device_model", model.length >= 2 ? "" : "Please specify your exact device model.");

    const service = getVal("service_type");
    setError("service_type", service ? "" : "Please select a service type.");

    const preferredDate = getVal("preferred_date");
    if (!preferredDate) {
      setError("preferred_date", "Please select a preferred date.");
    } else if (preferredDate < localISOTime) {
      setError("preferred_date", "Preferred date can't be in the past.");
    } else {
      setError("preferred_date", "");
    }

    const issue = getVal("issue_desc");
    setError("issue_desc", issue.length >= 5 ? "" : "Please describe the problem (at least 5 characters).");

    const consent = document.getElementById("privacy_consent")?.checked;
    setError("privacy_consent", consent ? "" : "You must agree to the Privacy Policy to proceed.");

    if (!valid) return;

    const currentTickets = DataStore.getTickets();
    const numericIds = currentTickets
      .map((t) => parseInt(t.id, 10))
      .filter((n) => !isNaN(n));
    const nextId = String(numericIds.length ? Math.max(...numericIds) + 1 : 1043);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    let iconKey = "other";
    if (category.includes("phone")) iconKey = "phone";
    else if (category.includes("laptop")) iconKey = "laptop";
    else if (category.includes("tablet")) iconKey = "tablet";
    else if (category.includes("watch")) iconKey = "watch";

    const newTicket = {
      id: nextId,
      customer: fullname,
      phone: cleanPhone,
      email: email,
      deviceBrand: brand,
      device: `${brand} ${model}`,
      deviceType: iconKey,
      repairTitle: "Diagnostic Request",
      serial: "Pending intake",
      status: "Device Received",
      leadTech: "Pending Assignment",
      serviceType: service,
      intakeDate: formattedDate,
      preferredDate: preferredDate,
      estimatedReady: "Pending Diagnostic",
      costItems: [{ desc: "Initial Intake & Diagnostic Assessment", amount: 0.0 }],
      logs: [
        {
          timestamp: `${formattedDate} • ${formattedTime}`,
          title: "Repair Request Received",
          desc: `Request submitted online. Please bring your device to ${CONFIG.shopName} or wait for courier pickup. We'll update this ticket as work begins.`,
        },
      ],
      notes: [`Customer intake notes: ${issue}`],
    };

    DataStore.addTicket(newTicket);

    const modal = document.getElementById("booking-success-modal");
    if (modal) {
      document.getElementById("modal-generated-id").textContent = `#${nextId}`;
      document.getElementById("modal-track-link").href = `status.html?id=${nextId}`;
      modal.classList.remove("hidden");
      modal.classList.add("grid");
    } else {
      window.location.href = `status.html?id=${nextId}`;
    }
  });
}

function initStatusPage() {
  const container = document.getElementById("status-page-root");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get("id");

  const searchState = document.getElementById("status-search-section");
  const notFoundState = document.getElementById("ticket-not-found");
  const detailState = document.getElementById("ticket-details");

  if (!ticketId) {
    if (searchState) searchState.classList.remove("hidden");
    if (notFoundState) notFoundState.classList.add("hidden");
    if (detailState) detailState.classList.add("hidden");
    return;
  }

  const ticket = DataStore.findTicket(ticketId);

  if (!ticket) {
    if (searchState) searchState.classList.add("hidden");
    if (notFoundState) notFoundState.classList.remove("hidden");
    if (detailState) detailState.classList.add("hidden");
    document.getElementById("missing-ticket-id").textContent = ticketId;
    return;
  }

  if (searchState) searchState.classList.add("hidden");
  if (notFoundState) notFoundState.classList.add("hidden");
  if (detailState) detailState.classList.remove("hidden");

  document.getElementById("ticket-num-badge").textContent = `Ticket #${ticket.id}`;
  document.getElementById("device-title").textContent = ticket.repairTitle || `${ticket.device} Repair`;
  document.getElementById("device-model-name").textContent = ticket.device;
  document.getElementById("device-serial").textContent = `S/N: ${ticket.serial || "Pending intake"}`;
  document.getElementById("lead-tech-name").textContent = ticket.leadTech || "Pending Assignment";
  document.getElementById("est-ready-date").textContent = ticket.estimatedReady || "Pending Diagnostic";
  document.getElementById("inspected-by-badge").textContent = `Inspected by ${CONFIG.shopName}`;
  
  const imgEl = document.getElementById("status-device-img");
  if (imgEl) imgEl.src = DEVICE_IMAGES[ticket.deviceType] || DEVICE_IMAGES["other"];
  const iconEl = document.getElementById("status-device-icon");
  if (iconEl) iconEl.setAttribute("data-lucide", DEVICE_ICONS[ticket.deviceType] || "hard-drive");

  const statusBadge = document.getElementById("current-status-badge");
  if (statusBadge) {
     statusBadge.textContent = ticket.status;
     if (ticket.status === "Ready for Pickup") {
       statusBadge.classList.replace("bg-primary", "bg-success");
       statusBadge.classList.replace("text-primary-foreground", "text-success-foreground");
     }
  }

  const latestLog = ticket.logs && ticket.logs.length ? ticket.logs[0] : null;
  const lastUpdatedEl = document.getElementById("last-updated-text");
  if (lastUpdatedEl) {
    lastUpdatedEl.textContent = latestLog ? `Last Updated: ${latestLog.timestamp.split('•')[0].trim()}` : "Last Updated: Today";
  }

  const stageIndex = CONFIG.statuses.indexOf(ticket.status);
  const milestonesList = document.getElementById("tracker-milestones");
  if (milestonesList) {
    milestonesList.innerHTML = CONFIG.statuses
      .map((statusName, i) => {
        const isPassed = i <= stageIndex && ticket.status !== "Ready for Pickup";
        const isCurrent = i === stageIndex;
        const allDone = ticket.status === "Ready for Pickup";

        let nodeIcon = `<span class="h-2 w-2 rounded-full bg-muted-foreground/40"></span>`;
        let ringClasses = "border-border bg-muted text-muted-foreground";

        if (allDone || (isPassed && !isCurrent)) {
          nodeIcon = `<i data-lucide="check" class="h-4 w-4"></i>`;
          ringClasses = "border-primary bg-primary text-primary-foreground";
        } else if (isCurrent && !allDone) {
          nodeIcon = `<span class="h-2.5 w-2.5 rounded-full bg-accent-foreground animate-pulse"></span>`;
          ringClasses = "border-accent bg-accent text-accent-foreground ring-4 ring-accent/20";
        }

        const leftLine = i === 0 ? "opacity-0" : (allDone || isPassed || isCurrent) ? "bg-primary" : "bg-border";
        const rightLine = i === CONFIG.statuses.length - 1 ? "opacity-0" : (allDone || (isPassed && !isCurrent)) ? "bg-primary" : "bg-border";

        return `
          <li class="flex flex-1 flex-col items-center">
            <div class="flex w-full items-center">
              <span class="h-0.5 flex-1 ${leftLine}"></span>
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full border ${ringClasses} transition-all">
                ${nodeIcon}
              </span>
              <span class="h-0.5 flex-1 ${rightLine}"></span>
            </div>
            <span class="mt-3 max-w-[85px] text-center font-mono text-[11px] font-bold tracking-tight uppercase ${
              isCurrent || allDone ? "text-foreground font-black" : "text-muted-foreground"
            }">
              ${statusName}
            </span>
          </li>`;
      })
      .join("");
  }

  const logContainer = document.getElementById("activity-log-list");
  if (logContainer) {
    logContainer.innerHTML = (ticket.logs || [])
      .map(
        (log, idx) => `
        <li class="relative pl-6 pb-6 last:pb-0">
          <span class="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${
            idx === 0 ? "bg-accent ring-4 ring-accent/20" : "bg-muted-foreground"
          }"></span>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <p class="text-sm font-bold text-foreground">${escapeHtml(log.title)}</p>
            <time class="font-mono text-xs text-muted-foreground">${escapeHtml(log.timestamp)}</time>
          </div>
          <p class="mt-1 text-sm text-muted-foreground">${escapeHtml(log.desc)}</p>
        </li>`
      )
      .join("");
  }

  const costList = document.getElementById("cost-breakdown-list");
  const subtotalEl = document.getElementById("billing-subtotal");
  const taxLabelEl = document.getElementById("billing-tax-label");
  const taxAmountEl = document.getElementById("billing-tax-amount");
  const totalAmountEl = document.getElementById("billing-total");

  if (costList && ticket.costItems) {
    costList.innerHTML = ticket.costItems
      .map(
        (item) => `
        <div class="flex justify-between gap-4">
          <dt class="text-muted-foreground">${escapeHtml(item.desc)}</dt>
          <dd class="shrink-0 font-mono font-medium">${CONFIG.currencySymbol}${item.amount.toLocaleString("en-PH", {
          minimumFractionDigits: 2,
        })}</dd>
        </div>`
      )
      .join("");

    const subtotal = ticket.costItems.reduce((acc, curr) => acc + curr.amount, 0);
    const tax = subtotal * CONFIG.taxRate;
    const total = subtotal + tax;

    if (subtotalEl) subtotalEl.textContent = `${CONFIG.currencySymbol}${subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
    if (taxLabelEl) taxLabelEl.textContent = CONFIG.taxLabel;
    if (taxAmountEl) taxAmountEl.textContent = `${CONFIG.currencySymbol}${tax.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
    if (totalAmountEl) totalAmountEl.textContent = `${CONFIG.currencySymbol}${total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
  }

  if (window.lucide) window.lucide.createIcons();
}

function initDashboard() {
  const tbody = document.getElementById("ticket-rows");
  if (!tbody) return;

  const session = DataStore.getSession();
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const staffNameEl = document.getElementById("staff-profile-name");
  const staffRoleEl = document.getElementById("staff-profile-role");
  if (staffNameEl) staffNameEl.textContent = session.name;
  if (staffRoleEl) staffRoleEl.textContent = session.role;

  document.querySelectorAll(".staff-logout-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      DataStore.clearSession();
      window.location.href = "login.html";
    });
  });

  document.querySelectorAll(".reset-data-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all tickets to the original demo state?")) {
        localStorage.setItem(STORE_KEY_TICKETS, JSON.stringify(CONFIG.initialTickets));
        localStorage.setItem(STORE_KEY_VERSION, String(CONFIG.dataVersion));
        window.location.reload();
      }
    });
  });

  const searchInput = document.getElementById("admin-search");
  const modal = document.getElementById("note-modal");
  const modalTitle = document.getElementById("modal-ticket-id");
  const notesList = document.getElementById("modal-notes");
  const noteInput = document.getElementById("observation");
  let activeId = null;

  function updateMetrics() {
    const list = DataStore.getTickets();
    const metricActive = document.getElementById("metric-active");
    const metricPickup = document.getElementById("metric-pickup");

    const pickupCount = list.filter((t) => t.status === "Ready for Pickup").length;
    const activeCount = list.length - pickupCount;

    if (metricActive) metricActive.textContent = activeCount.toString().padStart(2, "0");
    if (metricPickup) metricPickup.textContent = pickupCount.toString().padStart(2, "0");
  }

  function renderTable() {
    const allTickets = DataStore.getTickets();
    const q = (searchInput?.value || "").toLowerCase().trim();

    const filtered = allTickets.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        (t.customer || "").toLowerCase().includes(q) ||
        (t.device || "").toLowerCase().includes(q) ||
        (t.phone || "").includes(q)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="px-5 py-12 text-center text-muted-foreground font-medium">No repair tickets found matching your query.</td></tr>`;
      updateMetrics();
      return;
    }

    tbody.innerHTML = filtered
      .map(
        (t) => `
        <tr class="border-t border-border hover:bg-surface/60 transition-colors">
          <td class="px-5 py-4 font-mono text-xs font-bold text-foreground">
            <a href="status.html?id=${t.id}" class="hover:underline text-primary">#${escapeHtml(t.id)}</a>
          </td>
          <td class="px-5 py-4">
            <p class="font-semibold text-foreground">${escapeHtml(t.customer)}</p>
            <p class="text-xs text-muted-foreground font-mono">${escapeHtml(t.phone || "No phone")}</p>
          </td>
          <td class="px-5 py-4">
            <span class="flex items-center gap-2">
              <i data-lucide="${DEVICE_ICONS[t.deviceType] || 'hard-drive'}" class="h-4 w-4 shrink-0 text-muted-foreground"></i>
              <span class="font-medium">${escapeHtml(t.device)}</span>
            </span>
          </td>
          <td class="px-5 py-4">
            <select aria-label="Status for ticket ${t.id}" data-status="${t.id}"
              class="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground outline-none cursor-pointer transition-all hover:opacity-90">
              ${CONFIG.statuses
                .map(
                  (s) =>
                    `<option value="${s}" class="bg-card text-foreground"${s === t.status ? " selected" : ""}>${s}</option>`
                )
                .join("")}
            </select>
          </td>
          <td class="px-5 py-4 font-mono text-xs text-muted-foreground">${escapeHtml(t.intakeDate || "Pending")}</td>
          <td class="px-5 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button data-note="${t.id}" class="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5 hover:bg-secondary cursor-pointer">
                <i data-lucide="file-text" class="h-3.5 w-3.5"></i> Notes (${(t.notes || []).length})
              </button>
            </div>
          </td>
        </tr>`
      )
      .join("");

    updateMetrics();
    if (window.lucide) window.lucide.createIcons();

    tbody.querySelectorAll("[data-status]").forEach((select) => {
      select.addEventListener("change", (e) => {
        const id = select.dataset.status;
        const newStatus = e.target.value;
        const list = DataStore.getTickets();
        const item = list.find((t) => t.id === id);
        if (item) {
          item.status = newStatus;
          const now = new Date();
          const timestamp = `${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
          if (!item.logs) item.logs = [];
          item.logs.unshift({
            timestamp: timestamp,
            title: `Status Changed to ${newStatus}`,
            desc: `Updated by staff (${session.name}) in dashboard console.`,
          });
          DataStore.saveTickets(list);
          updateMetrics();
        }
      });
    });

    tbody.querySelectorAll("[data-note]").forEach((btn) => {
      btn.addEventListener("click", () => openNoteModal(btn.dataset.note));
    });
  }

  function openNoteModal(id) {
    activeId = id;
    const ticket = DataStore.getTickets().find((t) => t.id === id);
    if (!ticket) return;

    modalTitle.textContent = `Ticket #${id}`;
    notesList.innerHTML = (ticket.notes || []).length
      ? ticket.notes
          .map(
            (n) => `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span><span>${escapeHtml(n)}</span></li>`
          )
          .join("")
      : `<li class="text-sm text-muted-foreground">No notes logged yet.</li>`;

    noteInput.value = "";
    modal.classList.remove("hidden");
    modal.classList.add("grid");
  }

  function closeNoteModal() {
    activeId = null;
    noteInput.value = "";
    modal.classList.add("hidden");
    modal.classList.remove("grid");
  }

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", closeNoteModal);
  });

  document.getElementById("save-note")?.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (activeId && text) {
      const list = DataStore.getTickets();
      const ticket = list.find((t) => t.id === activeId);
      if (ticket) {
        if (!ticket.notes) ticket.notes = [];
        ticket.notes.push(`${text} (Logged by ${session.name})`);
        DataStore.saveTickets(list);
      }
    }
    closeNoteModal();
    renderTable();
  });

  searchInput?.addEventListener("input", renderTable);
  renderTable();
}

function initAuthForms() {
  const loginForm = document.getElementById("staff-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email")?.value.trim();
      const pass = document.getElementById("login-password")?.value;
      const errorEl = document.getElementById("login-error");

      if (!email || !pass) {
        if (errorEl) {
          errorEl.textContent = "Please provide both your email address and password.";
          errorEl.classList.remove("hidden");
        }
        return;
      }

      const staffMatch = CONFIG.staff.find(s => s.email === email && s.password === pass);

      if (staffMatch) {
        DataStore.setSession({
          name: staffMatch.name,
          role: staffMatch.role,
          email: staffMatch.email,
          shopCode: CONFIG.shopCode,
        });
        window.location.href = "dashboard.html";
      } else {
        if (errorEl) {
          errorEl.textContent = "Invalid email or password. Please try again.";
          errorEl.classList.remove("hidden");
        }
      }
    });
  }

  const regForm = document.getElementById("staff-register-form");
  if (regForm) {
    const roleSelect = document.getElementById("staff_role");
    if (roleSelect && roleSelect.options.length <= 1) {
      CONFIG.roles.forEach((r) => {
        const opt = document.createElement("option");
        opt.value = r;
        opt.textContent = r;
        if (r === "Technician") opt.selected = true;
        roleSelect.appendChild(opt);
      });
    }

    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullname = document.getElementById("reg_fullname")?.value.trim();
      const email = document.getElementById("reg_email")?.value.trim();
      const code = document.getElementById("shop_code")?.value.trim();
      const pass = document.getElementById("reg_password")?.value;
      const alertEl = document.getElementById("reg-success-alert");
      const errEl = document.getElementById("reg-error");

      if (code !== CONFIG.shopCode) {
        if (errEl) {
          errEl.textContent = "Invalid Shop Code. Please ask your administrator for the correct identifier.";
          errEl.classList.remove("hidden");
        }
        return;
      }
      
      if (pass.length < 6) {
        if (errEl) {
           errEl.textContent = "Password must be at least 6 characters.";
           errEl.classList.remove("hidden");
        }
        return;
      }

      if (errEl) errEl.classList.add("hidden");

      if (alertEl) {
        alertEl.classList.remove("hidden");
        alertEl.innerHTML = `
          <p class="font-bold text-success">Registration Request Received!</p>
          <p class="text-xs text-muted-foreground mt-1">Your request to join <strong>${escapeHtml(code)}</strong> has been routed to the Owner/Admin. You will be notified once reviewed.</p>
        `;
        regForm.reset();
        if (roleSelect) roleSelect.value = "Technician";
      }
    });
  }
}
