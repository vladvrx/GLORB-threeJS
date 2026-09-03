import { w as watch } from "../../../vendor/vendor.75f6e6ae65453426.js";
import { ctaButton, el, unwrap } from "../dom.js";

function flag(value) {
  return !!unwrap(value);
}

const API_ERRORS = {
  outdatedWindow: { reload: true },
  expiredSaveState: { reload: true },
  existingUser: { reload: false },
  invalidAccessToken: { reload: false },
};

export function installApiNotif(app, host) {
  const aside = el("aside", { class: "api-notif", "data-v-9527461f": "", hidden: true });
  const popin = el("div", { class: "popin", "data-v-9527461f": "" });
  const mask = el("div", { class: "background-mask", "data-v-9527461f": "" }, [
    el("div", { class: "background", "data-v-9527461f": "" }),
  ]);
  const title = el("header", { class: "card-header", "data-v-9527461f": "" });
  const description = el("p", { "data-v-9527461f": "" });
  const buttons = el("div", { class: "buttons", "data-v-9527461f": "" });
  popin.append(mask, title, description, buttons);
  aside.append(popin);
  host.append(aside);

  const notifs = app.$notifications || app.$notifs;
  const copy = {
    title: "",
    description: "",
    continue: "",
    reload: false,
  };

  const dismiss = () => {
    notifs?.setApiNotif?.(null);
  };

  const reload = () => {
    window.location.reload();
  };

  const paint = () => {
    const visible = flag(app.$store.isApiErrorVisible);
    aside.hidden = !visible;
    aside.classList.toggle("is-visible", visible);
    title.innerHTML = copy.title || "";
    description.innerHTML = copy.description || "";
    buttons.replaceChildren();
    if (copy.continue) {
      buttons.append(ctaButton({
        text: copy.continue,
        color: "gray",
        extraClass: "pointer",
        onClick: dismiss,
      }));
    }
    if (copy.reload) {
      buttons.append(ctaButton({
        text: app.$l("cta.reload"),
        color: "green",
        extraClass: "pointer",
        onClick: reload,
      }));
    }
    for (const node of buttons.querySelectorAll(".cta")) node.setAttribute("data-v-9527461f", "");
  };

  const firstDelay = flag(app.$store.isNotFirstApiNotif) ? 10 : 2300;
  window.setTimeout(() => {
    app.$store.isNotFirstApiNotif = true;
    watch(() => flag(app.$store.isApiErrorVisible), (visible) => {
      if (!visible) return;
      const name = unwrap(app.$route?.name);
      if (name === "Customize" || name === "Phone") app.$router.push({ name: "Home" });
    }, { immediate: true });
    watch(() => unwrap(notifs?.apiNotif), (key) => {
      const spec = API_ERRORS[key];
      app.$store.isApiErrorVisible = !!spec;
      if (!spec) {
        copy.title = "";
        copy.description = "";
        copy.continue = "";
        copy.reload = false;
        paint();
        return;
      }
      const continueLabel = app.$l(`errors.${key}.continue`);
      copy.title = app.$l(`errors.${key}.title`);
      copy.description = app.$l(`errors.${key}.desc`);
      copy.continue = continueLabel && String(continueLabel).length && !String(continueLabel).startsWith("errors.")
        ? continueLabel
        : "";
      copy.reload = !!spec.reload;
      paint();
    }, { immediate: true });
  }, firstDelay);
}
