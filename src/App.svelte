<script>
  import { Router, Link, Route } from "svelte-routing";
  import Homepage from "./homepage/Homepage.svelte";
  import GameView from "./gameView/GameView.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="game" component={GameView} />
    <Route path="/">
      <Homepage />
    </Route>
  </div>
</Router>
