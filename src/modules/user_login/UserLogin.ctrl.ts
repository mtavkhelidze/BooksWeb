import { validateCredentials } from "@lib/creds.ts";
import { execute } from "@lib/runtime.ts";
import { AppServicesLive } from "@services";
import {
  AuthService,
  removeUserFromStorage,
  tryAddingUserToStorage,
} from "@services/auth_service";
import { AppStateLive } from "@state";
import { AuthUserStore } from "@state/AuthUserStore.ts";
import * as Effect from "effect/Effect";
import { constVoid } from "effect/Function";
import * as O from "effect/Option";

export const userLoginEffect = (
  email: string,
  pass: string,
  remember: boolean,
) =>
  Effect.logDebug("userLoginEffect::enter").pipe(
    Effect.andThen(() => validateCredentials(email, pass)),
    Effect.andThen(
      creds => Effect.andThen(
        AuthService,
        service => service.authenticate(creds.email, creds.pass),
      ),
    ),
    Effect.tap(
      user => remember ? tryAddingUserToStorage(user) : Effect.void,
    ),
    Effect.andThen(
      user => Effect.andThen(
        AuthUserStore,
        store => store.set(O.some(user)),
      ),
    ),
    Effect.tap(() => Effect.logDebug("userLoginEffect::leave")),
  );

export const userLogin = (
  email: string,
  pass: string,
  remember: boolean,
) =>
  userLoginEffect(email, pass, remember).pipe(
    Effect.provide(AppStateLive),
    Effect.provide(AppServicesLive),
  );

export const userLogoutEffect =
  Effect.logDebug("userLogoutEffect::enter").pipe(
    Effect.andThen(
      () => Effect.andThen(
        AuthUserStore,
        store => store.set(O.none()),
      ),
    ),
    Effect.andThen(removeUserFromStorage),
    Effect.catchAll(Effect.logDebug),
    Effect.andThen(Effect.logDebug("userLogoutEffect::leave")),
  );

export const userLogout = () => {
  execute(
    userLogoutEffect.pipe(
      Effect.provide(AppStateLive),
      Effect.provide(AppServicesLive),
    ),
  ).then(constVoid).catch(constVoid);
};
