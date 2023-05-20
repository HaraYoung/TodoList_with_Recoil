import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, categories, todoState } from "../atoms";

const Btn = styled.button`
  margin: 0 0.2em;
  width: 80px;
  padding: 0.2em 0.5em;
  border: 2px solid #000;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  &:after {
    position: absolute;
    content: "";
    top: 5px;
    left: 6px;
    width: 82%;
    height: 60%;
    border: 1px solid #000;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover:after {
    opacity: 1;
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
    setTodo((todo) => {
      const targetIdx = todo.findIndex((item) => item.id === id);
      return [...todo.slice(0, targetIdx).concat(...todo.slice(targetIdx + 1))];
    });
  };
  return (
    <li>
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
              <button key={idx} onClick={() => onClickCategory(item)}>
                {item}
              </button>
            )
        )}
      </div>
    </li>
  );
};

export default Todo;
