import "./main.css";

import { Navigator } from "@modules/navigator";
import { ReportError } from "@modules/report_error";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as init from "./init.ts";

import { Routes } from "./routes/Routes.tsx";

init.hydrate();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="bg-white lg:w-4/5 min-h-dvh flex flex-col mx-auto container">
      <ReportError />
      <header id="navigator" className="w-full border-b-gray-600 border-b ">
        <Navigator />
      </header>
      <section
        id="content"
        className="py-2 container flex flex-1 px-4 justify-center items-start"
      >
        <Routes />
      </section>
      <footer
        id="footer"
        className="flex flex-row px-2 py-1.5 justify-center align-top gap-2 border-t border-t-secondary-600"
      >
        <img className="h-4" src="/react.svg" alt="React" />
        <img className="h-4" src="/mobx.svg" alt="MobX" />
        <img className="h-4" src="/effect.svg" alt="Effect TS" />
        <img className="h-4" src="/flowbite.svg" alt="Flowbite React" />
        <img className="h-4" src="/tailwind.svg" alt="TailwindCSS" />
      </footer>
    </main>
  </StrictMode>,
);
