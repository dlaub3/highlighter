export const isEmptyString = (v: unknown): v is "" => v === "";

/* eslint-disable-next-line @typescript-eslint/ban-types */
export const isObject = (v: unknown): v is object => typeof v === "object";
