import { FC } from "react";
import { CogIcon, PlusIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, SafeAreaView } from "react-native";

import {
  Box,
  Text,
  Input,
  Button,
  Divider,
  Heading,
  IconButton,
} from "../../components";

interface Props {}

const List: FC<Props> = () => {
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
            <Text>Open up App.js to start working on your app!</Text>
          </Box>
        </ScrollView>
      </Box>

      <Divider />

      <SafeAreaView>
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
    </Box>
  );
};

export default List;
