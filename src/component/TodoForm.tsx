import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ECategories, todoState } from "../atoms";

const TodoForm = () => {
  const setTodos = useSetRecoilState(todoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ todo }: any) => {
    setTodos((oldTodos) => [
      { id: Date.now(), text: todo, category: ECategories.DOING },
      ...oldTodos,
    ]);
    setValue("todo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="write a todo!"
          {...register("todo", {
            required: "Please write todo",
          })}
        />
        <button>add todo</button>
      </form>

      <span>{errors?.todo?.message as string}</span>
    </div>
  );
};

export default TodoForm;
