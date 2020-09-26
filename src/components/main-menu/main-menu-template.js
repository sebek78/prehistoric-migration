import logo from "../../assets/logo-premig.svg";

const template = document.createElement("template");

template.innerHTML = /*html*/ `
<main>
    <hgroup>
        <img class="title" src=${logo} alt="Prehistoryczna migracja" />
        <h2>Prowadź prehistoryczne plemię</h2>
        <h3>Gra jeszcze nie grywalna</h3>
    </hgroup>
    <div class="wrapper">
        <ul class="featuresList">
            <li>Turowa gra strategiczna</li>
            <li>Dla pojedynczego gracza</li>
            <li>Styl gry planszowej i karcianej</li>
            <li>Wysoka losowość<li>
            <li>Prehistoryczna era</li>
        </ul>
        <nav class="buttons">
            <button class="button" id="newGameBtn">Nowa gra</button>
        </nav>
    </div>
</main>
<footer>
    <a class="link" href="http://mybytes.pl">mybytes.pl</a>
</footer>
`;

export default template;
