import { FC } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { Box, Divider, Heading, IconButton, Text } from "../../components";

interface Props {
  version: string;
}

const Settings: FC<Props> = ({ version }) => {
  const navigation = useNavigation();

  return (
    <Box flex={1} backgroundColor="$backgroundLight0">
      <SafeAreaView>
        <Box p="$2">
          <Heading color="$primary500" textAlign="center" fontWeight="$medium">
            Settings
          </Heading>
          <Box p="$2" position="absolute">
            <IconButton
              icon={ArrowLeft}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </Box>
        </Box>
      </SafeAreaView>

      <Divider />

      <Box flex={1} backgroundColor="$backgroundLight100">
        <ScrollView>
          <Box p="$2">
            <Text>Version: {version}</Text>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Settings;
