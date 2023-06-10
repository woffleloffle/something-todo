import { FC } from "react";
import { Plus as PlusIcon } from "lucide-react-native";
import { SafeAreaView, ScrollView } from "react-native";

import { Text, Button, Heading, Box, Input, Divider } from "../../components";

interface Props {}

const List: FC<Props> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Heading p="$2">Something TODO</Heading>

      <Divider />

      <ScrollView>
        <Box p="$2">
          <Text>Open up App.js to start working on your app!</Text>
        </Box>
      </ScrollView>

      <Divider />

      <Box p="$2" flexDirection="row">
        <Input flex={1} mr="$2" backgroundColor="$white">
          <Input.Input placeholder="Something TODO?" />
        </Input>
        <Button
          onPress={() => {
            console.log("stuff");
          }}
        >
          <Button.Icon as={PlusIcon} />
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default List;
