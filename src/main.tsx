import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Root from "./Root.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CssBaseline />
    <Root />
    <ToastContainer />
  </>
);
