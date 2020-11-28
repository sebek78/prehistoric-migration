<script>
  import { Router, Route } from "svelte-routing";
  import Homepage from "./containers/homepage/Homepage.svelte";
  import GameView from "./containers/gameView/GameView.svelte";
  import Map from "./models/map/map";
  import Tribes from "./models/tribe/tribes";
  export let url = "";

  const map = new Map();
  const playerSelection = 2;
  const tribes = new Tribes(playerSelection);
  console.log(tribes);
</script>

<Router {url}>
  <div>
    <Route path="game">
      <GameView {map} />
    </Route>
    <Route path="/">
      <Homepage />
    </Route>
  </div>
</Router>
