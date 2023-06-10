import * as SQLite from "expo-sqlite";

import { expo } from "../../app.json";

let db: SQLite.WebSQLDatabase | undefined;

// The SQlite database file
export const databaseFile = "something-todo.db";

/**
 * Create & connect to the SQLite database
 * Initialise the tables we need
 */
export const initialiseDatabase = async () => {
  db = SQLite.openDatabase(databaseFile);

  await createTables();
  await createIndexes();
  await upsertCurrentVersion(expo.version);
};

/**
 * Transact on the local device's SQLite database
 *
 * @param sql SQL Query as a string, with `?` placeholders for args
 * @param args Array of args to pass into the `sql` string
 * @returns A Promise, or throws if the database is undefined
 */
export const transact = (sql: string, args?: (string | number)[]) => {
  return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    if (!db) {
      throw new Error("The database has not been initialised");
    }

    db.transaction(
      (tx) => tx.executeSql(sql, args, (_tx, res) => resolve(res)),
      (error) => {
        console.error(`SQLite error for: ${sql}`);
        console.log(error);
        reject(error);
      }
    );
  });
};

const createTables = async () => {
  // Create `setting` table
  await transact(`
    CREATE TABLE IF NOT EXISTS setting (
      key VARCHAR(255) UNIQUE,
      value VARCHAR(255)
    );
  `); // keep types.ts updated!

  // Create `todo` table
  await transact(`
    CREATE TABLE IF NOT EXISTS todo (
      id VARCHAR(35) PRIMARY KEY NOT NULL,
      task VARCHAR(255),
      createdAt INTEGER,
      deletedAt INTEGER,
      completedAt INTEGER
    );
  `); // keep types.ts updated!
};

const createIndexes = async () => {
  await transact(`
    CREATE INDEX IF NOT EXISTS index_todo_createdAt
    ON todo (createdAt);
  `);

  await transact(`
    CREATE INDEX IF NOT EXISTS index_todo_completedAt
    ON todo (completedAt);
  `);
};

const upsertCurrentVersion = async (version: string) => {
  try {
    await transact(
      `
      INSERT OR REPLACE
        INTO setting (key, value)
        VALUES ('version', ?)
    `,
      [version]
    );

    //
  } catch (e) {
    console.error("upsertCurrentVersion()");
    console.log(e);
  }
};
