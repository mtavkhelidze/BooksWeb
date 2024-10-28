import { BookData } from "@modules/book_upload/BookUpload.type.ts";

export class BookUploadCtrl {
  public static self: BookUploadCtrl = new BookUploadCtrl();
  // privateBooks static bookLibrary = BookLibraryCtrl.self;
  // privateBooks errorStore = ReportErrorStore.self;
  // privateBooks userStore = AuthUserStore.self;
  // privateBooks service: LibraryService = LibraryService([
  //   httpTransport,
  //   this.userStore,
  // ]);

  private constructor() {}

  public uploadBook(_bd: BookData) {

  }
}
