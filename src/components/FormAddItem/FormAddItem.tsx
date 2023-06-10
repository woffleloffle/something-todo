import { FC, useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import { PlusIcon } from "lucide-react-native";

import { insert as insertToDo } from "../../sqlite/table/todo";

import { Box, Button, Input } from "../core";
import { useToast, Toast } from "../core";

interface Props {
  onAddItem: () => void;
}

const FormAddItem: FC<Props> = ({ onAddItem }) => {
  const [value, setValue] = useState("");
  const toast = useToast();

  const handleAddItem = async () => {
    if (!value) {
      return;
    }

    const success = await insertToDo(value);

    if (success) {
      setValue("");
      onAddItem();
    } else {
      toast.show({
        placement: "top",
        render: () => (
          <Toast>
            <Toast.Title>Could not add TODO!</Toast.Title>
          </Toast>
        ),
      });
    }
  };

  return (
    <SafeAreaView>
      <Box p="$2" flexDirection="row">
        <Input flex={1} mr="$2" backgroundColor="$white">
          <Input.Input
            value={value}
            maxLength={255}
            placeholder="Something TODO?"
            onChangeText={(item) => setValue(item)}
            onSubmitEditing={() => handleAddItem()}
          />
        </Input>
        <Button onPress={() => handleAddItem()}>
          <Button.Icon as={PlusIcon} />
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export { FormAddItem };
