<script>
  import FeatureList from "./FeatureList.svelte";
  import HomepageFooter from "./HomepageFooter.svelte";
  import HomepageHeader from "./HomepageHeader.svelte";
  import MainMenu from "./MainMenu.svelte";

  export let data;
</script>

<style>
  main {
    font-family: "Underdog", cursive;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
    flex-wrap: wrap-reverse;
    width: 90vw;
    margin: 2vw auto;
    max-width: 800px;
  }
</style>

<main>
  <HomepageHeader />
  <div class="wrapper">
    <FeatureList />
    <MainMenu {data} />
  </div>
</main>
<HomepageFooter />
