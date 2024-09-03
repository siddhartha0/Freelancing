import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  Layout,
  PaymentPage,
  ProjectPage,
  UserPage,
} from "./pages/";
import { LayoutContext } from "./context";
import { ProjectDetails } from "./components";
import { Provider } from "react-redux";
import { store } from "./state-management/store";
import { Invoice } from "./components/payments/invoice";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LayoutContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/jobs" element={<ProjectPage />} />
              <Route path="/jobs/:id" element={<ProjectDetails />} />

              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/invoice/:id" element={<Invoice />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LayoutContext>
    </Provider>
  </React.StrictMode>
);
