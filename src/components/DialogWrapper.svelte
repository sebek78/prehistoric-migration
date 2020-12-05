<script>
  import { colors } from "../globalStyles";
  export let toggleDialog;

  const handleClose = (e) => e.target.id === "background" && toggleDialog();
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
</style>

<div
  style="--bg-color: {colors.bgColor}; --color:{colors.primaryDark}"
  class="entry-dialog"
  id="background"
  on:click={handleClose}>
  <div class="entry-dialog__box" id="box">
    <slot />
  </div>
</div>
