import { FC, useState } from "react";
import { CheckIcon } from "lucide-react-native";

import { db_todo } from "../../sqlite/types";
import {
  complete as completeToDo,
  unComplete as unCompleteToDo,
} from "../../sqlite/table/todo";

import { Box, Checkbox, Toast, useToast } from "../core";

interface Props {
  todo: db_todo;
  onComplete: () => void;
  onUnComplete: () => void;
}

const ToDoItem: FC<Props> = ({ todo, onComplete, onUnComplete }) => {
  const toast = useToast();

  const [isChecked, setIsChecked] = useState(!!todo.completedAt);

  const handleCompleted = async (params: { shouldComplete: boolean }) => {
    const { shouldComplete } = params;

    // Complete the item
    if (shouldComplete) {
      const completed = await completeToDo(todo.id);

      if (completed) {
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        toast.show({
          placement: "top",
          render: () => (
            <Toast>
              <Toast.Title>Could not complete TODO!</Toast.Title>
            </Toast>
          ),
        });
      }

      // Un-complete the item
    } else {
      const unCompleted = await unCompleteToDo(todo.id);

      if (unCompleted) {
        setTimeout(() => {
          onUnComplete();
        }, 500);
      } else {
        toast.show({
          placement: "top",
          render: () => (
            <Toast>
              <Toast.Title>Could not un-complete TODO!</Toast.Title>
            </Toast>
          ),
        });
      }
    }
  };

  return (
    <Box p="$1" flexDirection="row">
      <Checkbox
        size="lg"
        value={todo.id}
        aria-label="checkbox"
        isChecked={isChecked}
        onChange={(shouldComplete) => {
          setIsChecked(shouldComplete);
          handleCompleted({ shouldComplete });
        }}
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
