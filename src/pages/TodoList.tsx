import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { categoryState, todoSelector, todoState, categories } from "../atoms";
import Todo from "../component/Todo";
import TodoForm from "../component/TodoForm";
import Tab from "../component/Tab";
import AddCategoryForm from "../component/AddCategoryForm";

const Container = styled.div`
  padding: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoList = () => {
  const todos = useRecoilValue(todoSelector);
  const todo = useRecoilValue(todoState);
  const category = useRecoilValue(categoryState);
  const categoryArr = useRecoilValue(categories);
  const todoArr = category === "ALL" ? todo : todos;
  return (
    <Container>
      <AddCategoryForm />
      <div style={{ display: "flex" }}>
        {categoryArr.map((item, idx) => (
          <Tab key={idx}>{item}</Tab>
        ))}
      </div>
      <TodoForm currentCategory={category} />
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
