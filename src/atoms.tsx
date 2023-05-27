import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const darkmode = atom({
  key: "darkTheme",
  default: false,
});

export interface IForm {
  value: string;
}

export const categories = atom<string[]>({
  key: "categories",
  default: ["ALL", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export interface ITodo {
  id: number;
  text: string;
  category: string;
}

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//사용자가 선택한 카테고리
export const categoryState = atom<string>({
  key: "category",
  default: "ALL",
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

export const editState = atom<boolean>({
  key: 'edit',
  default: false,
})