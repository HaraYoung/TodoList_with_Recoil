import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, categories, todoState } from "../atoms";

import EventHandlersBtn from "./EventHandlersBtn";

const TodoContainer = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 5px;
  margin: 0.5em;
  div {
    padding: 0.5em;
    &:first-child {
      span {
        display: inline-block;
        padding: 1em;
        min-width: 10em;
        max-width: 10em;
        font-weight: 600;
        word-break: keep-all;
        line-height: 1.5;
      }
      button {
        text-align: center;
        margin: 0 0.2em;
        width: 5em;
        padding: 0.2em 0.5em;
        border: 2px solid ${(props) => props.theme.textColor};
        font-family: "Lato", sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        color: ${(props) => props.theme.textColor};
        &:after {
          position: absolute;
          content: "";
          top: 4px;
          left: 5px;
          width: 82%;
          height: 61%;
          border: 1px solid ${(props) => props.theme.textColor};
          opacity: 0;
          transition: all 0.3s ease;
        }
        &:hover:after {
          opacity: 1;
        }
      }
    }
    &:last-child {
      margin-bottom: 0.5em;
      padding-top: 0;
      padding-left: 1em;
    }
  }
`;

const CategoryBtn = styled.button`
  color: ${(props) => props.theme.bgColor};
  margin-right: 0.5em;
  padding: 0.3em 0.5em;
  background-color: ${(props) => props.theme.boxTextColor};
  border: none;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    transition: 0.3s ease all;
  }
`;

const Todo = ({ id, text, category }: ITodo) => {
  const categoryArr = useRecoilValue(categories);
  const setTodo = useSetRecoilState(todoState);
  const onClickCategory = (newCategory: ITodo["category"]) => {
    setTodo((oldCategory) => {
      const targetIdx = oldCategory.findIndex((item) => item.id === id);
      const changeCategory = { id, text, category: newCategory };
      return [
        ...oldCategory.slice(0, targetIdx),
        changeCategory,
        ...oldCategory.slice(targetIdx + 1),
      ];
    });
  };
  return (
    <TodoContainer>
      <div>
        <span>{text}</span>
        <EventHandlersBtn
          id={id}
          text={text}
          category={category}
          isevent="EDIT"
          type="list"
          $isDragging={false}
        />
        <EventHandlersBtn
          id={id}
          text={text}
          category={category}
          isevent="DELETE"
          type="list"
          $isDragging={false}
        />
      </div>
      <div>
        {categoryArr.map(
          (item, idx) =>
            item !== "ALL" &&
            category !== item && (
              <CategoryBtn key={idx} onClick={() => onClickCategory(item)}>
                {item}
              </CategoryBtn>
            )
        )}
      </div>
    </TodoContainer>
  );
};

export default Todo;
