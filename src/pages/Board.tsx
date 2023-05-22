import { memo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import BoardItem from "../component/BoardItem";
import { useRecoilState } from "recoil";
import { testTodo } from "../atoms";

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

const Board = memo(() => {
  const [toDos, setToDos] = useRecoilState(testTodo);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    //source board가 destination board와 같은지 체크
    if (destination?.droppableId === source.droppableId) {
      //변화가 일어난 보드에만 복사
      const copyTodo = [...toDos[source.droppableId]];
      copyTodo.splice(source.index, 1);
      copyTodo.splice(destination?.index, 0, draggableId);
      setToDos({ ...toDos, [source.droppableId]: copyTodo });
    }
    if (destination?.droppableId !== source.droppableId) {
      const startBoard = [...toDos[source.droppableId]];
      const targetBoard = [...toDos[destination.droppableId]];
      startBoard.splice(source.index, 1);
      targetBoard.splice(destination?.index, 0, draggableId);
      setToDos({
        ...toDos,
        [source.droppableId]: startBoard,
        [destination.droppableId]: targetBoard,
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((board) => (
              <BoardItem key={board} boardId={board} toDos={toDos[board]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
});

export default Board;
