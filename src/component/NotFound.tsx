import React from "react";
import styled from "styled-components";
import errorImg from "../asset/img/404error-img.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5em 0;
  p {
    width: 60%;
    padding: 1em;
    word-break: keep-all;
    text-align: center;
    margin-bottom: 1em;
  }
  a{
    padding: 0.5em 1em;
    background-color: white;
    border-radius: 15px;
    font-weight: 800;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const NotFound = () => {
  return (
    <Container>
      <img src={errorImg} alt="404-error" />
      <p>
        You entered an address that does not exist,
        or the address of the requested page has been changed or deleted and cannot
        be found.
      </p>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default NotFound;
