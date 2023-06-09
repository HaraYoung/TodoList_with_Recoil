import { memo } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { IForm, todoState } from "../atoms";
interface ICurrentCategory {
  currentCategory: string;
}

const Form = styled.form`
  margin: 1em;
  input {
    padding: 0.2em 0.5em;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.textColor};
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
  }
  button {
    display: inline-block;
    margin-left: 1em;
    padding: 0.5em 1em;
    border: none;
    background-color: ${(props) => props.theme.boxColor};
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    &:hover {
      background-color: transparent;
      transition: 0.3s ease all;
    }
  }
`;

const TodoForm = memo(({ currentCategory }: ICurrentCategory) => {
  const setTodos = useSetRecoilState(todoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmitTodo = ({ value }: IForm) => {
    setTodos((oldTodos) => [
      {
        id: Date.now(),
        text: value,
        category: currentCategory === "ALL" ? "DOING" : currentCategory,
      },
      ...oldTodos,
    ]);
    setValue("value", "");
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitTodo)}>
        <input
          type="text"
          placeholder="Write a todo!"
          {...register(`value`, {
            required: "Please write todo",
          })}
        />
        <button>Add To Do</button>
      </Form>
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "red", fontWeight: "bold" }}>
          {errors?.value?.message as string}
        </span>
      </div>
    </div>
  );
});

export default TodoForm;
