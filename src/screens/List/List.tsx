import { FC } from "react";
import { CogIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, SafeAreaView } from "react-native";

import { db_todo } from "../../sqlite/types";

import {
  Box,
  Text,
  Divider,
  Heading,
  ToDoItem,
  IconButton,
  FormAddItem,
} from "../../components";

interface Props {
  list: db_todo[];
  refetch: () => void;
}

const List: FC<Props> = ({ list, refetch }) => {
  const navigation = useNavigation();

  return (
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
          <Box p="$2">
            {!list.length ? (
              <Text>All clear</Text>
            ) : (
              list.map((todo) => {
                return (
                  <ToDoItem key={todo.id} todo={todo} onComplete={refetch} />
                );
              })
            )}
          </Box>
        </ScrollView>
      </Box>

      <Divider />

      <FormAddItem onAddItem={refetch} />
    </Box>
  );
};

export default List;
