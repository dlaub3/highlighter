import * as schemes from "./colorSchemes";
import * as styles from "./styles";

export type CustomScheme = { [k: string]: string } & { background: string };

export type Schemes = typeof schemes;

export type SchemeName = keyof Schemes;

export type Scheme<Key extends SchemeName> = {
  [Index in SchemeName]: Schemes[Index];
}[Key] & { background: string };

export type Emojis<T extends SchemeName> = {
  [k in keyof Scheme<T>]: string;
};

export type Styles = typeof styles;

export type Style = {
  value: <T>(colors: T) => string;
  string: <T>(colors: T) => string;
  line: <T>(colors: T) => string;
  append: <T>(colors: T) => string;
  prepend: <T>(colors: T) => string;
};

export type Styling<Key extends keyof Styles> = {
  [Index in Key]: Style;
}[Key];
