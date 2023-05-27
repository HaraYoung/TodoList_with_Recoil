import { ReactNode } from "react";
import styled from "styled-components";

import { categoryState } from "../atoms";
import { useRecoilState } from "recoil";
import DeleteCategory from "./DeleteCategory";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  svg {
    width: 20%;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    border-radius: 15px;
    &:hover {
      background-color: ${(props) => props.theme.textColor};
      transition: all 0.3s ease;
      color: ${(props) => props.theme.bgColor};
      box-shadow: ${(props) => props.theme.boxShadow};
    }
    &.opacity {
      opacity: 0;
    }
  }
`;

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
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.boxColor};
    line-height: 42px;
    border: none;
    &:hover {
      background: transparent;
      color: ${(props) => props.theme.textColor};
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: ${(props) => props.theme.textColor};
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
    color: ${(props) => props.theme.textColor};
    transition: none;
  }
`;
declare global {
  export interface Window {
    confirm(message: string): boolean;
  }
}
const Tab = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useRecoilState(categoryState);
  const onClickCategory = () => {
    setCategory(children as string);
  };

  return (
    <TabContainer>
      {category === children && (
        <DeleteCategory categoryName={children.toString()} type='list'/>
      )}
      <div>
        <TabBtn
          onClick={() => onClickCategory()}
          className={category === children ? "active" : "tab"}
        >
          <span>{children}</span>
        </TabBtn>
      </div>
    </TabContainer>
  );
};

export default Tab;
