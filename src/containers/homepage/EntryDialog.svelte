<script>
  import { colors } from "../../globalStyles";
  import { navigate } from "svelte-routing";
  import { defaultTribes } from "../../models/tribe/tribe";
  import MenuButton from "./MenuButton.svelte";

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
  .entry-dialog {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .entry-dialog__box {
    box-sizing: border-box;
    background-color: var(--bg-color);
    min-width: 300px;
    width: 50vw;
    margin: 20% auto 0;
    padding: 20px;
    border: 2px solid var(--color);
    border-radius: 4px;
  }
  .entry-dialog__buttons {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .entry-dialog__text {
    font-size: 18px;
    margin: 0 0 20px;
  }
  .entry-dialog__tribes {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .entry-dialog__tribe-button {
    width: 120px;
    margin: 10px;
    border: 2px solid var(--color);
    border-radius: 4px;
  }
  .square {
    margin: 0 auto;
    height: 90px;
    background-color: var(--color);
  }
  .label-text {
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    margin: 0;
  }
  .input {
    display: block;
    height: 20px;
    margin: 0px auto;
  }
</style>

<div
  style="--bg-color: {colors.bgColor}; --color:{colors.primaryDark}"
  class="entry-dialog">
  <div class="entry-dialog__box">
    <p class="entry-dialog__text">
      Rozpoczynasz rozwój i ekspansję prehistorycznego plemienia. Aby zwyciężyć
      musisz
      <strong>zasiedlić 16 lub więcej prowincji</strong>
      i rozwinąć technologię do ery neolitycznej. Czyli trzeba odkryć<strong>
        co najmniej dwa wynalazki w każdej z 11 kategorii</strong>.
    </p>
    <p class="entry-dialog__text">Wybierz plemię:</p>
    <div class="entry-dialog__tribes">
      {#each defaultTribes as tribe, index}
        <label class="entry-dialog__tribe-button" style="--color:{tribe.color}">
          <div class="square" style="--color:{tribe.color}" />
          <p class="label-text">{tribe.name}</p>
          <input
            class="input"
            on:change={handleInputChange}
            type="radio"
            name="tribe"
            id={tribe.name}
            checked={selectedInput(index)}
            value={index} />
        </label>
      {/each}
    </div>
    <div class="entry-dialog__buttons">
      <MenuButton on:click={toggleDialog} innerText={'Menu główne'} />
      <MenuButton on:click={handleStartGame} innerText={'Graj'} />
    </div>
  </div>
</div>
