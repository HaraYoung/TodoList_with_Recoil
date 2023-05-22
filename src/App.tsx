import Reset from "styled-reset";
import styled,{ ThemeProvider, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from 'react-helmet';

import { darkTheme, lightTheme } from "./Themes";
import { darkmode } from "./atoms";
import { useRecoilState } from "recoil";

import TodoList from "./pages/TodoList";
import Board from "./pages/Board";

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
const ThemeBtn = styled.button<{ darkmode: string }>`
  border: none;
  position: fixed;
  z-index: 9999;
  left: 3%;
  bottom: 3%;
  padding: ${(props) =>
    props.darkmode === "true" ? "1em" : "1em 1.2em"};
  border-radius: 50px;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.textColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: pointer;
  &:hover {
    box-shadow: ${(props) => props.theme.hoverBoxShadow};
  }
`;

function App() {
  const [isDark, setIsDark] = useRecoilState(darkmode);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Helmet>
          <title>To Do App</title>
        </Helmet>
        <TodoList />
        {/* <Board /> */}
        <ThemeBtn
          onClick={() => setIsDark((curr) => !curr)}
          darkmode={isDark.toString()}
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} size="2x" />
        </ThemeBtn>
      </ThemeProvider>
    </>
  );
}

export default App;
