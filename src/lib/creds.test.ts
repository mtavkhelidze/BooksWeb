import { fc, it } from "@fast-check/vitest";
import { pipe } from "effect";
import * as E from "effect/Either";
import * as Eq from "effect/Equal";
import { assert, describe } from "vitest";
import {
  Email,
  InvalidEmailError,
  InvalidPasswordError,
  tryEmail,
  tryPassword,
} from "./creds.ts";

describe("InvalidEmailError", () => {
  it("should have correct tag", () => {
    assert(
      InvalidEmailError.name === new InvalidEmailError({ errors: [] })._tag);
  });
});

describe("InvalidPasswordError", () => {
  it("should have correct tag", () => {
    assert(
      InvalidPasswordError.name
      === new InvalidPasswordError({ errors: [] })._tag);
  });
});

describe("tryEmail", () => {
  it.prop([fc.emailAddress()])("valid email should be valid", (email) =>
    E.isRight(tryEmail(email)),
  );
  it.prop([fc.emailAddress()])("valid email should not change", (email) =>
    Eq.equals(tryEmail(email))(E.right(Email(email))),
  );
  it.prop([fc.string()])(
    "invalid email should return InvalidEmailError",
    (badEmail) =>
      pipe(
        tryEmail(badEmail.replace("@", "")),
        E.match({
          onLeft: e => e instanceof InvalidEmailError,
          onRight: () => false,
        }),
      ),
  );
});

describe("tryPassword", () => {
  it.prop([fc.string({ minLength: 1 })])(
    "any non-empty string will do",
    (pass) => Eq.equals(tryPassword(pass))(E.right(pass)),
  );
  it.prop([fc.string({ maxLength: 0 })])(
    "empty string will return InvalidPasswordError",
    (pass) => pipe(
      tryPassword(pass),
      E.match({
        onLeft: e => e instanceof InvalidPasswordError,
        onRight: () => false,
      }),
    ),
  );
});
