import { AppError } from "@state/AppErrorStore.ts";
import * as O from "effect/Option";
import { Alert } from "flowbite-react";
import { observer } from "mobx-react-lite";
import { useAppError } from "./ReportError.hooks.ts";

type Props = {
  error: O.Option<AppError>;
  onDismiss: () => void;
};

const Alerter = ({ error, onDismiss }: Props) => {
  return O.isNone(error) ? null : (
    <Alert
      onDismiss={onDismiss}
      rounded={false}
      color="red"
      className="py-1 my-2 w-fit absolute self-center    "
    >
      <span className="font-bold">Error: </span>{error.value.message}
    </Alert>
  );
};

export const ReportError = observer(() => {
  const { error, clearError } = useAppError();
  const handleDismiss = () => {
    clearError();
  };

  return <Alerter error={error} onDismiss={handleDismiss} />;
});
