import { useRecoilValue } from "recoil";
import { categoryState, todoSelector, todoState } from "../atoms";
import Todo from "../component/Todo";
import TodoForm from "../component/TodoForm";
import Tab from "../component/Tab";

const TodoList = () => {
  const todos = useRecoilValue(todoSelector);
  const todo = useRecoilValue(todoState);
  const category = useRecoilValue(categoryState);
  const todoArr = category === "ALL" ? todo : todos;
  return (
    <div>
      <h1>Todo List</h1>
      <br />
      <form>
        <input type="text" placeholder="add category" />
        <button>add category</button>
      </form>
      <TodoForm />
      <br />
      <Tab />
      <br />
      <ul>
        {todoArr.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
