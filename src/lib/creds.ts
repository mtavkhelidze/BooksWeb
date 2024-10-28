import * as Brand from "effect/Brand";
import * as Data from "effect/Data";
import * as E from "effect/Either";

export type UserID = number & Brand.Brand<"UserID">;
export const UserID = Brand.nominal<UserID>();

export type JWTToken = string & Brand.Brand<"JWTToken">;
export const JWTToken = Brand.nominal<JWTToken>();

export type Email = string & Brand.Brand<"Email">;
export const Email = Brand.refined<Email>(
  (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  (email) => Brand.error(`Bad email address: '${email}'`),
);

export class InvalidEmailError extends Data.TaggedError("InvalidEmailError")<{
  readonly errors: Brand.Brand.BrandErrors;
}> {
  readonly message = "Invalid email.";
  static readonly make = (es: Brand.Brand.BrandErrors = []) =>
    new InvalidEmailError({ errors: es });
};

export const tryEmail = (email: string) =>
  Email.either(email).pipe(
    E.mapLeft(InvalidEmailError.make),
  );

export type Password = string & Brand.Brand<"Password">;
export const Password = Brand.refined<Password>(
  (password) => password.length > 0,
  () => Brand.error("Empty password."),
);

export class InvalidPasswordError
  extends Data.TaggedError("InvalidPasswordError")<{
    readonly errors: Brand.Brand.BrandErrors;
  }> {
  readonly message = "Invalid password.";
  static readonly make = (es: Brand.Brand.BrandErrors = []) =>
    new InvalidPasswordError({ errors: es });
};

export const tryPassword = (password: string) =>
  Password.either(password).pipe(
    E.mapLeft(es => InvalidPasswordError.make(es)),
  );

export const validateCredentials = (email: string, pass: string) =>
  tryEmail(email).pipe(
    E.andThen(
      e => tryPassword(pass).pipe(
        E.andThen(p => (
          { email: e, pass: p }
        )),
      ),
    ),
  );

export type CredentialsError = InvalidEmailError | InvalidPasswordError;
