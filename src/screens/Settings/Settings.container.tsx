import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";

import { Stats, allSettingKeys } from "../../sqlite/types";
import { get as getSetting } from "../../sqlite/table/setting";
import { getStats as getAllStats } from "../../sqlite/table/todo";

import { MainStackParams } from "../../navigators/config";
type RouteProps = NsSp<MainStackParams, "SettingsScreen">;

import Presentational from "./Settings";
import { Text } from "../../components";

const Container: FC<RouteProps> = () => {
  const [version, setVersion] = useState("Loading...");
  const [versionError, setVersionError] = useState(false);

  useEffect(() => {
    const getVersion = async () => {
      const data = await getSetting(allSettingKeys.version);

      if (data) {
        setVersion(data);
      } else {
        console.log("something went wrong", { data });
        setVersionError(true);
      }
    };

    getVersion();
  }, []);

  const [stats, setStats] = useState<Stats>();
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      const data = await getAllStats();

      if (data) {
        setStats(data);
      } else {
        console.log("something went wrong", { data });
        setStatsError(true);
      }
    };

    getStats();
  }, []);

  if (versionError) return <Text p="$12">oops (versionError)</Text>;
  if (statsError) return <Text p="$12">oops (statsError)</Text>;

  return <Presentational version={version} stats={stats} />;
};

export default Container;
