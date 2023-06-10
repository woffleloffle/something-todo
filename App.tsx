import { StatusBar } from "expo-status-bar";

import { GluestackUIProvider } from "./src/components";
import { config } from "./gluestack-ui.config";

import List from "./src/screens/List";

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <StatusBar style="auto" />
      <List />
    </GluestackUIProvider>
  );
}
