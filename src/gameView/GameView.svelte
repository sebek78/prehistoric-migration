<script>
  import { Link } from "svelte-routing";
  import MenuButton from "../homepage/MenuButton.svelte";
</script>

<p>GameView</p>
<Link to="/">
  <MenuButton innerText={'Menu główne'} />
</Link>
