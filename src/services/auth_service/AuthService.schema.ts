import { Schema } from "@effect/schema";
import { Email, JWTToken, UserID } from "@lib/creds.ts";
import { AppStorage } from "@services/app_storage";
import { AuthUserStore } from "@state/AuthUserStore.ts";
import { pipe } from "effect";
import * as Effect from "effect/Effect";
import * as O from "effect/Option";

export class AuthUser extends Schema.Class<AuthUser>("AuthUser")({
  email: Schema.String.pipe(Schema.fromBrand(Email)),
  id: Schema.Number.pipe(Schema.fromBrand(UserID)),
  jwtToken: Schema.String.pipe(Schema.fromBrand(JWTToken)),
}) {
  static decode = (json: string) => Schema.decode(AuthUser)(JSON.parse(json));
}

export const trySettingUserFromStorage =
  Effect.logDebug("trySettingUserFromStorage::enter").pipe(
    () => Effect.andThen(
      AppStorage,
      storage => storage.get(AppStorage.StorageKey.AUTH_USER),
    ),
    Effect.andThen(AuthUser.decode),
    Effect.andThen(
      au => Effect.andThen(
        AuthUserStore,
        store => store.set(O.some(au)),
      ),
    ),
    Effect.catchAll(Effect.logDebug),
    Effect.andThen(Effect.logDebug("trySettingUserFromStorage::leave")),
  );

export const tryAddingUserToStorage = (user: AuthUser) =>
  Effect.andThen(
    AppStorage,
    storage => storage.set(AppStorage.StorageKey.AUTH_USER, user),
  );

export const removeUserFromStorage =
  pipe(
    Effect.logDebug("trySettingUserFromStorage::enter"),
    () => Effect.andThen(
      AppStorage,
      storage => storage.rm(AppStorage.StorageKey.AUTH_USER),
    ),
  );
