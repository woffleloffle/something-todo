import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { GluestackUIProvider } from "./src/components";
import { config } from "./gluestack-ui.config";

import MainStack from "./src/navigators/MainStack";
import { initialiseDatabase } from "./src/sqlite";

export default function App() {
  initialiseDatabase();

  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <StatusBar style="auto" />
        <MainStack />
      </GluestackUIProvider>
    </NavigationContainer>
  );
}
