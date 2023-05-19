import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Reset from "styled-reset";
import styled from "styled-components";
import { darkTheme, lightTheme } from "./Themes";
import TodoList from "./pages/TodoList";

const GlobalStyle = createGlobalStyle` 
  ${Reset}
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
  body{
    font-family: 'Montserrat', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: initial;
  }
`;

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <TodoList/>
      </ThemeProvider>
    </>
  );
}

export default App;
