import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, categories, todoState } from "../atoms";

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
    }
    &:last-child {
      margin-bottom: 0.5em;
      padding-top: 0;
      padding-left: 1em;
    }
  }
`;

const Btn = styled.button`
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
  const [edit, setEdit] = React.useState(false);
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

  const onClickEdit = (id: ITodo["id"], text: ITodo["text"]) => {
    if (!edit) {
      setEdit(true);
      let newText: string | null = prompt(
        "Please enter the content to be modified.",
        text
      );
      //사용자가 빈 문자열을 입력시 alert을 표시하고 prompt를 다시 보여준다.
      while (newText === "") {
        alert("Please enter valid details!");
        newText = prompt("Please enter the content to be modified.", text);
      }
      if (newText === null) {
        newText = text; // 사용자가 취소 버튼을 누른 경우 기존 텍스트 유지
      }
      const editTodo = { id, text: newText as string, category };
      setTodo((todo) => {
        const targetIdx = todo.findIndex((item) => item.id === id);
        return [
          ...todo.slice(0, targetIdx),
          editTodo,
          ...todo.slice(targetIdx + 1),
        ];
      });
      setEdit(false);
    }
  };
  const onClickDelete = (id: ITodo["id"]) => {
    let deleteAlert = window.confirm(
      "Are you sure you want to delete the selected to do?"
    );
    if (deleteAlert) {
      window.alert("Deleted.");
      setTodo((todo) => {
        const targetIdx = todo.findIndex((item) => item.id === id);
        return [
          ...todo.slice(0, targetIdx).concat(...todo.slice(targetIdx + 1)),
        ];
      });
    } else window.alert("Canceled.");
  };
  return (
    <TodoContainer>
      <div>
        <span>{text}</span>
        <Btn onClick={() => onClickEdit(id, text)}>EDIT</Btn>
        <Btn onClick={() => onClickDelete(id)}>DELETE</Btn>
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
