import styled from "styled-components";

import { categoryState } from "../atoms";
import { useRecoilState } from "recoil";
import { ReactNode } from "react";

const TabBtn = styled.button`
  width: 130px;
  height: 40px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin: 20px;
  outline: none;
  &.tab {
    background: #000;
    color: #fff;
    line-height: 42px;
    border: none;
    &:hover {
      background: transparent;
      color: #000;
      box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
        7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: #000;
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
    color: #000;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
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
