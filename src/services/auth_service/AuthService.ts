import { Email, JWTToken, Password, UserID } from "@lib/creds.ts";
import { pipe } from "effect";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as  Effect from "effect/Effect";
import * as  Match from "effect/Match";
import { AuthUser } from "./AuthService.schema";

export class InvalidCredentials
  extends Data.TaggedError("InvalidCredentials") {
  readonly message = "User not found or incorrect password.";
}

export type AuthError = InvalidCredentials;

export class AuthService extends Context.Tag("AuthService")<
  AuthService,
  {
    readonly authenticate: (
      email: Email,
      password: Password,
    ) => Effect.Effect<AuthUser, AuthError>;
  }
>() {
  static readonly Dummy = AuthService.of({
    authenticate: (email: Email, password: Password) => pipe(
      Match.value([email, password]),
      Match.when(
        ["misha@zgharbi.ge", "misha"],
        () => Effect.succeed(AuthUser.make({
          email: Email(email),
          id: UserID(1),
          jwtToken: JWTToken("token"),
        })),
      ),
      Match.orElse(() => Effect.fail(new InvalidCredentials())),
    ),
  });
};
