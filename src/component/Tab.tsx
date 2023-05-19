import styled from "styled-components";
import { ECategories, categoryState } from "../atoms";
import { useSetRecoilState } from "recoil";

const TabBtn = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin: 20px;
  outline: none;

  background: #000;
  color: #fff;
  line-height: 42px;
  padding: 0;
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
`;
const Tab = () => {
  const setCategory = useSetRecoilState(categoryState);

  const onClick = (target: ECategories) => {
    setCategory(target);
  };
  return (
    <div>
      <TabBtn onClick={() => onClick(ECategories.ALL)}>
        <span>ALL</span>
      </TabBtn>
      <TabBtn onClick={() => onClick(ECategories.DOING)}>
        <span>DOING</span>
      </TabBtn>
      <TabBtn onClick={() => onClick(ECategories.DONE)}>
        <span>DONE</span>
      </TabBtn>
    </div>
  );
};

export default Tab;
