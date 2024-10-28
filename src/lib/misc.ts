import { pipe } from "effect";
import { dedupe, makeBy, map } from "effect/Array";
import * as S from "effect/String";

export const uniqLCStringArray = (generator: (() => string)) => (n: number): string[] => pipe(
  makeBy(n, generator),
  map(S.toLowerCase),
  dedupe,
);
