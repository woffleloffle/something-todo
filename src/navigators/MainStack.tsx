import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { MainStackParams } from "./config";

import ListScreen from "../screens/List";
import SettingsScreen from "../screens/Settings";

const Stack = createNativeStackNavigator<MainStackParams>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "slide_from_right",
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
