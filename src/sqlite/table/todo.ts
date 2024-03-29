import cuid from "cuid";

import { transact } from "..";
import { Stats, db_todo } from "../types";

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
    }

    //
  } catch (e) {
    console.error("todo/insert() failed with an error");
    console.log(e);
  }

  console.error("todo/insert() failed to create");
  return false;
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

/**
 * Get all the INCOMPLETE items stored the `todo` table
 */
export const getAllIncomplete = async () => {
  const allItems: db_todo[] = [];

  try {
    const result = await transact(
      `
      SELECT * FROM todo
        WHERE completedAt is NULL
          AND deletedAt is NULL
      `,
      []
    );

    if (result.rows.length) {
      for (let index = 0; index < result.rows.length; index++) {
        const todo = await result.rows.item(index);
        allItems.push(todo);
      }
    }

    //
  } catch (e) {
    console.error(`todo/getAllIncomplete()`);
    console.log(e);
  }

  return allItems;
};

/**
 * Complete a todo item
 */
export const complete = async (id: string) => {
  const valid = cuid.isCuid(id);

  if (!valid) {
    console.error(`todo/complete()`, "Invalid CUID");
    return false;
  }

  try {
    const result = await transact(
      `UPDATE todo
        SET completedAt = ?
        WHERE id = ?`,
      [Date.now(), id]
    );

    if (result.rowsAffected) {
      return true;
    }

    //
  } catch (e) {
    console.error(`todo/complete() failed with an error`);
    console.log(e);
  }

  console.error("todo/complete() failed to update");
  return false;
};

/**
 * Un-complete a todo item
 */
export const unComplete = async (id: string) => {
  const valid = cuid.isCuid(id);

  if (!valid) {
    console.error(`todo/unComplete()`, "Invalid CUID");
    return false;
  }

  try {
    const result = await transact(
      `UPDATE todo
        SET completedAt = NULL
        WHERE id = ?`,
      [id]
    );

    if (result.rowsAffected) {
      return true;
    }

    //
  } catch (e) {
    console.error(`todo/unComplete() failed with an error`);
    console.log(e);
  }

  console.error("todo/unComplete() failed to update");
  return false;
};

/**
 * Get a list of statistics about the database
 */
export const getStats = async () => {
  let stats: Stats | false = false;

  try {
    const result = await transact(
      `
      SELECT
        COUNT(*) AS total,

        COUNT(
          CASE WHEN completedAt IS NOT NULL
            THEN 1 ELSE NULL
          END
        ) AS completed,

        COUNT(
          CASE WHEN deletedAt IS NOT NULL
            THEN 1 ELSE NULL
          END
        ) AS deleted

      FROM todo
      `,
      []
    );

    if (result.rows.length) {
      const counts = await result.rows.item(0);

      stats = {
        countTotal: counts.total as number,
        countDeleted: counts.deleted as number,
        countCompleted: counts.completed as number,
      };

      return stats;
    }
  } catch (e) {
    console.error(`todo/getStats() failed with an error`);
    console.log(e);
  }

  return false;
};

/**
 * Delete a todo item
 */
export const softDelete = async (id: string) => {
  const valid = cuid.isCuid(id);

  if (!valid) {
    console.error(`todo/softDelete()`, "Invalid CUID");
    return false;
  }

  try {
    const result = await transact(
      `UPDATE todo
        SET deletedAt = ?
        WHERE id = ?`,
      [Date.now(), id]
    );

    if (result.rowsAffected) {
      return true;
    }

    //
  } catch (e) {
    console.error(`todo/softDelete() failed with an error`);
    console.log(e);
  }

  console.error("todo/softDelete() failed to update");
  return false;
};
