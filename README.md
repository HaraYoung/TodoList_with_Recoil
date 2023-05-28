# TodoList_with_Recoil
![img](./src/asset/img/Desktop%20-%201.png)

Recoil을 이용한 To Do App입니다. 일반적인 list 모드와 드래그가 가능한 board모드가 있습니다.

## 기능

- To Do를 추가, 삭제, 수정할 수 있다.
- 카테고리를 추가하고 삭제할 수 있다.
- Dark테마와 Lighte테마를 버튼을 통해 변경할 수 있다.
- To Do List는 list모드와 board모드가 있다.
- board모드에서는 To Do item을 드래그로 옮길 수 있다.
- list모드에서 카테고리를 선택하면 카테고리 별 목록을 볼 수 있다.
- list모드에서는 카테고리를 선택한 상태에서 To Do를 추가하면 선택한 카테고리의 To Do가 생성된다.
    - ALL 카테고리에서 To Do 추가시 DOING 카테고리로 추가된다.
- board모드에서는 각 카테고리 별 To Do를 추가 할 수 있게 input이 있다.
- 작성된 To Do와 카테고리는 로컬 스토리지에 저장된다.

## 사용한 기술

- React
- Typescript
- Recoil
- styled-components
- react-hook-form
- react-beautiful-dnd
- recoil-persist