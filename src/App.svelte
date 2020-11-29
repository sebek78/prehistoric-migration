<script>
  import { Router, Route } from "svelte-routing";
  import Homepage from "./containers/homepage/Homepage.svelte";
  import GameView from "./containers/gameView/GameView.svelte";
  import Map from "./models/map/map";
  import Tribes from "./models/tribe/tribes";
  import GameStatus from "./models/gameStatus";
  export let url = "";

  const map = new Map();
  const tribes = new Tribes();
  const game = new GameStatus();
  const data = {
    game,
    tribes,
    map,
  };
</script>

<Router {url}>
  <div>
    <Route path="game">
      <GameView {data} />
    </Route>
    <Route path="/">
      <Homepage {data} />
    </Route>
  </div>
</Router>
