import {
  aE as VueTutorialComponent,
  c as resolveComponent,
  f as createVNode,
  I as Fragment,
} from "../../vendor/vendor.75f6e6ae65453426.js";

export const ThreeJsRoot = {
  name: "ThreeJsApp",
  computed: {
    tutorialVisible() {
      const store = this.$store;
      return !!this.$preloader?.finished
        && !store.isTransitionActive
        && !store.isOverlayVisible
        && !store.isApiErrorVisible
        && store.sceneState === store.sceneStates.Tutorial;
    },
  },
  render() {
    const NotificationCenter = resolveComponent("NotificationCenter");
    const NiceRouterView = resolveComponent("NiceRouterView");
    const WebGL = resolveComponent("WebGL");
    const store = this.$store;
    return createVNode(Fragment, null, [
      createVNode("main", { class: "ui" }, [
        createVNode(NotificationCenter),
        createVNode(NiceRouterView, { prefix: "page" }),
        createVNode("div", { id: "threejs-hud" }),
        this.$preloader?.finished
          ? createVNode(VueTutorialComponent, { visible: this.tutorialVisible, world: true })
          : null,
      ]),
      createVNode("div", {
        class: {
          overlay: true,
          "is-visible": !!store.isOverlayVisible,
          "is-semi-visible": !!store.isOverlaySemiVisible,
        },
        "data-v-55742171": "",
      }),
      createVNode("div", { class: "vignetting", "data-v-1637091b": "" }),
      store.isTelescopeActive
        ? createVNode("div", { class: "vignetting-lenses", "data-v-1637091b": "" })
        : null,
      createVNode(WebGL),
    ]);
  },
};
