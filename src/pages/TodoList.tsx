import { useRecoilState, useRecoilValue } from "recoil";
import {
  IForm,
  categoryState,
  todoSelector,
  todoState,
  categories,
} from "../atoms";
import Todo from "../component/Todo";
import TodoForm from "../component/TodoForm";
import Tab from "../component/Tab";

import { useForm } from "react-hook-form";

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
  const onSubmit = ({ value }: IForm) => {
    setCategoryArr((oldArr) => {
      return [...oldArr, value];
    });
    setValue("value", "");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="add category"
          {...register("value", {
            required: "Please write category",
          })}
        />
        <button>add category</button>
      </form>
      <span>{errors?.value?.message as string}</span>
      <TodoForm />
      <br />
      <div style={{display: 'flex'}}>
        {categoryArr.map((item, idx) => (
          <Tab key={idx}>{item}</Tab>
        ))}
      </div>
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
