import { AppStorage } from "@services/app_storage";
import { AuthService } from "@services/auth_service";
import * as Context from "effect/Context";

export const AppServicesLive = Context.empty().pipe(
  Context.add(AppStorage, AppStorage.Local),
  Context.add(AuthService, AuthService.Dummy),
);
