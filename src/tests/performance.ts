import { count, time } from "../perf";

export const testPerf = () => {
  time({ fn: () => {}, executions: 10000 });
  count({ fn: () => {}, milliseconds: 1 });
};
