import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/langs";
import { App } from "./app";
import "@/style/style.css";
import { Provider } from "@/components/ui/provider";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <I18nextProvider i18n={i18n}>
    <Provider>
      <App />
    </Provider>
  </I18nextProvider>,
);
