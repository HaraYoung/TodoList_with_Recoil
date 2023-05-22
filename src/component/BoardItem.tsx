import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

interface IBoardProps {
  toDos: string[];
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

const BoardItem = ({ toDos, boardId }: IBoardProps) => {
  return (
    <>
      <Board>
        <Title>{boardId}</Title>
        <Droppable key={boardId} droppableId={boardId}>
          {(magic, info) => (
            <Area
              isDraggingOver={info.isDraggingOver}
              isDraggingFromThis={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((todo, idx) => (
                <DragabbleCard key={todo} todo={todo} index={idx} />
              ))}
              {/* 끝날 때 두는 무언가 */}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Board>
    </>
  );
};

export default BoardItem;
