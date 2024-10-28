import { execute } from "@lib/runtime.ts";
import { AppServicesLive } from "@services";
import { trySettingUserFromStorage } from "@services/auth_service";
import { AppStateLive } from "@state";
import * as Effect from "effect/Effect";
import { constVoid } from "effect/Function";

export const hydrate = () => {
  const prog = trySettingUserFromStorage.pipe(
    Effect.provide(AppServicesLive),
    Effect.provide(AppStateLive),
  );

  execute(prog).then(constVoid).catch(constVoid);
};
