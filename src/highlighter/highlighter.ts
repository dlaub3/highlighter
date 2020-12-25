import * as schemes from "./colorSchemes";
import * as emojis from "./emojiScheme";
import * as styles from "./styles";
import { transform, mergeXY, emojify } from "./stringHelpers";
import { isObject, isEmptyString } from "../utils/guards";
import {
  Style,
  Color,
  GetStyles,
  SchemeName,
  Scheme,
  EmojiScheme,
} from "./types";

const { log } = console;

type Config<T extends SchemeName> = {
  theme: T;
  styles?: Partial<Style<T>>;
};

export class Highlighter<T extends SchemeName> {
  private emojis: EmojiScheme<T>;
  private scheme: Scheme<T>;
  private styles: Partial<Style<T>>;
  private getStyles: GetStyles<T>;

  constructor(config: Config<T>) {
    this.scheme = schemes[config.theme];
    this.emojis = emojis[config.theme] as EmojiScheme<T>;
    this.styles = config.styles ?? {};
    this.getStyles = (styles[config.theme] as unknown) as GetStyles<T>;
  }

  private logger = (args: { color: Color<T> }) => {
    const css = this.getStyles(args.color);
    const emoji = this.emojis[args.color] ?? "";

    return transform({
      val: (v) =>
        isObject(v) ? `%c ${JSON.stringify(v, null, 2)} ` : `%c ${v} `,
      str: (s) => (isEmptyString(s.trim()) ? `` : `%c ${s.trim()} `),
      merge: (xs, xy) => {
        const line =
          css.line(this.scheme) + (this.styles.line?.(this.scheme) || "");
        const value =
          css.value(this.scheme) +
          (this.styles.value?.(this.scheme) || "") +
          line;
        const string =
          css.string(this.scheme) +
          (this.styles.string?.(this.scheme) || "") +
          line;
        const prepend =
          css.prepend(this.scheme) +
          (this.styles.prepend?.(this.scheme) || "") +
          line;
        const append =
          css.append(this.scheme) +
          (this.styles.append?.(this.scheme) || "") +
          line;

        const colors: Array<string> = [value + prepend, value, emoji];

        xs.forEach((s, i) => {
          if (xy[i - 1] !== undefined) {
            colors.push(value);
          }

          if (!isEmptyString(s)) {
            colors.push(string);
          }
        });

        colors[colors.length - 1] = colors[colors.length - 1] + append;

        return log(emojify("%c %c %s " + mergeXY(xs, xy)), ...colors);
      },
    });
  };

  private get themeColors() {
    type Colors = Exclude<Color<T>, "background" | "foreground">;

    const colors = (Object.keys(this.scheme) as unknown) as [Colors];

    return colors.reduce((acc, key) => {
      return { ...acc, [key]: this.logger({ color: key }) };
    }, {} as { [k in Colors]: (string: any, ...values: unknown[]) => unknown });
  }

  public get highlight() {
    return this.themeColors;
  }
}
