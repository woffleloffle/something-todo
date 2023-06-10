import cuid from "cuid";

import { transact } from "..";
import { SettingKey, allSettingKeys, db_todo } from "../types";

/**
 * Insert a TODO into the `todo` table
 *
 * @param task The `task` of the TODO - max: `255`
 */
export const insert = async (task: string) => {
  if (task.length > 255) {
    console.error("TODO is too long", { max: 255, taskLength: task.length });
    return false;
  }

  try {
    const result = await transact(
      `
        INSERT
          INTO todo (id, task, createdAt, deletedAt, completedAt)
          VALUES (?, ?, ?, ?, ?)
        `,
      [cuid(), task, Date.now(), null, null]
    );

    if (result.rowsAffected > 0) {
      return true;

      //
    } else {
      console.error("todo/insert() failed to create");
      return false;
    }

    //
  } catch (e) {
    console.error("todo/insert() failed with an error");
    console.log(e);
  }
};

/**
 * Get all the items stored the `todo` table
 */
export const getAll = async () => {
  const allItems: db_todo[] = [];

  try {
    const result = await transact(`SELECT * FROM todo`, []);

    if (result.rows.length) {
      for (let index = 0; index < result.rows.length; index++) {
        const todo = await result.rows.item(index);
        allItems.push(todo);
      }
    }

    //
  } catch (e) {
    console.error(`todo/getAll()`);
    console.log(e);
  }

  return allItems;
};
