import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";

import { allSettingKeys } from "../../sqlite/types";
import { get as getSetting } from "../../sqlite/table/setting";

import { MainStackParams } from "../../navigators/config";
type RouteProps = NsSp<MainStackParams, "SettingsScreen">;

import Presentational from "./Settings";
import { Text } from "../../components";

const Container: FC<RouteProps> = () => {
  const [version, setVersion] = useState("Loading");
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

  if (versionError) return <Text p="$12">oops</Text>;

  return <Presentational version={version} />;
};

export default Container;
