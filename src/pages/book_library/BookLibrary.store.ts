import { BookRecord } from "@services/book_service";
import { action, computed, observable } from "mobx";

export class BookLibraryStore {
  public static self: BookLibraryStore = new BookLibraryStore();

  // @ts-ignore
  @observable accessor books: BookRecord[] = [];

  protected constructor() {}

  @computed
  public get numPrivateBooks() {
    return this.privateBooks.length;
  };

  @computed
  public get privateBooks() {
    return [];
  };

  @action
  private setBooksAction(books: readonly BookRecord[]) {
    this.books = [...books];
  };

  public setBooks = (books: readonly BookRecord[]) => {
    this.setBooksAction(books);
  };

  @action
  private resetBooksAction = () => {
    this.books = [];
  };

  public resetBooks = () => {
    this.resetBooksAction();
  };
}
