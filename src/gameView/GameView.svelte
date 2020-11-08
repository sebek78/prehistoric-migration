<script>
  import MenuButton from "../homepage/MenuButton.svelte";

  export let view;
  function handleClick() {
    view.goHomepage();
  }
</script>

<p>GameView</p>
<MenuButton innerText={'Menu główne'} {handleClick} />
