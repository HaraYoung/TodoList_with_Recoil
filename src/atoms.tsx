import { atom, selector } from "recoil";

export interface IForm {
  value: string;
}


export const categories = atom<string[]>({
  key: "categories",
  default: ['ALL', 'DOING', 'DONE'],
});

export interface ITodo {
  id: number;
  text: string;
  category: string;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

//사용자가 선택한 카테고리
export const categoryState = atom<string>({
  key: "category",
  default: 'ALL',
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
