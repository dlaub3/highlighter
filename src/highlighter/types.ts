import * as schemes from "./colorSchemes";

export type Schemes = typeof schemes;

export type SchemeName = Extract<keyof Schemes, string>;

export type Scheme<Key extends SchemeName> = {
  [Index in SchemeName]: Schemes[Index];
}[Key] & { background: string };

export type Color<T extends SchemeName> = Extract<keyof Scheme<T>, string>;

export type Style<T extends SchemeName> = {
  value: (colors: Scheme<T>) => string;
  string: (colors: Scheme<T>) => string;
  line: (colors: Scheme<T>) => string;
  append: (colors: Scheme<T>) => string;
  prepend: (colors: Scheme<T>) => string;
};

export type GetStyles = <T extends SchemeName>(color: Color<T>) => Style<T>;
