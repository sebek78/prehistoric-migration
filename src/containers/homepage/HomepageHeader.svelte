<script>
  import { colors } from "../../globalStyles";
  let logo = "assets/logo-premig.svg";
</script>

<style>
  hgroup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 90vw;
    margin: 2vw auto;
    max-width: 800px;
  }
  .title {
    display: block;
    width: 100%;
    height: auto;
  }
  h2 {
    color: var(--color);
    margin: 1vw 0 0.5vw;
    font-size: min(5vw, 24px);
  }
  h3 {
    color: tomato;
    margin: 0.5vw 0 1vw;
    font-size: min(5vw, 20px);
  }
</style>

<hgroup>
  <h1><img class="title" src={logo} alt="Prehistoryczna migracja" /></h1>
  <h2 style="--color: {colors.primaryDark}">Prowadź prehistoryczne plemię</h2>
  <h3>Gra jeszcze nie grywalna</h3>
</hgroup>
