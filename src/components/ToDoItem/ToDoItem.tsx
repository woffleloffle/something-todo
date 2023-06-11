import { FC } from "react";
import { CheckIcon } from "lucide-react-native";

import { db_todo } from "../../sqlite/types";
// import { insert as insertToDo } from "../../sqlite/table/todo";

import { Box, Checkbox } from "../core";

interface Props {
  todo: db_todo;
  onComplete: () => void;
}

const ToDoItem: FC<Props> = ({ todo, onComplete }) => {
  const handleCompleted = (params: { isChecked: boolean }) => {
    const { isChecked } = params;

    if (isChecked) {
      onComplete();
    }
  };

  return (
    <Box p="$1" flexDirection="row">
      <Checkbox
        size="lg"
        value={todo.id}
        aria-label="checkbox"
        isChecked={!!todo.completedAt}
        onChange={(isChecked) => handleCompleted({ isChecked })}
      >
        <Checkbox.Indicator mr="$2">
          <Checkbox.Icon as={CheckIcon} />
        </Checkbox.Indicator>
        <Checkbox.Label>{todo.task}</Checkbox.Label>
      </Checkbox>
    </Box>
  );
};

export { ToDoItem };
