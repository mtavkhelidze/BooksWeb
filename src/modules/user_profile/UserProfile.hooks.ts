import { userLogin, userLogout } from "@modules/user_login";
import { AppStateLive } from "@state";
import { AuthUserStore } from "@state/AuthUserStore.ts";
import * as Context from "effect/Context";
import * as O from "effect/Option";

export const useUserProfile = () => {
  const { user } = Context.get(AppStateLive, AuthUserStore);

  return {
    isAuthenticated: O.isSome(user),
    login: userLogin,
    logout: userLogout,
    user,
  };
};
