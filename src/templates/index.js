import template from "./main-menu-template";
import style from "./main-menu-style";

export default class Component extends HTMLElement {
  constructor() {
    super();
    // const host = document.getElementById('host'); // shadow host in DOM (0)
    const shadowRoot = this.attachShadow({ mode: "open" }); // create shadowRoot, (1)
    const component = template.content.cloneNode(true); // create element from template (2)
    // shadowRoot.innerHTML = "<h1>test</h1>"; // inline template
    // or shadowRoot.appendChild(document.importNode(template.content, true)) // direct append
    shadowRoot.appendChild(style); // template style
    shadowRoot.appendChild(component); // (3)
    // component.appendChild(nestedComponent)
    // let text = this.getAttribute('data-text'); '' get component attributes

    this.button = this.shadowRoot.querySelector("#button");
    this.handler = () => {
      // do something
      // this.parentNode.method(); // external method
    };
    this.button.addEventListener("click", this.handler);
  }

  static get observedAttributes() {
    return ["hidden"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("element attributes changed.", name, oldValue, newValue);
    if (oldValue === null) this.update();
  }

  connectedCallback() {
    console.log("connected");
  }
  // getter
  get hidden() {
    console.log(this.getAttribute("hidden"));
    return this.getAttribute("hidden");
  }
  // setter
  set hidden(value) {
    value ? this.setAttribute("hidden", value) : this.removeAttribute("hidden");
  }

  update() {
    console.log("update");
    // use getters and setters
  }
  disconnectedCallback() {
    console.log("disconnected");
  }
}

customElements.define("main-menu", Component);
