import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC } from "react";

import Presentational from "./Settings";

import { MainStackParams } from "../../navigators/config";
export type RouteProps = NsSp<MainStackParams, "SettingsScreen">;

const Container: FC<RouteProps> = () => {
  return <Presentational />;
};

export default Container;
