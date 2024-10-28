import { AuthUser } from "@services/auth_service";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as E from "effect/Either";

export class ProfileNotAuthorizedError extends Data.TaggedError(
  "ProfileNotAuthorizedError")<{}> {
  readonly _tag = "ProfileNotAuthorizedError";
  readonly message = "User is not authorized to fetch profile";
}

export type ProfileError = ProfileNotAuthorizedError;

// @ts-ignore
interface _ProfileService {
  fetch: () => Effect.Effect<E.Either<AuthUser, ProfileError>>;
}
