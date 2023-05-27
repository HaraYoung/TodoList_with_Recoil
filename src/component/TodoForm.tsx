import { memo } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { IForm, todoState } from "../atoms";
interface ICurrentCategory {
  currentCategory: string;
}

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
      <form onSubmit={handleSubmit(onSubmitTodo)}>
        <input
          type="text"
          placeholder="Write a todo!"
          {...register(`value`, {
            required: "Please write todo",
          })}
        />
        <button>Add To Do</button>
      </form>
      <div style={{ textAlign: "center" }}>
        <span className="error-msg">{errors?.value?.message as string}</span>
      </div>
    </div>
  );
});

export default TodoForm;
