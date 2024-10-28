import { AppStateLive } from "@state";
import { AppErrorStore } from "@state/AppErrorStore.ts";
import * as Effect from "effect/Effect";
import * as O from "effect/Option";

export const clearErrorEffect =
  Effect.logDebug("clearErrorEffect::enter").pipe(
    () => Effect.andThen(
      AppErrorStore,
      store => store.set(O.none()),
    ),
    Effect.andThen(Effect.logDebug("clearErrorEffect::leave")),
  );

export const clearError = clearErrorEffect.pipe(
  Effect.provide(AppStateLive),
);
