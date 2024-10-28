import { pipe } from "effect";

export const generateId = () => pipe(
  Math.random(),
  x => x * 10000 + 1,
  Math.floor,
);
