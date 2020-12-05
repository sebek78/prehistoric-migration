<script>
  import { navigate } from "svelte-routing";
  import MenuButton from "../../components/MenuButton.svelte";
  import EntryDialog from "../entryDialog/EntryDialog.svelte";
  export let data;

  const { game } = data;
  let showEnrtyDialog = false;
  let innerText = game.isRunning ? "Kontynuuj" : "Nowa gra";

  function toggleDialog() {
    if (!game.isRunning) {
      showEnrtyDialog = !showEnrtyDialog;
    } else {
      navigate("/game", { replace: true });
    }
  }
</script>

<style>
  .buttons {
    padding: 2vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
  }
</style>

<nav class="buttons">
  <MenuButton on:click={toggleDialog} {innerText} />
</nav>
{#if showEnrtyDialog}
  <EntryDialog {toggleDialog} {data} />
{/if}
