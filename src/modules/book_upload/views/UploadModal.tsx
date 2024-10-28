import { yupResolver } from "@hookform/resolvers/yup";
import { Optional } from "@types";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { JSX } from "react";
import { FieldError, useForm } from "react-hook-form";
import * as yup from "yup";
import { BookData } from "../BookUpload.type.ts";

const schema: yup.ObjectSchema<BookData> = yup.object({
  author: yup.string().required("is required"),
  title: yup.string().required("is required"),
});

const errorMessage = (fe: Optional<FieldError>): JSX.Element =>
  <span className="text-xs text-pink-700 italic">&nbsp;{fe
    ? fe.message
    : ""}</span>;

type Props = {
  onClose: () => void;
  onSend: (bd: BookData) => void;
  show: boolean;
};

export const UploadModal = ({ onSend, onClose, show }: Props) => {
  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<BookData>({ resolver: yupResolver(schema) });

  const onSubmit = (values: BookData) => {
    onSend(values);
  };

  const onCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Modal.Header>Add a book</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
                <span>{errorMessage(errors.title)}</span>
              </div>
              <TextInput
                id="title"
                type="text"
                placeholder="book title..."
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="author" value="Author" />
                <span>{errorMessage(errors.author)}</span>
              </div>
              <TextInput
                id="author"
                type="text"
                placeholder="author name..."
                {...register("author", { required: true })}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-row justify-end">
          <Button color="gray" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Send</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
