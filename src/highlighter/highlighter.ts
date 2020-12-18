import { dracula } from "./themes";
import { standard } from "./emoji";
import * as schemes from "./colorSchemes";
import { transform, mergeXY } from "./stringHelpers";
import { isEmptyString } from "../utils/guards";
import { LogLevel, Theme, Scheme, Emojis } from "./types";

const { log } = console;

type Constructor = { theme?: Theme; scheme: Scheme; customStyles?: string };

export class Highlighter<T extends Constructor> {
  theme: Theme = dracula;
  emojis: Emojis = standard;
  customStyles: string = "";
  scheme: T["scheme"] = schemes.dracula;

  constructor(config: T) {
    Object.assign(this, config);
  }

  private getLoggerCss = (level: LogLevel) => ({
    val: `background: ${this.theme[level].dark}; color: ${this.theme[level].light}; font-size: 1.5em; ${this.customStyles}`,
    str: `background: ${this.theme[level].light}; color: ${this.theme[level].dark}; font-size: 1.5em; ${this.customStyles}`
  });

  private getHighlightCss = (color: keyof T["scheme"]) => ({
    val: `background: ${this.scheme[color]}; color: ${this.scheme["background"]}; font-size: 1.5em; ${this.customStyles}`,
    str: `background: ${this.scheme["background"]}; color: ${this.scheme[color]}; font-size: 1.5em; ${this.customStyles}`
  });

  private getCss = (
    type: { level: LogLevel } | { color: keyof T["scheme"] }
  ) => {
    if ("level" in type) {
      return this.getLoggerCss(type.level);
    } else {
      return this.getHighlightCss(type.color);
    }
  };

  private logger = (
    type: { level: LogLevel } | { color: keyof T["scheme"] }
  ) => {
    const css = this.getCss(type);
    const emoji = "level" in type ? this.emojis[type.level] : this.emojis.log;

    return transform({
      val: (v) => `%c ${v} `,
      str: (s) => `%c${s}`,
      merge: (xs, xy) => {
        const colors: Array<string> = [css.val, emoji];

        xs.forEach((s, i) => {
          if (xy[i - 1] !== undefined) {
            colors.push(css.val);
          }

          if (!isEmptyString(s)) {
            colors.push(css.str);
          }
        });

        return log(...["%c %s" + mergeXY(xs, xy), ...colors]);
      }
    });
  };

  public error = this.logger({ level: "error" });
  public warn = this.logger({ level: "warn" });
  public info = this.logger({ level: "info" });
  public log = this.logger({ level: "log" });
  public get highlight() {
    return Object.keys(this.scheme).reduce((acc, key) => {
      return { ...acc, [key]: this.logger({ color: key }) };
    }, {} as { [k in keyof T["scheme"]]: (string: any, ...values: unknown[]) => unknown });
  }
}
