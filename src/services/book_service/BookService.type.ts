import { HttpClientResponse } from "@effect/platform";
import { Schema } from "@effect/schema";

const stringDefaults = {
  constructor: () => "<no data>",
  decoding: () => undefined,
};

export class BookRecord extends Schema.Class<BookRecord>("BookRecord")({
  author: Schema.String
    .pipe(
      Schema.optional,
      Schema.withDefaults(stringDefaults),
    ),
  id: Schema.Number.pipe(
    Schema.optional,
    Schema.withDefaults({
      constructor: () => Date.now(),
      decoding: () => undefined,
    }),
  ),
  name: Schema.String
    .pipe(
      Schema.optional,
      Schema.withDefaults(stringDefaults),
    ),
  ownerId: Schema.String
    .pipe(
      Schema.optional,
      Schema.withDefaults(stringDefaults),
    ),
}) {
  static toArray = HttpClientResponse
    .schemaBodyJson(Schema.Array(BookRecord));
}
