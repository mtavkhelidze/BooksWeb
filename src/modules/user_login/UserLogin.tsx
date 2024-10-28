import "./UserLogin.css";
import { Button } from "@blocks/Button.tsx";
import { ROUTE } from "@defs";
import { Schema } from "@effect/schema";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { execute } from "@lib/runtime.ts";
import * as Effect from "effect/Effect";
import { constVoid } from "effect/Function";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { userLogin, userLogout } from "./UserLogin.ctrl.ts";

const schema = Schema.Struct({
  email: Schema.String.pipe(
    Schema.nonEmptyString({ message: () => "*cannot be empty" }),
  ),
  password: Schema.String.pipe(
    Schema.nonEmptyString({ message: () => "*cannot be empty" }),
  ),
  remember: Schema.Boolean,
});

type FormData = Schema.Schema.Type<typeof schema>;

export const UserLogin = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: effectTsResolver(schema),
  });
  const [error, setError] = useState<string>();
  const [_, navigate] = useLocation();

  useEffect(() => {
    userLogout();
  }, []);

  const onSubmit = (data: FormData) => {
    const program =
      userLogin(data.email, data.password, data.remember).pipe(
        Effect.catchAll(e => Effect.fail(setError(e.message)),
        ),
      );

    execute(program).then(() => {
      setError("");
      navigate(ROUTE.HOME);
    }).catch(constVoid);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={
        () => {
          setError("");
          reset({
            email: "", password: "", remember: true,
          }, { keepErrors: false, keepDirty: false });
        }
      }
      className="flex flex-col gap-2 w-full md:w-3/4 lg:w-1/2"
    >
      <div>
        <div className="mb-2 block">
          <Label
            className="text-primary-600"
            htmlFor="email"
            role="label"
            value="Your email"
          />
          {errors.email
            ? <span
              className="text-xs ml-2 italic text-red-800"
              role="alert"
            >{errors.email.message}</span>
            : null
          }
        </div>
        <TextInput
          autoComplete="username"
          id="email"
          placeholder="name@example.com"
          type="email"
          {...register("email")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your password"
            className="text-primary-600"
          />
          {errors.password
            ? <span
              role="alert"
              className="text-xs ml-2 italic text-red-800"
            >{errors.password.message}</span>
            : null
          }
        </div>
        <TextInput
          autoComplete="current-password"
          id="password"
          type="password"
          placeholder="password"
          {...register("password")}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          className="checkbox"
          defaultChecked={true}
          id="remember"
          {...register("remember")}
        />
        <Label htmlFor="remember" className="text-primary-600">
          Remember me
        </Label>
      </div>
      <div className="flex flex-row w-full justify-end items-center gap-2">
        <span
          role="alert"
          className="text-xs ml-2 italic text-red-800"
        >{error}</span>
        <Button type="reset" style="secondary">Reset</Button>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};
