import { transact } from "..";
import { SettingKey, allSettingKeys } from "../types";

/**
 * Upsert a KV into the `setting` table
 *
 * @param key The `key` of the Setting you want to write
 * @param value The `stringified` value
 */
export const upsert = async (key: SettingKey, value: string) => {
  try {
    const setting = allSettingKeys[key];

    if (setting) {
      await transact(
        `
        INSERT OR REPLACE
          INTO setting (key, value)
          VALUES (?, ?)
        `,
        [setting, value]
      );

      console.log(`upsertSettingData('${setting}')`);
    } else {
      console.error(
        `upsertSettingData() => '${key}'`,
        "This key does not exist in Settings!"
      );
    }
    //
  } catch (e) {
    console.error("upsertSettingData()");
    console.log(e);
  }
};

/**
 * Get the `value` for a `key` stored the `setting` table
 *
 * @param key The `key` of the Setting you want to find
 * @returns string value, or false
 */
export const get = async (key: SettingKey) => {
  try {
    const setting = allSettingKeys[key];

    const result = await transact(
      `
      SELECT value FROM setting
        WHERE key = ?
    `,
      [setting]
    );

    if (result.rows.length) {
      const { value } = result.rows.item(0);
      console.log(`getSettingData('${setting}')`);
      return value as string;
    }

    //
  } catch (e) {
    console.error(`getSettingData(${key})`);
    console.log(e);
  }

  return false;
};
