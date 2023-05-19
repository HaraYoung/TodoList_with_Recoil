import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
  </RecoilRoot>
);
