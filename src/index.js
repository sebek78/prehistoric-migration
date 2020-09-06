import "./styles.scss";
import Model from "./models/Model";
import LayoutController from "./controllers/LayoutController";
import View from "./views/View";
import MainMenu from "./components/main-menu/main-menu";
import GameView from "./components/game-view/game-view";

customElements.define("main-menu", MainMenu);
customElements.define("game-view", GameView);

const model = new Model();
const layoutController = new LayoutController();
export const view = new View(model, layoutController);

layoutController.initialize(model, view);
