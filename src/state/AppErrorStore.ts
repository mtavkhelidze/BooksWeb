import { AuthError } from "@services/auth_service";
import * as Context from "effect/Context";
import * as O from "effect/Option";
import { makeAutoObservable } from "mobx";
import { CredentialsError } from "@lib/creds.ts";

export type AppError = AuthError | CredentialsError;

export class AppErrorStore extends Context.Tag("AppErrorStore")<
  AppErrorStore,
  {
    appError: O.Option<AppError>;
    set: (e: O.Option<AppError>) => void;
  }
>() {
  static readonly Live = makeAutoObservable(
    AppErrorStore.of({
      appError: O.none<AppError>(),
      set(e: O.Option<AppError>) {
        this.appError = e;
      },
    }),
  );
}
