import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { initialiseDatabase } from "./src/sqlite";

import { config } from "./gluestack-ui.config";
import { Box, Text, GluestackUIProvider } from "./src/components";

import MainStack from "./src/navigators/MainStack";

const Loading: FC = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Initialising SQLite</Text>
    </Box>
  );
};

const App: FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initialiseDatabase();
      setReady(true);
    };

    init();
  }, []);

  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <StatusBar style="auto" />
        {ready ? <MainStack /> : <Loading />}
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
