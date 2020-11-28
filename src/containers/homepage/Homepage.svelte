<script>
  import { Link } from "svelte-routing";
  import MenuButton from "./MenuButton.svelte";
  let logo = "assets/logo-premig.svg";
</script>

<style>
  /* :root {
		--bg-color: "#fbe1bc",
		--bg-action: "#B5C177",
		--font-dark: "#583709",
		--link-color: "#2B4227",
	}*/
  main {
    font-family: "Underdog", cursive;
  }
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
    color: #583709; /* var(--font-dark); */
    margin: 1vw 0 0.5vw;
    font-size: min(5vw, 24px);
  }
  h3 {
    color: tomato;
    margin: 0.5vw 0 1vw;
    font-size: min(5vw, 20px);
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
  .featuresList {
    padding: 2vw 0;
    list-style-type: none;
    margin: 0 auto;
    max-width: 320px;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
  }
  .buttons {
    padding: 2vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
  }
  footer {
    width: 100vw;
    padding: 1vw 0;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .link {
    color: #2b4227; /* var(--link-color); */
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    line-height: 24px;
  }
</style>

<main>
  <hgroup>
    <h1><img class="title" src={logo} alt="Prehistoryczna migracja" /></h1>
    <h2>Prowadź prehistoryczne plemię</h2>
    <h3>Gra jeszcze nie grywalna</h3>
  </hgroup>
  <div class="wrapper">
    <ul class="featuresList">
      <li>Turowa gra strategiczna</li>
      <li>Dla pojedynczego gracza</li>
      <li>Styl gry planszowej i karcianej</li>
      <li>Wysoka losowość</li>
      <li />
      <li>Prehistoryczna era</li>
    </ul>
    <nav class="buttons">
      <Link to="game">
        <MenuButton innerText={'Nowa gra'} />
      </Link>
    </nav>
  </div>
</main>
<footer><a class="link" href="http://mybytes.pl">mybytes.pl</a></footer>
