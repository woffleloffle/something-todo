import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";

import Presentational from "./List";

import { db_todo } from "../../sqlite/types";
import { getAllIncomplete as getAllToDos } from "../../sqlite/table/todo";

import { MainStackParams } from "../../navigators/config";
type RouteProps = NsSp<MainStackParams, "ListScreen">;

const Container: FC<RouteProps> = () => {
  const [list, setList] = useState<db_todo[]>([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const getList = async () => {
      const results = await getAllToDos();
      setList(results);
    };

    getList();
  }, [refetch]);

  return (
    <Presentational list={list} refetch={() => setRefetch((r) => r + 1)} />
  );
};

export default Container;
