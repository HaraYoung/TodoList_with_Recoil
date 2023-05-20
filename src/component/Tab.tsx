import styled from "styled-components";

import { categoryState } from "../atoms";
import { useRecoilState } from "recoil";
import { ReactNode } from "react";

const TabBtn = styled.button`
  text-align: center;
  min-width: 5em;
  max-width: 5em;
  height: 40px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin: 0.5em;
  outline: none;
  word-break: keep-all;
  &.tab {
    background:${(props)=> props.theme.textColor};
    color: ${(props)=> props.theme.boxColor};
    line-height: 42px;
    border: none;
    &:hover {
      background: transparent;
      color: ${(props)=> props.theme.textColor};
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background:${(props)=> props.theme.textColor};
      transition: 400ms ease all;
    }
    &:after {
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }
    &:hover:before,
    &:hover:after {
      width: 100%;
      transition: 800ms ease all;
    }
  }
  &.active {
    background: transparent;
    color: ${(props)=> props.theme.textColor};
    transition: none;
  }
`;
const Tab = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = () => {
    setCategory(children as string);
  };
  return (
    <div>
      <TabBtn
        onClick={() => onClick()}
        className={category === children ? "active" : "tab"}
      >
        <span>{children}</span>
      </TabBtn>
    </div>
  );
};

export default Tab;
