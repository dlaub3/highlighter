import { dracula } from "./themes";
import * as schemes from "./colorSchemes";
import { transform, mergeXY } from "./stringHelpers";
import { isEmptyString } from "../utils/guards";
import { LogLevel, Theme, Scheme } from "./types";

const { log } = console;

type Constructor = { theme?: Theme; scheme: Scheme; customStyles?: string };

class Highlighter<T extends Constructor> {
  theme: Theme = dracula;
  customStyles: string = "";
  scheme: T["scheme"] = schemes.dracula;

  constructor(config: T) {
    Object.assign(this, config);
  }

  private getLogCss = (level: LogLevel) => ({
    val: `background: ${this.theme[level].dark}; color: ${this.theme[level].light}; ${this.customStyles}`,
    str: `background: ${this.theme[level].light}; color: ${this.theme[level].dark}; ${this.customStyles}`
  });

  private getHighlightCss = (color: keyof T["scheme"]) => ({
    val: `background: ${this.scheme[color]}; color: ${this.scheme["background"]}; ${this.customStyles}`,
    str: `background: ${this.scheme["background"]}; color: ${this.scheme[color]}; ${this.customStyles}`
  });

  private logger = (css: { val: string; str: string }) =>
    transform({
      val: (v) => `%c ${v} `,
      str: (s) => `%c${s}`,
      merge: (xs, xy) => {
        const colors: Array<string> = [];

        xs.forEach((s, i) => {
          if (xy[i - 1] !== undefined) {
            colors.push(css.val);
          }

          if (!isEmptyString(s)) {
            colors.push(css.str);
          }
        });

        return log(...[mergeXY(xs, xy), ...colors]);
      }
    });

  public error = this.logger(this.getLogCss("error"));
  public warn = this.logger(this.getLogCss("warn"));
  public info = this.logger(this.getLogCss("info"));
  public log = this.logger(this.getLogCss("log"));
  public get highlight() {
    const logger = this.logger;
    return Object.keys(this.scheme).reduce((acc, key) => {
      return { ...acc, [key]: logger(this.getHighlightCss(key)) };
    }, {} as { [k in keyof T["scheme"]]: (string: any, ...values: unknown[]) => unknown });
  }
}

export default Highlighter;
