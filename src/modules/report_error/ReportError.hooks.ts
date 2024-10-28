import { execute } from "@lib/runtime.ts";
import { clearError } from "@modules/report_error/ReportError.ctrl.ts";
import { AppStateLive } from "@state";
import { AppErrorStore } from "@state/AppErrorStore.ts";
import * as  Context from "effect/Context";

export const useAppError = () => {
  const { appError: error } = Context.get(AppStateLive, AppErrorStore);

  const executeClearError = () => {
    execute(clearError);
  };

  return { error, clearError: executeClearError };
};
