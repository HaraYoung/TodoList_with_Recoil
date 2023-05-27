import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { todoState, categories } from "../atoms";
import BoardItem from "../component/BoardItem";
import AddCategoryForm from "../component/AddCategoryForm";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
  padding-top: 1em;
  margin-top: 3em;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Board = () => {
  const [toDos, setToDos] = useRecoilState(todoState);
  const category = useRecoilValue(categories);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    // source board가 destination board와 같은 경우
    if (destination?.droppableId === source.droppableId) {
      const copyTodo = toDos.filter(
        (item) => item.category === source.droppableId
      ); //변화가 일어난 보드
      const startSpot = copyTodo[source.index];
      const endSpot = copyTodo[destination.index];
      //원본 배열에서의 source와 destination의 index값
      const startItem = toDos.findIndex((item) => item.id === startSpot.id);
      const endItem = toDos.findIndex((item) => item.id === endSpot.id);
      const todo = [...toDos]; //원본 배열 복사
      todo.splice(startItem, 1);
      todo.splice(endItem, 0, startSpot);
      setToDos(todo);
    }

    //source board가 destination board와 다른 경우
    if (destination?.droppableId !== source.droppableId) {
      console.log(toDos);
      const startBoard = toDos.filter(
        (item) => item.category === source.droppableId
      );
      const targetBoard = toDos.filter(
        (item) => item.category === destination.droppableId
      );
      const startSpot = startBoard[source.index];
      //destination.index => 옮기려는 index는 Board의 마지막 아이템 뒤에 index일 경우 undefined
      //undefined일 경우 Board의 마지막 index 아이템을 가져온다.
      const endSpot =
        destination.index === targetBoard.length
          ? targetBoard[targetBoard.length - 1]
          : targetBoard[destination.index];
      const copyTodo = [...toDos];
      const startItem = copyTodo.findIndex((item) => item.id === startSpot.id);
      let endItem = copyTodo.findIndex((item) => item.id === endSpot?.id);
      //target 카테고리 변경
      const changeCategory = (copyTodo[startItem] = {
        ...copyTodo[startItem],
        category: destination.droppableId,
      });
      if (endItem > startItem) {
        endItem = endItem - 1; // startItem이 제거되었으므로 endItem의 인덱스를 조정
      }
      copyTodo.splice(startItem, 1);
      copyTodo.splice(
        destination.index === targetBoard.length ? endItem + 1 : endItem,
        0,
        changeCategory
      );
      setToDos(copyTodo);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <span style={{textAlign: 'center', paddingTop: '1em'}}>
          <AddCategoryForm />
        </span>
        <Wrapper>
          <Boards>
            {category.map(
              (board) =>
                board !== "ALL" && (
                  <BoardItem key={board} boardId={board} category={board} />
                )
            )}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default Board;
