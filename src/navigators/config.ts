import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * Route definitions
 */
export type MainStackParams = {
  ListScreen: undefined;
  SettingsScreen: undefined;
};

/**
 * This adds route definition typings to useNavigation()
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParams {}
  }
}
