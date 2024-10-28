import { ROUTE } from "@defs";
import { useUserProfile } from "@modules/user_profile";
import * as O from "effect/Option";
import { Dropdown } from "flowbite-react";
import { observer } from "mobx-react-lite";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "wouter";
import { NavBarContainer } from "./view/NavBarContainer.tsx";

export const Navigator = observer(() => {
  const { user, logout } = useUserProfile();
  const [location, _] = useLocation();

  const handleLogout = () => {
    logout();
  };
  const onLoginPage = location === ROUTE.USER_LOGIN;

  return (
    <NavBarContainer>
      {O.isSome(user)
        ? (
          <Dropdown
            size="xs" label="" dismissOnClick={true}
            renderTrigger={() => (
              <div className="hover:cursor-pointer">
                <CgProfile className="h-auto w-6" />
              </div>
            )}
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold truncate">
                {user.value.email}
              </span>
              <span className="block truncate text-xs font-light">Added books: 0</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        )
        : (
          !onLoginPage &&
          <Link className="text-sm" to={ROUTE.USER_LOGIN}>Login</Link>
        )}
    </NavBarContainer>
  );
});
