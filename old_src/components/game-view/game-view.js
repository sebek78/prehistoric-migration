import template from "./game-view-template";
// import style from "./main-menu-style";
import { view } from "./../../index";

export default class GameView extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const gameView = template.content.cloneNode(true);
    shadowRoot.appendChild(gameView);

    this.backBtn = this.shadowRoot.querySelector("#backBtn");
    this.handler = () => {
      view.showMainMenu();
    };
    this.backBtn.addEventListener("click", this.handler);
  }

  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("gv: element attributes changed.", name, oldValue, newValue);
    if (oldValue === null) this.update();
  }

  connectedCallback() {
    console.log("gv: connected");
  }

  get hidden() {
    return this.getAttribute("hidden");
  }

  set hidden(value) {
    value ? this.setAttribute("hidden", value) : this.removeAttribute("hidden");
  }

  update() {
    console.log("gv: update");
    // if (this.hidden) {
    //   this.newGameBtn.removeEventListener("click", this.handler);
    //       console.log("gv, update: disconnected");
    // }
  }
  disconnectedCallback() {
    console.log("gv: disconnected");
  }
}
