<script>
  import { navigate } from "svelte-routing";
  import { defaultTribes } from "../../models/tribe/tribe";
  import DialogWrapper from "../../components/DialogWrapper.svelte";
  import MenuButton from "../../components/MenuButton.svelte";
  import TribeButton from "./TribeButton.svelte";

  export let toggleDialog;
  export let data;

  const { game, tribes } = data;

  const selectedInput = (index) =>
    tribes.list.findIndex((tribe) => tribe.controlByPlayer) === index;

  const handleInputChange = (e) => {
    const index = parseInt(e.target.value, 10);
    tribes.setPlayer(index);
  };

  const handleStartGame = () => {
    game.start();
    navigate("/game", { replace: true });
  };
</script>

<style>
  .buttons {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .text {
    font-size: 18px;
    margin: 0 0 20px;
  }
  .tribes {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
</style>

<DialogWrapper {toggleDialog}>
  <p class="text">
    Rozpoczynasz rozwój i ekspansję prehistorycznego plemienia. Aby zwyciężyć
    musisz
    <strong>zasiedlić 16 lub więcej prowincji</strong>
    i rozwinąć technologię do ery neolitycznej. Czyli trzeba odkryć<strong>
      co najmniej dwa wynalazki w każdej z 11 kategorii</strong>.
  </p>
  <p class="text">Wybierz plemię:</p>
  <div class="tribes">
    {#each defaultTribes as tribe, index}
      <TribeButton {tribe} {handleInputChange} {selectedInput} {index} />
    {/each}
  </div>
  <div class="buttons">
    <MenuButton on:click={toggleDialog} innerText={'Menu główne'} />
    <MenuButton on:click={handleStartGame} innerText={'Graj'} />
  </div>
</DialogWrapper>
