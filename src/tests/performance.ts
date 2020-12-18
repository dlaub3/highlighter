import { count, time } from "../perf/perf";

time({ fn: () => {}, executions: 10000 });
count({ fn: () => {}, milliseconds: 1 });
