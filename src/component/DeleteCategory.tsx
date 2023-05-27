import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { categories, categoryState, todoState } from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const DeleteCategory = ({
  categoryName,
  type,
}: {
  categoryName: string;
  type: string;
}) => {
  const todo = useRecoilValue(todoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const setCategories = useSetRecoilState(categories);
  const onClickDeleteCategory = (argument: string) => {
    const isCategory = todo.filter((item) => {
      return item.category === argument;
    });
    if (isCategory.length > 0)
      alert("Delete all items in the category and then delete the category");
    else {
      let deleteAlert = window.confirm(
        "Are you sure you want to delete the category?"
      );
      if (deleteAlert) {
        window.alert("Deleted.");
        setCategories((arr) => {
          const targetIdx = arr.findIndex(
            (item) => item === (type === "list" ? category : categoryName)
          );
          return [
            ...arr.slice(0, targetIdx).concat(...arr.slice(targetIdx + 1)),
          ];
        });
        if (type === "list") setCategory("ALL");
      } else window.alert("Canceled.");
    }
  };
  return (
    <FontAwesomeIcon
      icon={faCircleXmark}
      onClick={() => onClickDeleteCategory(categoryName)}
      className={
        categoryName !== "ALL" &&
        categoryName !== "DOING" &&
        categoryName !== "DONE"
          ? ""
          : "opacity"
      }
    />
  );
};

export default DeleteCategory;
