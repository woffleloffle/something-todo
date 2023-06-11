import { FC, useEffect, useState } from "react";
import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";

import { Stats, allSettingKeys } from "../../sqlite/types";
import { get as getSetting } from "../../sqlite/table/setting";
import { getStats as getAllStats } from "../../sqlite/table/todo";

import { MainStackParams } from "../../navigators/config";
type RouteProps = NsSp<MainStackParams, "SettingsScreen">;

import Presentational from "./Settings";

const Container: FC<RouteProps> = () => {
  const [version, setVersion] = useState<false | string>(false);

  useEffect(() => {
    const getVersion = async () => {
      const data = await getSetting(allSettingKeys.version);
      setVersion(data);
    };

    getVersion();
  }, []);

  const [stats, setStats] = useState<false | Stats>(false);

  useEffect(() => {
    const getStats = async () => {
      const data = await getAllStats();
      setStats(data);
    };

    getStats();
  }, []);

  return <Presentational version={version} stats={stats} />;
};

export default Container;
