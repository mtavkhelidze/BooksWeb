"use client";

import { AuthUser } from "@services/auth_service";
import * as Context from "effect/Context";
import * as O from "effect/Option";
import { makeAutoObservable } from "mobx";

export class AuthUserStore extends Context.Tag("AuthUserStore")<
  AuthUserStore,
  {
    set(user: O.Option<AuthUser>): void;
    user: O.Option<AuthUser>;
  }
>() {
  static readonly Live = makeAutoObservable(
    AuthUserStore.of({
      set(user: O.Option<AuthUser>) {
        this.user = user;
      },
      user: O.none<AuthUser>(),
    }),
  );
}
