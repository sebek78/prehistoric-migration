import App from "./App.svelte";

var app = new App({
  target: document.body, //getElementById("app"), //.body
  hydrate: true,
});

export default app;
