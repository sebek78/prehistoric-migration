<script>
  //import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
  import { Link } from "svelte-routing";
  import MenuButton from "../homepage/MenuButton.svelte";
  import Map from "./Map.svelte";
  export let map;
  /*
  beforeUpdate(() => {
    console.log("before update");
  });
  onMount(() => {
    console.log("on mount");
  });
  afterUpdate(() => {
    console.log("after upadte");
  });
  onDestroy(() => {
    console.log("on destroy");
  });
*/
</script>

<Link to="/">
  <MenuButton innerText={'Menu główne'} />
</Link>
<p>Widok gry</p>
<Map {map} />
