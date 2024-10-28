import { PleaseLogin } from "@blocks/PleaseLogin.tsx";
import { ROUTE } from "@defs";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useLocation } from "wouter";
import { BookLibraryStore } from "./BookLibrary.store.ts";
import { BookTabs } from "./views/BookTabs.tsx";
import { Header } from "./views/Header.tsx";

export const BookLibrary = observer(() => {
  const { books, privateBooks } = BookLibraryStore.self;
  const [isPrivate, setIsPrivate] = useState(false);
  const [_location, navigate] = useLocation();

  const handleTabChange = (isPrivate: boolean) => {
    setIsPrivate(isPrivate);
    navigate(isPrivate ? ROUTE.LIB_PRIVATE : ROUTE.HOME);
  };

  const haveUser = true;
  const userName = "misha";
  const title = haveUser ? `${userName}'s books` : "ReAtkiv Library";

  return (
    <div className="flex flex-col gap-1  relative">
      <Header title={title} showButtons={isPrivate} />
      {haveUser
        ? (
          <BookTabs
            haveUser={haveUser}
            onChange={handleTabChange}
            privateBooks={privateBooks}
            publicBooks={books}
          />
        )
        : (
          <PleaseLogin />
        )
      }

    </div>
  );
});
