import Reset from "styled-reset";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { Routes, Route, Link, useLocation } from "react-router-dom";

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
    box-shadow: ${(props) => props.theme.hoverBoxShadow};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;

function App() {
  const [isDark, setIsDark] = useRecoilState(darkmode);
  const location = useLocation();
  const currentUrl = location.pathname; // '/board'
  console.log(currentUrl);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Helmet>
          <title>To Do App</title>
        </Helmet>
        {currentUrl === "/" ? (
          <Link to="board">Board</Link>
        ) : (
          <Link to="/">List</Link>
        )}
        <Title>Todo {currentUrl === "/" ? "List" : "Board"}</Title>
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
