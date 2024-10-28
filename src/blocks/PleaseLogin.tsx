import { ROUTE } from "@defs";
import { Link } from "wouter";

export const PleaseLogin = () => {
  return (
    <h1 className="font-light flex justify-center text-lg text-gray-500">
      <Link className="underline" to={ROUTE.USER_LOGIN}>Introduce
        yourself</Link>&nbsp;to see the books.
    </h1>
  );
};
