import template from "./main-menu-template";
import style from "./main-menu-style";
import { view } from "./../../index";

export default class MainMenu extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const mainMenu = template.content.cloneNode(true);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(mainMenu);

    this.newGameBtn = this.shadowRoot.querySelector("#newGameBtn");
    this.handler = () => {
      view.showGameView();
    };
    this.newGameBtn.addEventListener("click", this.handler);
  }

  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("mm: element attributes changed.", name, oldValue, newValue);
    if (oldValue === null) this.update();
  }

  connectedCallback() {
    console.log("mm: connected");
  }

  get hidden() {
    return this.getAttribute("hidden");
  }

  set hidden(value) {
    value ? this.setAttribute("hidden", value) : this.removeAttribute("hidden");
  }

  update() {
    console.log("mm: update");
  }
  disconnectedCallback() {
    console.log("mm: disconnected");
  }
}
