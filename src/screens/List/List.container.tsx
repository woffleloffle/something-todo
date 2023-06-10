import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC } from "react";

import Presentational from "./List";

import { MainStackParams } from "../../navigators/config";
export type RouteProps = NsSp<MainStackParams, "ListScreen">;

const Container: FC<RouteProps> = () => {
  return <Presentational />;
};

export default Container;