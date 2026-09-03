let initialized = false;

function elements(root, selector) {
  const matches = [];
  if (root instanceof Element && root.matches(selector)) matches.push(root);
  root.querySelectorAll?.(selector).forEach((element) => matches.push(element));
  return matches;
}

function removeRetiredAccess(root) {
  elements(root, ".start-desc, .start-resume, .form-container").forEach((element) => element.remove());

  const retiredAction = /resume|enroll|session/i;
  elements(root, "button, a").forEach((element) => {
    if (retiredAction.test(element.textContent ?? "")) element.remove();
  });
}

function removeRetiredPhoneTabs(root) {
  for (const label of ["Accessories", "Partners", "Customization"]) {
    const selector = `button[aria-label="${label}"], img[alt="${label}"]`;
    elements(root, selector).forEach((element) => {
      const entry = element.closest("li.nav-item") ?? element.closest(".icons > div") ?? element;
      entry.remove();
    });
  }

  elements(root, 'img[alt="Customize"]').forEach((element) => {
    const entry = element.closest("li.nav-item") ?? element.closest(".icons > div") ?? element;
    entry.remove();
  });
}

const NOTIF_CLOUD_PUFFS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function decorateNotifClouds(root) {
  const cards = [
    ...elements(root, ".notification[data-v-25064164]"),
    ...elements(root, ".popin[data-v-9527461f]"),
    ...elements(root, ".popin[data-v-26a58662]"),
    ...elements(root, ".notif[data-v-17d5bb62] .popin"),
  ];
  for (const card of cards) {
    if (card.querySelector(":scope > .notif-cloud")) continue;
    const shape = document.createElement("div");
    shape.className = "notif-cloud";
    shape.setAttribute("aria-hidden", "true");
    for (const name of NOTIF_CLOUD_PUFFS) {
      const puff = document.createElement("span");
      puff.className = `notif-puff puff-${name}`;
      shape.append(puff);
    }
    card.insertBefore(shape, card.firstChild);
  }
}

function styleIntroChoices(root) {
  elements(root, ".dialog button.cta").forEach((button) => {
    const label = (button.textContent ?? "").trim().toLowerCase();
    if (label === "yes") {
      button.classList.remove("gray", "white");
      button.classList.add("green", "intro-choice-yes");
    }
    if (label === "no thanks" || label === "no thanks!") {
      button.classList.remove("white", "green");
      button.classList.add("gray", "intro-choice-no");
    }
  });
}

function isOnScreen(element) {
  if (!element || element.hidden) return false;
  if (element.closest("[hidden], [inert]")) return false;
  const rect = element.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return false;
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

function introWantsLogo() {
  const intro = window.__THREE_JS_GAME__?.app?.$webgl?.store?.intro
    ?? document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$webgl?.store?.intro
    ?? null;
  if (intro?.journeyStarted?.value) return false;
  if (intro && intro.startJourneyVisible && !intro.startJourneyVisible.value) return false;
  return true;
}

function syncHomeLogo(logoUrl) {
  const existing = document.querySelector(".databeach-home-logo");
  const startButton = introWantsLogo()
    ? [...document.querySelectorAll(".start-btn")].find(isOnScreen)
    : null;
  const show = !!startButton;
  document.documentElement.classList.toggle("intro-cta-visible", show);

  if (!show) {
    existing?.remove();
    return;
  }
  if (existing) return;

  const logo = document.createElement("img");
  logo.className = "databeach-home-logo";
  logo.src = `${logoUrl.href}${logoUrl.search ? "&" : "?"}v=glorb`;
  logo.alt = "glorb";
  document.body.appendChild(logo);
}

function installCursor(cursorUrl) {
  const finePointer = window.matchMedia("(pointer: fine)");
  if (!finePointer.matches || !document.body || document.querySelector("#game-cursor")) return;

  const cursor = document.createElement("div");
  cursor.id = "game-cursor";
  cursor.setAttribute("aria-hidden", "true");

  const image = document.createElement("img");
  image.src = cursorUrl.href;
  image.alt = "";
  image.width = 64;
  image.height = 64;
  image.draggable = false;
  image.decoding = "async";
  cursor.appendChild(image);
  document.body.appendChild(cursor);
  document.documentElement.classList.add("game-cursor-ready");

  const setVisible = (visible) => cursor.classList.toggle("is-visible", visible && finePointer.matches);
  const setPressed = (pressed) => cursor.classList.toggle("is-pressed", pressed && finePointer.matches);
  const move = (event) => {
    if (!finePointer.matches || event.pointerType !== "mouse") return;
    cursor.style.left = `${Math.round(event.clientX - 19)}px`;
    cursor.style.top = `${Math.round(event.clientY - 16)}px`;
    setVisible(true);
  };

  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    move(event);
    setPressed(true);
  }, true);
  document.addEventListener("pointerleave", () => {
    setVisible(false);
    setPressed(false);
  });
  window.addEventListener("pointerup", () => setPressed(false));
  window.addEventListener("pointercancel", () => setPressed(false));
  window.addEventListener("blur", () => setPressed(false));
  finePointer.addEventListener?.("change", () => {
    if (!finePointer.matches) {
      setVisible(false);
      setPressed(false);
    }
  });
}

export function initializePageBehavior({ logoUrl, cursorUrl }) {
  if (initialized) return;
  initialized = true;

  const featureScript = document.createElement("script");
  window.isOldBrowser =
    new URLSearchParams(window.location.search).has("oldBrowser") ||
    !("noModule" in featureScript) ||
    !("PointerEvent" in window);
  document.documentElement.classList.toggle("old-browser", window.isOldBrowser);

  let scheduled = false;
  const refresh = () => {
    scheduled = false;
    removeRetiredAccess(document);
    removeRetiredPhoneTabs(document);
    styleIntroChoices(document);
    decorateNotifClouds(document);
    syncHomeLogo(logoUrl);
  };
  const scheduleRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(refresh);
  };

  new MutationObserver(scheduleRefresh).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  installCursor(cursorUrl);
  refresh();
}
