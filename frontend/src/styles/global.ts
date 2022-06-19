import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }

    *:focus {
      outline: 0;
    }

    html {
      overflow-x: hidden;
    }

    html, body, #root {
      min-height: 100vh;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: #fff;
      color: #212121;
    }

    body, input, button {
      font: 0.875rem 'Inter', sans-serif;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    ul {
      list-style: none;
    }

    button {
      cursor: pointer;
      background: none;
      border: 0;
    }
`;

export { GlobalStyle };
