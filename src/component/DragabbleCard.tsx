import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICardProps {
  todo: string;
  index: number;
}

const Card = styled.div<{ isdragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isdragging ? props.theme.accentColor : props.theme.bgColor};
  box-shadow: ${(props) =>
    props.isdragging ? props.theme.hoverBoxShadow : props.theme.boxShadow};
`;
const DragabbleCard =  memo(({ todo, index }: ICardProps) => {
  return (
    <>
      <Draggable key={todo} draggableId={todo} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isdragging={snapshot.isDragging}
          >
            {todo}
          </Card>
        )}
      </Draggable>
    </>
  );
})

export default DragabbleCard;
