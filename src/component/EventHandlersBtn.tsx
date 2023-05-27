import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { todoState, ITodo, editState } from "../atoms";

const Btn = styled.button<{ $isDragging: boolean }>`
  border: none;
  cursor: pointer;
  svg {
    padding: 0.2em;
    color: ${(props) => props.theme.textColor};
  }
  .edit {
    padding-right: 0.2em;
    &:hover {
      color: #86c8bc;
      transition: 0.2s ease all;
    }
  }
  .delete {
    &:hover {
      color: #f96666;
      transition: 0.2s ease all;
    }
  }
  background-color: ${(props) =>
    props.$isDragging ? props.theme.accentColor : props.theme.bgColor};
`;

const EventHandlersBtn = ({
  id,
  text,
  category,
  isevent,
  type,
  $isDragging,
}: ITodo & { isevent: string; type: string; $isDragging: boolean }) => {
  const setTodo = useSetRecoilState(todoState);
  const [edit, setEdit] = useRecoilState(editState);

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
    <Btn
      $isDragging={$isDragging}
      onClick={() =>
        isevent === "EDIT" ? onClickEdit(id, text) : onClickDelete(id)
      }
    >
      {type === "list" ? (
        isevent
      ) : isevent === "EDIT" ? (
        <FontAwesomeIcon icon={faPen} className="edit" />
      ) : (
        <FontAwesomeIcon icon={faCircleXmark} className="delete" />
      )}
    </Btn>
  );
};

export default EventHandlersBtn;
