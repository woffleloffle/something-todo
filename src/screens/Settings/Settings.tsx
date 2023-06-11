import { FC } from "react";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Platform, SafeAreaView, ScrollView, StatusBar } from "react-native";

import { Stats } from "../../sqlite/types";
import { Box, Divider, Heading, IconButton, Text } from "../../components";

interface Props {
  version: false | string;
  stats: false | Stats;
}

const Settings: FC<Props> = ({ stats, version }) => {
  const navigation = useNavigation();

  return (
    <Box flex={1} backgroundColor="$backgroundLight0">
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <Box p="$2">
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
            <Box pl="$2">
              <Text>
                All time total: {stats ? stats.countTotal : "Loading..."}
              </Text>
              <Text>
                Completed: {stats ? stats.countCompleted : "Loading..."}
              </Text>
              <Text>Deleted: {stats ? stats.countDeleted : "Loading..."}</Text>
            </Box>
          </Box>

          <Divider />

          <Box p="$2">
            <Text>Version: {version || "Loading..."}</Text>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Settings;
