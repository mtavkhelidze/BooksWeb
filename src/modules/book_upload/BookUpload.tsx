import { BookUploadCtrl } from "@modules/book_upload/BookUpload.ctrl.ts";
import { BookData } from "@modules/book_upload/BookUpload.type.ts";
import { UploadModal } from "@modules/book_upload/views/UploadModal.tsx";
import { Button } from "flowbite-react";
import { useState } from "react";

export const BookUpload = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  const onSend = (bd: BookData) => {
    closeModal();
    BookUploadCtrl.self.uploadBook(bd);
  };
  return (
    <div className="flex flex-row gap-2">
      <Button
        gradientDuoTone="redToYellow"
        onClick={openModal}
        outline
        size="xs"
      >remove all</Button>
      <Button
        gradientDuoTone="cyanToBlue"
        onClick={openModal}
        outline
        size="xs"
      >add book</Button>
      <UploadModal onClose={closeModal} onSend={onSend} show={show} />
    </div>
  );
};
