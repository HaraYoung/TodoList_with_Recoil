import { ECategories, ITodo, todoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Todo = ({ id, text, category }: ITodo) => {
  const setTodo = useSetRecoilState(todoState);
  const onClickCategory = (newCategory: ITodo["category"]) => {
    setTodo((oldCategory) => {
      const targetIdx = oldCategory.findIndex((item) => item.id === id);
      const changeCategory = { id, text, category: newCategory };
      return [
        ...oldCategory.slice(0, targetIdx),
        changeCategory,
        ...oldCategory.slice(targetIdx + 1),
      ];
    });
  };

  return (
    <li>
      {category !== "DOING" && (
        <button onClick={() => onClickCategory(ECategories.DOING)}>
          DOING
        </button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClickCategory(ECategories.DONE)}>DONE</button>
      )}
      <span>{text}</span>
      <button>EDIT</button>
      <button>DELETE</button>
    </li>
  );
};

export default Todo;
