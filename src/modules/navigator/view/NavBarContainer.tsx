import { ROUTE } from "@defs";
import React, { PropsWithChildren } from "react";
import { IconContext } from "react-icons";
import { GiSpiderWeb } from "react-icons/gi";
import { Link } from "wouter";

export const NavBarContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: "text-primary-600" }}>
      <div className="flex flex-row justify-between align-top px-2 sm:px-4 py-1">
        <div className="flex flex-col justify-center select-none">
          <Link to={ROUTE.HOME}>
            <div className="flex flex-row items-center">
              <GiSpiderWeb className="h-[2rem] w-auto mr-1" />
              <p className="text-2xl">BooksWeb</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </div>
    </IconContext.Provider>
  );
};
