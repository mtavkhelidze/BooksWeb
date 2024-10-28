import { ROUTE } from "@defs";
import { UserLogin } from "@modules/user_login";
import { Route, Switch } from "wouter";
import { NotFound } from "@blocks/NotFound.tsx";

export const Routes = () => {
  return (
    <Switch>
      <Route path={ROUTE.USER_LOGIN} component={UserLogin} />
      <Route><NotFound /></Route>
    </Switch>
  );
};
