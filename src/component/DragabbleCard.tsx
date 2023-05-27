import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import EventHandlersBtn from "./EventHandlersBtn";
interface ICardProps {
  todo: string;
  index: number;
  id: number;
  category: string;
}

const Card = styled.div<{ $isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.$isDragging ? props.theme.accentColor : props.theme.bgColor};
  box-shadow: ${(props) =>
    props.$isDragging ? props.theme.hoverBoxShadow : props.theme.boxShadow};
  span {
    text-align: end;
  }
`;
const DragabbleCard = memo(({ todo, index, id, category }: ICardProps) => {
  return (
    <>
      <Draggable key={todo} draggableId={todo} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            $isDragging={snapshot.isDragging}
          >
            {todo}
            <span>
              <EventHandlersBtn
                id={id}
                text={todo}
                category={category}
                isevent="EDIT"
                type="board"
                $isDragging={snapshot.isDragging}
              />
              <EventHandlersBtn
                id={id}
                text={todo}
                category={category}
                isevent="DELETE"
                type="board"
                $isDragging={snapshot.isDragging}
              />
            </span>
          </Card>
        )}
      </Draggable>
    </>
  );
});

export default DragabbleCard;
