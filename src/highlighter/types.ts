import * as schemes from "./colorSchemes";
import * as themes from "./themes";

export type Schemes = typeof schemes;

export type SchemeName = keyof Schemes;

export type Scheme<Key extends SchemeName> = {
  [Index in SchemeName]: Schemes[Index];
}[Key] & { background: string };

export type ThemeNames = keyof typeof themes;

export type Theme = { [k in LogLevel]: { [k in "light" | "dark"]: string } };

export type LogLevel = "error" | "warn" | "info" | "log";

export type Emojis = { [k in LogLevel]: string };
