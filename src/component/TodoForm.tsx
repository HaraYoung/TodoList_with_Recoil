import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IForm, categoryState, todoState } from "../atoms";

const TodoForm = () => {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmitTodo = ({ value }: IForm) => {
    let newCategory = category;
    if (newCategory === "ALL") {
      newCategory = "DOING";
    }
    setTodos((oldTodos) => [
      { id: Date.now(), text: value, category: newCategory },
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
      <div style={{textAlign:'center'}}>
        <span className="error-msg">{errors?.value?.message as string}</span>
      </div>
    </div>
  );
};

export default TodoForm;
