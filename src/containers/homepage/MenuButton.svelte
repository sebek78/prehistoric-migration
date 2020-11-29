<script>
  import { colors } from "../../globalStyles";
  export let innerText = "";
</script>

<style>
  button {
    box-sizing: border-box;
    padding: 6px 12px 6px 12px;
    margin: 8px;
    min-width: 160px;
    width: max-content;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    border: none;
    outline: none;
    background-color: var(--bg-action);
    color: var(--link-color);
    cursor: pointer;
    white-space: nowrap;
  }
</style>

<button
  style="--bg-action: {colors.bgAction};--link-color: {colors.linkColor}"
  on:click>
  {innerText}
</button>
