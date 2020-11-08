<script>
  export let innerText = "Click";
  export let handleClick;
</script>

<style>
  button {
    box-sizing: border-box;
    padding: 6px 12px 6px 12px;
    margin: 8px;
    width: 160px;
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
    background-color: #b5c177; /* var(--bg-action); */
    color: #2b4227; /* var(--link-color); */
    cursor: pointer;
  }
</style>

<button on:click={handleClick}>{innerText}</button>
