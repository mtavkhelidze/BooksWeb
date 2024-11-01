import * as Config from "effect/Config";
import * as ConfigProvider from "effect/ConfigProvider";

export const AppConfig = {
  apiBase: Config.string("API_BASE").pipe(
    Config.mapAttempt((_) => new URL(_)),
    Config.map((url) => url.href.replace(/\/$/, "")),
  ),
  logLevel: Config.logLevel("LOG_LEVEL"),
};

type DotEnvConfig = {
  env: {
    VITE_API_BASE: string;
    VITE_LOG_LEVEL: string;
  }
};

const EnvConfig: DotEnvConfig = {
  env: {
    VITE_API_BASE: (
      import.meta as unknown as DotEnvConfig
    ).env.VITE_API_BASE,
    VITE_LOG_LEVEL: (
      import.meta as unknown as DotEnvConfig
    ).env.VITE_LOG_LEVEL,
  },
};

export const ViteEnvConfig = ConfigProvider.fromMap(
  new Map(Object.entries(EnvConfig.env)),
  { pathDelim: "_", seqDelim: "," },
).pipe(
  ConfigProvider.nested("vite"),
  ConfigProvider.constantCase,
);
