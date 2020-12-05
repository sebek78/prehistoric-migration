<script>
  export let tribe, handleInputChange, selectedInput, index;
</script>

<style>
  .tribe-button {
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

<label class="tribe-button" style="--color:{tribe.color}">
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
