import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";

const StorageKey = {
  AUTH_USER: "authUser",
} as const;
type StorageKey = typeof StorageKey[keyof typeof StorageKey];

export class AppStorage extends Context.Tag("AppStorage")<
  AppStorage,
  {
    readonly get: (k: StorageKey) => Effect.Effect<string, Cause.NoSuchElementException, never>;
    readonly rm: (k: StorageKey) => Effect.Effect<void, never, never>;
    readonly set: (
      k: StorageKey,
      a: unknown,
    ) => Effect.Effect<void, Cause.UnknownException, never>;
  }
>() {
  static Local = AppStorage.of({
    get: key => Effect.fromNullable(localStorage.getItem(key)),
    rm: key => Effect.succeed(localStorage.removeItem(key)),
    set: (key, a) => Effect.try(
      () => localStorage.setItem(key, JSON.stringify(a)),
    ),
  });
  static StorageKey = StorageKey;

}
