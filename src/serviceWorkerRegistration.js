const getServiceWorkerUrl = () => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/service-worker.js`;
};

export function register() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const swUrl = getServiceWorkerUrl();

  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      if (!registration) return;

      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;

        installing.addEventListener("statechange", () => {
          if (
            installing.state === "installed" &&
            navigator.serviceWorker.controller &&
            typeof window !== "undefined"
          ) {
            window.dispatchEvent(new CustomEvent("sw:updated"));
          }
        });
      });
    })
    .catch(() => {
      // Intentionally swallow errors: offline-first is an enhancement only.
    });
}

export function unregister() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .catch(() => {
      // no-op
    });
}
