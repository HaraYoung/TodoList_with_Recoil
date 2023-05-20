import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IForm, todoState } from "../atoms";

const TodoForm = () => {
  const setTodos = useSetRecoilState(todoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmitTodo = ({ value }: IForm) => {
    setTodos((oldTodos) => [
      { id: Date.now(), text: value, category: 'DOING' },
      ...oldTodos,
    ]);
    setValue("value", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitTodo)}>
        <input
          type="text"
          placeholder="Write a todo!"
          {...register("value", {
            required: "Please write todo",
          })}
        />
        <button>Add To Do</button>
      </form>
      <span>{errors?.value?.message as string}</span>
    </div>
  );
};

export default TodoForm;
