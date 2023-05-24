import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  categoryState,
  todoSelector,
  todoState,
  categories,
  IForm,
} from "../atoms";
import Todo from "../component/Todo";
import TodoForm from "../component/TodoForm";
import Tab from "../component/Tab";

const Container = styled.div`
  padding: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
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
  }
  .error-msg{
    color: red;
    font-weight: bold;
  }
`;

const TodoList = () => {
  const todos = useRecoilValue(todoSelector);
  const todo = useRecoilValue(todoState);
  const category = useRecoilValue(categoryState);
  const [categoryArr, setCategoryArr] = useRecoilState(categories);
  const todoArr = category === "ALL" ? todo : todos;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmitCategory = ({ value }: IForm) => {
    setCategoryArr((oldArr) => {
      return [...oldArr, value];
    });
    setValue("value", "");
  };
  return (
    <Container>
      <h1>Todo List</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmitCategory)}>
        <input
          type="text"
          placeholder="Write new category"
          {...register("value", {
            required: "Please write category",
            maxLength: {
              value: 10,
              message: "Maximum number of characters is 10.",
            },
          })}
        />
        <button>Add Category</button>
      </form>
      <span className="error-msg">{errors?.value?.message as string}</span>
      <div style={{ display: "flex" }}>
        {categoryArr.map((item, idx) => (
          <Tab key={idx}>{item}</Tab>
        ))}
      </div>
      <TodoForm currentCategory={category}/>
      <br />
      <ul>
        {todoArr.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
