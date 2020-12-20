import * as schemes from "./colorSchemes";
import * as emojis from "./emoji";
import { transform, mergeXY } from "./stringHelpers";
import { isEmptyString } from "../utils/guards";
import { Theme, SchemeName, Scheme, Emojis } from "./types";

const { log } = console;

type CustomScheme = { [k: string]: string } & { background: string };

type CustomConfig<T extends CustomScheme> = {
  name: "custom";
  theme: Theme;
  scheme: T;
  styles?: string;
  emojis?: Emojis;
};

type NamedConfig<T extends SchemeName> = {
  name: T;
  styles?: string;
  emojis?: Emojis;
};

type Config<T extends SchemeName | CustomScheme> = T extends SchemeName
  ? Required<NamedConfig<T>> & { theme: Theme; scheme: Scheme<T> }
  : T extends CustomScheme
  ? Required<CustomConfig<T>>
  : never;

const isCustomConfig = (
  config: NamedConfig<SchemeName> | CustomConfig<CustomScheme>,
): config is Config<CustomScheme> =>
  typeof config === "object" && "name" in config && config.name === "custom";

const isNamedConfig = (
  config: NamedConfig<SchemeName> | CustomConfig<CustomScheme>,
): config is NamedConfig<SchemeName> =>
  typeof config === "object" && "name" in config && config.name !== "custom";

export class Highlighter<T extends SchemeName | CustomScheme> {
  private emojis: Config<T>["emojis"];
  private styles: Config<T>["styles"];
  private scheme: Config<T>["scheme"];

  constructor(config: T extends SchemeName ? NamedConfig<T> : Config<T>) {
    if (isNamedConfig(config)) {
      this.scheme = schemes[config.name];
      this.emojis = emojis[config.name];
      this.styles = config.styles || "";
    } else if (isCustomConfig(config)) {
      this.scheme = config.scheme;
      this.styles = config.styles || "";
      this.emojis = config.emojis || emojis.standard;
    } else {
      throw `Invaid Config: ${config}`;
    }
  }

  private getHighlightCss = (color: keyof Config<T>["scheme"]) => ({
    val: `background: ${this.scheme[color]}; color: ${this.scheme["background"]}; font-size: 1.5em; ${this.styles}`,
    str: `background: ${this.scheme["background"]}; color: ${this.scheme[color]}; font-size: 1.5em; ${this.styles}`,
  });

  private logger = (type: { color: keyof Config<T>["scheme"] }) => {
    const css = this.getHighlightCss(type.color);
    const emoji = this.emojis.log;

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

        return log(log(...["%c %s " + mergeXY(xs, xy) + " ", ...colors]));
      },
    });
  };

  private get themeColors() {
    const colors = Object.keys(this.scheme) as [keyof Config<T>["scheme"]];

    return colors.reduce((acc, key) => {
      return { ...acc, [key]: this.logger({ color: key }) };
    }, {} as { [k in keyof Config<T>["scheme"]]: (string: any, ...values: unknown[]) => unknown });
  }

  public get highlight() {
    return {
      ...this.themeColors,
    };
  }
}
