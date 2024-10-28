import * as Context from "effect/Context";
import { AppErrorStore } from "./AppErrorStore.ts";
import { AuthUserStore } from "./AuthUserStore.ts";

export const AppStateLive = Context.empty().pipe(
  Context.add(AppErrorStore, AppErrorStore.Live),
  Context.add(AuthUserStore, AuthUserStore.Live),
);
