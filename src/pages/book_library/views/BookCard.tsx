import { BookRecord } from "@services/book_service";
import { Card } from "flowbite-react";

type Props = {
  book: BookRecord;
};

export const BookCard = ({ book }: Props) => {
  return (
    <Card className="shadow-md flex flex-col">
      <p className="flex flex-col text-xl font-boldtext-gray-900">
        {book.name}
        <span className="text-sm font-semibold text-gray-500">by {book.author}</span>
      </p>
      <p className="text-sm text-gray-500 italic">Added by {book.ownerId}</p>
    </Card>
  );
};
