import Reset from "styled-reset";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faListUl,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import { darkTheme, lightTheme } from "./Themes";
import { darkmode } from "./atoms";
import { useRecoilState } from "recoil";

import TodoList from "./pages/TodoList";
import Board from "./pages/Board";
import NotFound from "./component/NotFound";

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
  padding: ${(props) => (props.darkmode === "true" ? "1em" : "1em 1.2em")};
  border-radius: 50px;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.textColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: pointer;
  &:hover {
    box-shadow: #00adb5 0px 2px 10px 0px inset;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  padding-top: 1em;
`;

const ToggleBtb = styled(Link)<{ isicon: string; }>`
  position: fixed;
  z-index: 9999;
  bottom: 12%;
  left: 3%;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  padding: ${(props) => (props.isicon === "list" ? "0.7em" : "0.7em 0.9em")};
  border-radius: 30px;
  &:hover {
    box-shadow: ${(props)=> props.theme.textColor} 0px 2px 10px 0px inset;
  }
`;

function App() {
  const [isDark, setIsDark] = useRecoilState(darkmode);
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Helmet>
          <title>To Do App</title>
        </Helmet>
        {currentUrl === "/" ? (
          <ToggleBtb to="board" isicon="board">
            <FontAwesomeIcon icon={faClipboard} size="2x" />
          </ToggleBtb>
        ) : (
          <ToggleBtb to="/" isicon="list">
            <FontAwesomeIcon icon={faListUl} size="2x" />
          </ToggleBtb>
        )}
        <Title>Todo {currentUrl === "/" ? "List" : "Board"} </Title>
        <ThemeBtn
          onClick={() => setIsDark((curr) => !curr)}
          darkmode={isDark.toString()}
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} size="2x" />
        </ThemeBtn>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/board" element={<Board />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
