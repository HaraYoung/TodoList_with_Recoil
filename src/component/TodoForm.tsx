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
  const onSubmit = ({ value }: IForm) => {
    setTodos((oldTodos) => [
      { id: Date.now(), text: value, category: 'DOING' },
      ...oldTodos,
    ]);
    setValue("value", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="write a todo!"
          {...register("value", {
            required: "Please write todo",
          })}
        />
        <button>add todo</button>
      </form>

      <span>{errors?.value?.message as string}</span>
    </div>
  );
};

export default TodoForm;
