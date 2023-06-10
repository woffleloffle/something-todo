export interface db_todo {
  id: string;
  task: string;
  createdAt: number;
  deletedAt: number;
  completedAt: number;
}

export interface db_setting {
  key: string;
  value: string;
}

/**
 * This is a list of all keys we store in the `setting` table
 * Try to keep this up to date!
 */
export const allSettingKeys = {
  version: "version",
} as const;

export type SettingKey = keyof typeof allSettingKeys;
