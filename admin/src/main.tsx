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
import { UseLayoutContext } from "./context";
import { ProjectDetails } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UseLayoutContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/jobs" element={<ProjectPage />} />
            <Route path="/jobs/:id" element={<ProjectDetails />} />

            <Route path="/payment" element={<PaymentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UseLayoutContext>
  </React.StrictMode>
);
