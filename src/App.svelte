<script>
  import Homepage from "./homepage/Homepage.svelte";
  import GameView from "./gameView/GameView.svelte";

  const View = () => {
    let view = "homepage";
    return {
      isHomepage: () => view === "homepage",
      isGameView: () => view === "gameView",
      goHomepage: () => {
        console.log("go homepage");
        view = "homepage";
      },
      goGameView: () => {
        console.log("go game view");
        view = "gameView";
      },
    };
  };
  const view = View();
</script>

{#if view.isHomepage()}
  <Homepage {view} />
{/if}
{#if view.isGameView()}
  <GameView {view} />
{/if}
