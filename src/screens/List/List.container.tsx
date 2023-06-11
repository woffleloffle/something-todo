import { NativeStackScreenProps as NsSp } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";

import Presentational from "./List";

import { db_todo } from "../../sqlite/types";
import {
  softDelete as deleteToDo,
  getAllIncomplete as getAllToDos,
} from "../../sqlite/table/todo";

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

  const handleRefetch = () => setRefetch((r) => r + 1);

  const [selectedToDo, setSelectedToDo] = useState("");
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleCloseActionSheet = () => {
    setSelectedToDo("");
    setShowActionSheet(false);
  };

  const handleToDoSelected = (id: string) => {
    setSelectedToDo(id);
    setShowActionSheet(true);
  };

  const handleDeleteToDo = async () => {
    const deleted = await deleteToDo(selectedToDo);

    handleRefetch();

    if (deleted) {
      handleCloseActionSheet();
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Presentational
      list={list}
      refetch={handleRefetch}
      showActionSheet={showActionSheet}
      handleDeleteToDo={handleDeleteToDo}
      handleToDoSelected={handleToDoSelected}
      handleCloseActionSheet={handleCloseActionSheet}
    />
  );
};

export default Container;
