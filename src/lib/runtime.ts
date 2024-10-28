import { AppConfig, ViteEnvConfig } from "@services/AppConfig.ts";
import * as Effect from "effect/Effect";
import * as Logger from "effect/Logger";

export const execute = <A, E>(
  program: Effect.Effect<A, E>,
  signal?: AbortSignal,
): Promise<A | E> => {
  const prog = Effect.gen(function* (_) {
    const level = yield* _(AppConfig.logLevel);
    return yield* program.pipe(
      Logger.withMinimumLogLevel(level),
      Effect.withLogSpan("execute"),
    );
  }).pipe(
    Effect.withConfigProvider(ViteEnvConfig),
  );
  return Effect.runPromise(prog, signal ? { signal } : undefined);
};
