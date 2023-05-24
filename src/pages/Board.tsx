import {
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { todoState, categories } from "../atoms";
import BoardItem from "../component/BoardItem";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    //source board가 destination board와 같은 경우
    if (destination?.droppableId === source.droppableId) {
      const copyTodo = toDos.filter(
        (item) => item.category === source.droppableId
      ); //변화가 일어난 보드
      const remainTodo = toDos.filter(
        (item) => item.category !== source.droppableId
      ); //나머지 보드
      const sliceTarget = copyTodo[source.index];
      copyTodo.splice(source.index, 1);
      copyTodo.splice(destination?.index, 0, sliceTarget);
      setToDos(remainTodo.concat(copyTodo));
    }
    //source board가 destination board와 다른 경우
    if (destination?.droppableId !== source.droppableId) {
      const startBoard = toDos.filter(
        (item) => item.category === source.droppableId
      );
      const targetBoard = toDos.filter(
        (item) => item.category === destination.droppableId
      );
      //target 카테고리 변경
      const changeCategory = [...startBoard];
      changeCategory[source.index] = {
        ...changeCategory[source.index],
        category: destination.droppableId,
      };
      startBoard.splice(source.index, 1);
      targetBoard.splice(destination?.index, 0, changeCategory[source.index]);
      setToDos(startBoard.concat(targetBoard));
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
