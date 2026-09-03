import { O as SeededRandom, w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { circleButton, ctaButton, el, playUiSound, unwrap } from "../dom.js";

const ACCENT = {
  à: "a",
  á: "a",
  â: "a",
  ô: "o",
  é: "e",
  è: "e",
  ê: "e",
};

const SYLLABLES = {
  a: { sfx: [1, 4, 6, 7, 11], face: [6, 1] },
  e: { sfx: [3, 10, 11], face: [1, 6] },
  i: { sfx: [3, 10], face: [4, 1, 6] },
  o: { sfx: [5, 8, 9, 13], face: [4, 6] },
  bo: { sfx: [5, 8, 9, 13], face: [4, 6] },
  ho: { sfx: [2, 8, 10, 13], face: [4, 6] },
  u: { sfx: [2, 8, 10, 13], face: [4, 6] },
  y: { sfx: [2, 3, 12], face: [1, 6] },
  ba: { sfx: [1, 4, 7, 11], face: [4, 1] },
  bb: { sfx: [1, 4, 6], face: [4] },
  r: { sfx: [7, 10, 11], face: [1, 4, 6] },
  s: { sfx: [2, 3, 12], face: [7, 1] },
  z: { sfx: [2, 3, 12], face: [7] },
};

const SPEAK_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyQ",
  "Escape",
  "Enter",
  "Space",
  "KeyX",
]);

function wrapChars(text) {
  return String(text ?? "").replace(/(^|[ >])([^ ><]+)?/gi, (match, prefix, word) => {
    let html = prefix;
    if (word !== undefined) {
      let chars = "";
      for (const char of word) {
        chars += char === " " || char === "\u00a0" || char === "&nbsp;"
          ? char
          : `<span class="char">${char}</span>`;
      }
      html += `<span class="word">${chars}</span>`;
    }
    return html;
  });
}

function pauseFor(char) {
  if (char === "…") return 600;
  if (char === ".") return 300;
  if (char === ":") return 220;
  if (char === "?") return 240;
  if (char === "!") return 290;
  if (char === ",") return 180;
  return 0;
}

function glyph(node) {
  let text = (node?.textContent || "").toLowerCase().trim();
  if (ACCENT[text]) text = ACCENT[text];
  return text.replace(/[^a-z.:…,?!]/g, "").trim();
}

function promptChoices(node) {
  return Object.values(node?.choices || {});
}

function questionBadge() {
  const badge = el("div", { class: "badge blue", "data-v-984a6ff8": "" });
  const mark = el("div", {
    class: "question",
    "data-v-cd2647e2": "",
    style: { "--size-demult": "1" },
  });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "question-icon");
  svg.setAttribute("data-v-cd2647e2", "");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = '<path fill="currentColor" d="M11 18h2v3h-2zm1-16a7 7 0 0 0-7 7h2.2a4.8 4.8 0 1 1 6.9 4.3C13.3 14 12.7 14.7 12.7 16h2.2c0-2 .9-2.9 2.6-4.1A7 7 0 0 0 12 2z"></path>';
  mark.append(svg);
  badge.append(mark);
  return badge;
}

function continueBadge() {
  const wrap = el("div", { class: "badge-wrapper", "data-v-9946fd7c": "" });
  const badge = el("div", { class: "badge red right", "data-v-984a6ff8": "" });
  const points = el("div", { class: "points red", "data-v-9273af0f": "", style: { "--size-demult": "1" } });
  for (let i = 0; i < 3; i += 1) points.append(el("div", { class: "point", "data-v-9273af0f": "" }));
  badge.append(points);
  wrap.append(badge);
  return wrap;
}

export function installDialog(app, host) {
  const root = el("section", { class: "dialog", "data-v-fda03aae": "" });
  host.append(root);

  let token = 0;
  let typeTimer = 0;
  let mouthTimer = 0;
  let typed = false;
  let advancing = false;
  let skipping = false;
  let speaker = null;

  function restMouth() {
    if (!speaker?.isNPC) return;
    const id = speaker.animation?.animationID;
    if (id === "Thinking" || id === "Fear") speaker.overrideMouth = 3;
    else if (id === "Sad") speaker.overrideMouth = 2;
    else speaker.overrideMouth = 0;
    if (id === "Eloquant") speaker.overrideMouth = 0;
  }

  function clearMouth() {
    window.clearTimeout(mouthTimer);
    if (speaker?.isNPC) speaker.overrideMouth = null;
    speaker = null;
  }

  function clear() {
    window.clearTimeout(typeTimer);
    token += 1;
    typed = false;
    skipping = false;
    advancing = false;
    clearMouth();
    root.replaceChildren();
  }

  function typeBubble(content) {
    const chars = [...content.querySelectorAll(".char")];
    const bubble = content.closest(".bubble");
    const currentSpeaker = speaker;
    const seed = currentSpeaker?.seed ?? "dialog";
    const createSeed = typeof SeededRandom.create === "function" ? SeededRandom.create.bind(SeededRandom) : () => SeededRandom;
    const rate = createSeed(seed);
    const face = createSeed(seed);
    const playbackRate = rate.randomFloat(0.85, 1.4);
    let index = 0;
    let syllableWait = 10;
    let collected = "";
    const queued = [];
    let lastSyllable = 0;
    let lastFace = 0;

    const restSoon = (delay) => {
      window.clearTimeout(mouthTimer);
      mouthTimer = window.setTimeout(restMouth, delay);
    };

    const speakSyllable = (key) => {
      if (!currentSpeaker?.isNPC) return;
      const spec = SYLLABLES[key];
      if (!spec) return;
      const now = performance.now();
      const variation = spec.sfx[rate.randomInt(0, spec.sfx.length - 1)];
      if (now - lastSyllable > 100) {
        lastSyllable = now;
        playUiSound(app, "sfx_dialog_syllab", { variation, playbackRate });
      }
      if (now - lastFace > 90) {
        lastFace = now;
        const hold = face.random() > 0.7;
        let mouth = spec.face[0];
        const anim = currentSpeaker.animation?.animationID;
        if (anim === "Fear") {
          if (mouth === 1 || mouth === 6) mouth = 4;
        } else if (anim === "Sad" || anim === "Thinking") {
          if (mouth === 1) mouth = 7;
          if (mouth === 6) mouth = 4;
        }
        currentSpeaker.overrideMouth = mouth;
        restSoon(hold ? 90 : 190);
      }
    };

    const step = () => {
      if (skipping) {
        const extra = chars[index];
        extra?.classList.add("visible");
        if (extra) index += 1;
      }
      const node = chars[index];
      if (!node) {
        bubble?.classList.add("is-done");
        typed = true;
        skipping = false;
        restSoon(20);
        return;
      }
      node.classList.add("visible");
      const last = !chars[index + 1];
      let unit = glyph(node);
      let delay = pauseFor(unit);
      if (skipping) delay *= 0.15;
      else {
        const nextPause = pauseFor(glyph(chars[index + 1]));
        if (nextPause > 0 || last) delay = 0;
      }
      index += 1;
      typeTimer = window.setTimeout(step, skipping ? 8 : 30 + delay);
      if (delay) {
        syllableWait = 10;
        return;
      }
      collected += unit;
      if (SYLLABLES[collected]) queued.push(collected);
      else if (SYLLABLES[unit]) queued.push(unit);
      if (queued.length && ++syllableWait >= 3) {
        speakSyllable(queued.pop());
        syllableWait = 0;
      }
    };
    typeTimer = window.setTimeout(step, 20);
  }

  function renderSpeak(node) {
    const current = ++token;
    typed = false;
    skipping = false;
    speaker = app.$dialogs.current?.speaker || null;
    const html = wrapChars(app.$tpl(node.bubble ?? ""));
    const aside = el("aside", {
      class: "dialog-component dialog-bubble",
      "data-v-9946fd7c": "",
      "data-pointer": "",
    });
    const section = el("section", { class: "bubble cloud-bubble", "data-v-9946fd7c": "" });
    const puffs = el("div", { class: "cloud-shape", "data-v-9946fd7c": "", "aria-hidden": "true" });
    for (const name of ["puff-a", "puff-b", "puff-c", "puff-d", "puff-e", "puff-f", "puff-g", "puff-h"]) {
      puffs.append(el("span", { class: `cloud-puff ${name}`, "data-v-9946fd7c": "" }));
    }
    for (const name of ["tail-a", "tail-b", "tail-c"]) {
      puffs.append(el("span", { class: `cloud-tail ${name}`, "data-v-9946fd7c": "" }));
    }
    const content = el("div", { class: "content", "data-v-9946fd7c": "", html });
    section.append(puffs, content);
    aside.append(section, continueBadge());
    root.append(aside);
    window.setTimeout(() => {
      if (current !== token) return;
      aside.classList.add("visible");
      typeBubble(content);
    }, app.$dialogs.isFirstNode() ? 700 : 100);
  }

  function choose(choice) {
    if (!choice || advancing) return;
    advancing = true;
    app.$dialogs.makeChoice(choice);
    playUiSound(app, "sfx_UI_dialog_answer");
    window.setTimeout(() => { advancing = false; }, 80);
  }

  function renderChoices(node) {
    typed = true;
    const aside = el("aside", {
      class: "dialog-component dialog-buttons",
      "data-v-a65553f3": "",
    });
    const prompt = el("div", { class: "prompt", "data-v-3df37bd2": "" });
    prompt.append(questionBadge());
    const choices = promptChoices(node);
    const confirm = choices.at(-1);
    const cancel = choices.at(-2);
    const ordered = [cancel, confirm].filter(Boolean);
    for (const choice of ordered.length ? ordered : choices) {
      const label = (choice.value || choice.id || "").trim();
      const isConfirm = choice === confirm;
      const isYes = /^yes$/i.test(label);
      const isNoThanks = /^no thanks$/i.test(label);
      const color = isYes || isConfirm ? "green" : "gray";
      const extra = ["pointer"];
      if (isYes) extra.push("intro-choice-yes");
      if (isNoThanks) extra.push("intro-choice-no");
      prompt.append(ctaButton({
        text: label || (isConfirm ? app.$l("cta.continue") : app.$l("cta.no")),
        color,
        extraClass: extra.join(" "),
        onClick: () => choose(choice),
      }));
    }
    aside.append(prompt);
    root.append(aside);
    requestAnimationFrame(() => aside.classList.add("visible"));
  }

  function renderSelect(node) {
    typed = true;
    const aside = el("aside", {
      class: "dialog-component dialog-select",
      "data-v-23585691": "",
    });
    const section = el("section", { class: "dialog-selector", "data-v-49ab79f6": "" });
    const list = el("div", { class: "prompt", "data-v-3df37bd2": "" });
    for (const choice of promptChoices(node)) {
      const label = (choice.value || choice.id || "").trim();
      list.append(ctaButton({
        text: label,
        color: "white",
        extraClass: "pointer",
        onClick: () => choose(choice),
      }));
    }
    section.append(list);
    aside.append(section);
    root.append(aside);
    requestAnimationFrame(() => aside.classList.add("visible"));
  }

  function nodeId() {
    return app.$dialogs.current?.node?.id ?? app.$dialogs.current?.node?.fullID ?? null;
  }

  function showClose(node) {
    const current = app.$dialogs.current;
    if (!current?.opts?.closable || !node) return false;
    if (unwrap(app.$store.isOverlayVisible) || unwrap(app.$store.currentFullscreenVideoDelayed)) return false;
    const mobile = (app.$viewport.width || window.innerWidth) <= 700;
    if (mobile && (node.isPrompt || node.isGPTPrompt || node.isGPTInput)) return false;
    return true;
  }

  function render() {
    clear();
    const current = app.$dialogs.current;
    const node = current?.node;
    if (!node || unwrap(app.$store.isOverlayVisible)) return;

    if (showClose(node)) {
      const close = circleButton({
        label: app.$l("arialabel.close"),
        icon: "cross",
        tone: "bordered",
        extraClass: "dialog-close pointer",
        onClick: () => app.$dialogs.exitDialog(true),
      });
      close.setAttribute("data-v-fda03aae", "");
      root.append(close);
    }

    if (node.isSpeak) renderSpeak(node);
    else if (node.isPrompt) {
      const count = Object.keys(node.choices || {}).length;
      if (count > 2) renderSelect(node);
      else renderChoices(node);
    }
  }

  function speaking() {
    return !!unwrap(app.$store.isDialogVisible) && !!app.$dialogs.current?.node?.isSpeak;
  }

  function uiTarget(event) {
    return event?.target?.closest?.("button, a, input, textarea, .menu.is-open");
  }

  async function nextSpeak() {
    if (!speaking() || advancing || !typed) return;
    advancing = true;
    try {
      await app.$dialogs.nextNode();
      playUiSound(app, "sfx_UI_dialog_next");
    } finally {
      window.setTimeout(() => { advancing = false; }, 80);
    }
  }

  function skipOrAdvance(event) {
    if (!speaking()) return;
    if (uiTarget(event)) return;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!typed) {
      skipping = true;
      return;
    }
    nextSpeak();
  }

  watch(nodeId, render);
  watch(() => unwrap(app.$store.isDialogVisible), (visible) => {
    if (!visible) clear();
    else render();
  });

  window.addEventListener("pointerdown", skipOrAdvance, true);
  window.addEventListener("keydown", (event) => {
    const node = app.$dialogs.current?.node;
    if (!node) return;
    const closable = !!app.$dialogs.current.opts?.closable;
    if (node.isPrompt) {
      const choices = promptChoices(node);
      if (["Escape", "KeyN", "KeyX"].includes(event.code)) {
        event.preventDefault();
        event.stopPropagation();
        const cancel = choices.at(-2);
        if (cancel) choose(cancel);
        else if (closable) app.$dialogs.exitDialog(true);
        return;
      }
      if (["Enter", "Space", "NumpadEnter", "KeyY"].includes(event.code)) {
        event.preventDefault();
        event.stopPropagation();
        const confirm = choices.at(-1);
        if (confirm) choose(confirm);
        return;
      }
      return;
    }
    if (!SPEAK_KEYS.has(event.code)) return;
    event.preventDefault();
    event.stopPropagation();
    if (["Escape", "KeyX"].includes(event.code) && closable) {
      app.$dialogs.exitDialog(true);
      return;
    }
    if (["Escape", "KeyX"].includes(event.code)) return;
    skipOrAdvance(event);
  }, true);
}
