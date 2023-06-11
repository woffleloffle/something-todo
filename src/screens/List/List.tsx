import { FC } from "react";
import { CogIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Platform,
  Keyboard,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";

import { db_todo } from "../../sqlite/types";

import {
  Box,
  Text,
  Divider,
  Heading,
  ToDoItem,
  IconButton,
  FormAddItem,
  Actionsheet as ActionSheet,
} from "../../components";

interface Props {
  list: db_todo[];
  refetch: () => void;
  //
  showActionSheet: boolean;
  handleDeleteToDo: () => void;
  handleToDoSelected: (id: string) => void;
  handleCloseActionSheet: () => void;
}

const List: FC<Props> = ({
  list,
  refetch,
  showActionSheet,
  handleDeleteToDo,
  handleToDoSelected,
  handleCloseActionSheet,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} backgroundColor="$backgroundLight0">
            <SafeAreaView>
              <Box
                p="$2"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Heading color="$primary500" fontWeight="$medium">
                  Something TODO
                </Heading>
                <IconButton
                  icon={CogIcon}
                  onPress={() => {
                    navigation.navigate("SettingsScreen");
                  }}
                />
              </Box>
            </SafeAreaView>

            <Divider />

            <Box flex={1} backgroundColor="$backgroundLight50">
              <ScrollView>
                {!list.length ? (
                  <Text p="$2">All clear</Text>
                ) : (
                  list.map((todo) => {
                    return (
                      <ToDoItem
                        todo={todo}
                        key={todo.id}
                        onComplete={refetch}
                        onUnComplete={refetch}
                        onPressOptions={handleToDoSelected}
                      />
                    );
                  })
                )}
              </ScrollView>
            </Box>

            <Divider />

            <FormAddItem onAddItem={refetch} />
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ActionSheet
        isOpen={showActionSheet}
        onClose={handleCloseActionSheet}
        zIndex={999}
      >
        <ActionSheet.Backdrop />

        <ActionSheet.Content zIndex={999} pb="$10">
          <ActionSheet.DragIndicatorWrapper>
            <ActionSheet.DragIndicator />
          </ActionSheet.DragIndicatorWrapper>
          <ActionSheet.Item onPress={handleDeleteToDo}>
            <ActionSheet.ItemText color="$error500">
              Delete this task immediately!
            </ActionSheet.ItemText>
          </ActionSheet.Item>
          <ActionSheet.Item onPress={handleCloseActionSheet}>
            <ActionSheet.ItemText>Cancel</ActionSheet.ItemText>
          </ActionSheet.Item>
        </ActionSheet.Content>
      </ActionSheet>
    </>
  );
};

export default List;
