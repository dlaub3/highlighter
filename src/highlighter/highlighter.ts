import * as schemes from "./colorSchemes";
import * as emojis from "./emoji";
import * as styles from "./styles";
import { transform, mergeXY } from "./stringHelpers";
import { isObject, isEmptyString } from "../utils/guards";
import { Style, SchemeName, Scheme, Emojis } from "./types";

const { log } = console;

type NamedConfig<T extends SchemeName> = {
  name: T;
  styles?: Style;
  emojis?: Emojis<SchemeName>;
};

type Config<T extends SchemeName> = T extends SchemeName
  ? Required<NamedConfig<T>> & { scheme: Scheme<T> }
  : never;

export class Highlighter<T extends SchemeName> {
  private emojis: Config<T>["emojis"];
  //private styles: Config<T>["styles"];
  private scheme: Config<T>["scheme"];
  private getStyles: any;

  constructor(config: T extends SchemeName ? NamedConfig<T> : never) {
    this.scheme = schemes[config.name];
    this.emojis = emojis[config.name];
    //this.styles = config.styles || {};
    this.getStyles = styles[config.name];
  }

  private logger = (type: { color: keyof Config<T>["scheme"] }) => {
    const css = this.getStyles(type.color);
    const emoji = this.emojis[type.color as keyof Config<T>["emojis"]];

    return transform({
      val: (v) =>
        isObject(v)
          ? `%c ${JSON.stringify({ a: { b: { c: [] } } }, null, 2)} `
          : `%c ${v} `,
      str: (s) => (isEmptyString(s.trim()) ? `` : `%c ${s.trim()} `),
      merge: (xs, xy) => {
        const colors: Array<unknown> = [
          css.append(this.scheme) +
            css.value(this.scheme) +
            css.line(this.scheme),
          css.value(this.scheme) + css.line(this.scheme),
          emoji,
        ];

        xs.forEach((s, i) => {
          if (xy[i - 1] !== undefined) {
            colors.push(css.value(this.scheme) + css.line(this.scheme));
          }

          if (!isEmptyString(s)) {
            colors.push(css.string(this.scheme) + css.line(this.scheme));
          }
        });

        return log(...["%c %c %s " + mergeXY(xs, xy), ...colors]);
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
