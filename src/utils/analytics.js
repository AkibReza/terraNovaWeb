// Analytics utility functions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, parameters);
  }
  console.log("GA Event:", eventName, parameters);
};

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
};

// Initialize Hotjar
export const initHotjar = () => {
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: 6474353, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
};
