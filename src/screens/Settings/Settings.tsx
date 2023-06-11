import { FC } from "react";
import { Platform, SafeAreaView, ScrollView } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { Stats } from "../../sqlite/types";
import { Box, Divider, Heading, IconButton, Text } from "../../components";

interface Props {
  version?: string;
  stats?: Stats;
}

const Settings: FC<Props> = ({ stats, version }) => {
  const navigation = useNavigation();

  return (
    <Box flex={1} backgroundColor="$backgroundLight0">
      <SafeAreaView>
        <Box p="$2" pt={Platform.OS === "android" ? "$8" : "$2"}>
          <Heading color="$primary500" textAlign="center" fontWeight="$medium">
            Settings
          </Heading>
          <Box p="$2" position="absolute" bottom={0}>
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
            <Text fontWeight="$medium">Stats</Text>
            {!stats ? (
              <Text>Loading...</Text>
            ) : (
              <Box pl="$2">
                <Text>All time total: {stats.countTotal}</Text>
                <Text>Completed: {stats.countCompleted}</Text>
                <Text>Deleted: {stats.countDeleted}</Text>
              </Box>
            )}
          </Box>

          <Divider />

          <Box p="$2">
            <Text>Version: {version}</Text>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Settings;
