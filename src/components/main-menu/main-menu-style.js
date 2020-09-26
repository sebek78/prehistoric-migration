import { COLORS, GLOBAL } from "../../constants";

const style = document.createElement("style");

style.textContent = /*css*/ `
  main {
    font-family: 'Underdog', cursive;
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
    display:block;
    width: 100%;
    height: auto;
  }
  h2 {
      color: ${COLORS.fontDark};
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
    line-height: ${GLOBAL.lineHeight};
  }
  .buttons {
    padding: 2vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
  }
  .button {
    box-sizing: border-box;
    padding: 6px 12px 6px 12px;
    margin: 8px;
    width: 160px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    line-height: ${GLOBAL.lineHeight};
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    border: none;
    outline: none;
    background-color: ${COLORS.bgAction};
    color: ${COLORS.linkColor};
    cursor: pointer;
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
    color: ${COLORS.linkColor};
    font-family: 'Nunito', sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 16px;
    line-height: ${GLOBAL.lineHeight};
  }
`;

export default style;
