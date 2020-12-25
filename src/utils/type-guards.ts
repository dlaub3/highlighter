export const isEmptyString = (v: unknown): v is "" => v === "";

export const isObject = (v: unknown): v is object => typeof v === "object";
