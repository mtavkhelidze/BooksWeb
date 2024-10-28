import { EmptyLibrary } from "@blocks/EmptyLibrary.tsx";
import { NoBooksYet } from "@blocks/NoBooksYet.tsx";
import { BookCard } from "./BookCard.tsx";
import { BookRecord } from "@services/book_service";
import { Tabs } from "flowbite-react";

const TAB_INDEX = {
  PRIVATE: 1,
  PUBLIC: 0,
};

type Props = {
  haveUser: boolean;
  onChange: (isPrivate: boolean) => void;
  privateBooks: BookRecord[];
  publicBooks: BookRecord[];
};

export const BookTabs = ({
  haveUser,
  onChange,
  privateBooks,
  publicBooks,
}: Props) => {
  const handleTabChange = (activeTabNumber: number) => {
    if (activeTabNumber === TAB_INDEX.PRIVATE) {
      onChange(true);
    }
    if (activeTabNumber === TAB_INDEX.PUBLIC) {
      onChange(false);
    }
  };

  const havePublic = publicBooks.length > 0;
  const havePrivate = privateBooks.length > 0;

  return (
    <Tabs
      aria-label="tabs"
      onActiveTabChange={handleTabChange}
      variant="fullWidth"
    >
      <Tabs.Item active title="All books">
        {havePublic
          ?
          <div className="grid grid-flow-row-dense gap-2 grid-cols-2 md:grid-cols-3">
            {publicBooks.map(b => <BookCard key={b.id} book={b} />)}
          </div>
          : <EmptyLibrary />
        }
      </Tabs.Item>
      <Tabs.Item title="Books by you">
        {haveUser && havePrivate ?
          <div className="grid grid-flow-row-dense gap-2 grid-cols-2 md:grid-cols-3">
            {privateBooks.map(b => <BookCard key={b.id} book={b} />)}
          </div>
          : <NoBooksYet />
        }
      </Tabs.Item>
    </Tabs>
  );
};
