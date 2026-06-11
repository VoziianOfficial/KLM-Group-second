document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const faqItems = document.querySelectorAll(".faq-item");
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookies = document.getElementById("acceptCookies");
  const declineCookies = document.getElementById("declineCookies");

  const COOKIE_KEY = "late_cookie_preference";

  /**
   * Lucide icons
   */
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /**
   * Sticky header state on scroll
   */
  const updateHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /**
   * Mobile menu
   */
  const openMobileMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  };

  if (burgerBtn) {
    burgerBtn.addEventListener("click", openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  /**
   * Smooth scroll for same-page anchors
   */
  const samePageLinks = document.querySelectorAll('a[href^="#"]');

  samePageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop =
        targetElement.getBoundingClientRect().top + window.scrollY - headerHeight + 2;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  /**
   * FAQ accordion
   */
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  /**
   * Cookie banner logic
   */
  const savedCookiePreference = localStorage.getItem(COOKIE_KEY);

  if (!savedCookiePreference && cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
      cookieBanner.setAttribute("aria-hidden", "false");
    }, 600);
  }

  const saveCookiePreference = (value) => {
    localStorage.setItem(COOKIE_KEY, value);

    if (cookieBanner) {
      cookieBanner.classList.remove("show");
      cookieBanner.setAttribute("aria-hidden", "true");
    }
  };

  if (acceptCookies) {
    acceptCookies.addEventListener("click", () => {
      saveCookiePreference("accepted");
    });
  }

  if (declineCookies) {
    declineCookies.addEventListener("click", () => {
      saveCookiePreference("declined");
    });
  }

  /**
   * No horizontal scroll protection
   */
  const preventHorizontalScroll = () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  };

  preventHorizontalScroll();
  window.addEventListener("resize", preventHorizontalScroll);
});
