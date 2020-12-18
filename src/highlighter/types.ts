export type LogLevel = "error" | "warn" | "info" | "log";

export type Theme = { [k in LogLevel]: { [k in "light" | "dark"]: string } };

export type Scheme = {
  background: string;
  [k: string]: string;
};
