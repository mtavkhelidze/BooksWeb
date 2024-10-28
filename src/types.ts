export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;



export interface AppError {
  readonly _source: string;
  readonly _tag: "AppError";
  readonly message: string;
}

export const AppError = {
  generic: (message: string) => (): AppError => (
    {
      _source: "AppError",
      _tag: "AppError",
      message,
    }
  ),
  of: (e: Error & { _tag: string; reason?: string }): AppError => {
    return {
      _source: e._tag,
      _tag: "AppError",
      message: e.message
        // ?? e.cause
        // ?? e.reason
        ?? "UnknownError",
    };
  },
};

export interface Future<R, E> extends Promise<R> {
  catch<TResult = never>(onRejected?: ((reason: E) => (PromiseLike<TResult> | TResult)) | undefined | null): Future<R, E>;

  then<TResult1 = R, TResult2 = E>(
    onfulfilled?: ((value: R) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onRejected?: ((reason: E) => (PromiseLike<TResult2> | TResult2)) | undefined | null,
  ): Future<TResult1, TResult2>;

  finally(onFinally?: (() => void) | undefined | null): Future<R, E>;
}


export interface FutureConstructor extends PromiseConstructor {
  readonly prototype: Promise<unknown>;

  reject<Error>(reason?: Error): Future<never, Awaited<Error>>;

  resolve<Result>(value?: Result): Future<Awaited<Result>, never>;
}

export const Future: Pick<FutureConstructor, "reject" | "resolve"> = {
  reject: function <Error = AppError>(reason?: Error): Future<never, Awaited<Error>> {
    return Promise.reject(reason) as unknown as Future<never, Awaited<Error>>;
  },
  resolve: function <Result>(value?: Result): Future<Awaited<Result>, never> {
    return Promise.resolve(value) as unknown as Future<Awaited<Result>, never>;
  },
};

export type Result<T> = Future<T, AppError>;

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  ERROR = "error",
}
