import { FC, useState } from "react";
import { CheckIcon, MoreHorizontal } from "lucide-react-native";

import { db_todo } from "../../sqlite/types";
import {
  complete as completeToDo,
  unComplete as unCompleteToDo,
} from "../../sqlite/table/todo";

import { Box, Checkbox, Divider, Toast, useToast } from "../core";
import { IconButton } from "../IconButton";

interface Props {
  todo: db_todo;
  onComplete: () => void;
  onUnComplete: () => void;
  onPressOptions: (id: string) => void;
}

const ToDoItem: FC<Props> = ({
  todo,
  onComplete,
  onUnComplete,
  onPressOptions,
}) => {
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
    <>
      <Box flexDirection="row" alignItems="flex-start">
        <Checkbox
          p="$3"
          flex={1}
          value={todo.id}
          aria-label="checkbox"
          isChecked={isChecked}
          alignItems="flex-start"
          onChange={(shouldComplete) => {
            setIsChecked(shouldComplete);
            handleCompleted({ shouldComplete });
          }}
        >
          <Checkbox.Indicator mt="$0.5">
            <Checkbox.Icon as={CheckIcon} />
          </Checkbox.Indicator>
          <Checkbox.Label flex={1} ml="$2">
            {todo.task}
          </Checkbox.Label>
        </Checkbox>

        <Box p="$2">
          <IconButton
            icon={MoreHorizontal}
            onPress={() => onPressOptions(todo.id)}
          />
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export { ToDoItem };
