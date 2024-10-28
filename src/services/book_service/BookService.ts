import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import { AppConfig, ViteEnvConfig } from "@services/AppConfig.ts";
import { AppError } from "@types";
import { Context, pipe } from "effect";
import * as Effect from "effect/Effect";
import * as E from "effect/Either";
import { BookRecord } from "./BookService.type.ts";

export interface BookService {
  readonly allBooks: (user: string) => Effect.Effect<
    E.Either<readonly BookRecord[], AppError>
  >;
  readonly privateBooks: (user: string) => Effect.Effect<
    E.Either<readonly BookRecord[], AppError>
  >;
}

export const BookService = Context.GenericTag<BookService>("@app/BookService");

export const BookServiceLive = Effect.gen(function* () {
  const apiBase = yield* AppConfig.apiBase;
  console.log(apiBase);

  const client = pipe(
    yield* HttpClient.HttpClient,
    HttpClient.filterStatusOk,
    HttpClient.mapRequest(HttpClientRequest.prependUrl(apiBase)),
  );

  const getBooks = (own: boolean) => (user: string) => {
    return HttpClientRequest.get(`/books/${user}/${own ? "private" : ""}`)
      .pipe(
        client.execute,
        Effect.flatMap(r => BookRecord.toArray(r)),
        Effect.mapError(AppError.of),
        Effect.scoped,
        Effect.either,
      );
  };

  return BookService.of({
    allBooks: getBooks(false),
    privateBooks: getBooks(true),
  });
}).pipe(
  Effect.provide(FetchHttpClient.layer),
  Effect.withConfigProvider(ViteEnvConfig),
);
