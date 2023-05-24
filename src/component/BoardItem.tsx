import { memo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";

import { todoState } from "../atoms";
import TodoForm from "./TodoForm";
import DragabbleCard from "./DragabbleCard";

interface IBoardProps {
  category: string;
  boardId: string;
}
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Board = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const BoardItem = memo(({ category, boardId }: IBoardProps) => {
  const toDos = useRecoilValue(todoState);
  const filteredCategory = toDos.filter((item) => item.category === category);
  return (
    <>
      <Board>
        <Title>{boardId}</Title>
        <TodoForm currentCategory={boardId} />
        <Droppable key={boardId} droppableId={boardId}>
          {(magic, info) => (
            <Area
              isDraggingOver={info.isDraggingOver}
              isDraggingFromThis={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {filteredCategory.map((todo, idx) => (
                <DragabbleCard key={todo.id} todo={todo.text} index={idx} />
              ))}
              {/* 끝날 때 두는 무언가 */}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Board>
    </>
  );
});

export default BoardItem;
