import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchJob from "./components/body/job/SearchJob";
import PostJob from "./components/body/job/PostJob";
import Profile from "./components/profile/Profile/Profile";
import Notification from "./components/profile/notification/Notification";
import JobDetails from "./components/body/job/JobDetails";
import ClientProfile from "./components/profile/Profile/ClientProfile";
import ViewPdf from "./components/profile/Job_Details/ViewPdf";
import { Provider } from "react-redux";
import { Store } from "./components/store/Store";
import { fetchJobs } from "./components/slices/PostSlice";
import AcceptedClientPage from "./components/profile/Job_Details/AcceptedClientPage";
import ClientPendingDetails from "./components/profile/Job_Details/ClientPendingDetails";
import Payment from "./components/payments/Payment";
import ClientDetails from "./components/payments/ClientDetails/ClientDetails";
import Projects from "./components/payments/Projects/Projects";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ViewTask from "./components/profile/Job_Details/ViewTask";
import PaymentSuccess from "./components/payments/Projects/PaymentSuccess";

const root = ReactDOM.createRoot(document.getElementById("root"));

Store.dispatch(fetchJobs());

root.render(
  <Provider store={Store}>
    <PayPalScriptProvider deferLoading={false}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>{" "}
          <Route path="/searchJob" element={<SearchJob />}></Route>
          <Route path="/post" element={<PostJob />}></Route>
          <Route path="/jobDetails/:id" element={<JobDetails />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/notify" element={<Notification />}></Route>
          <Route path="/clientProfile/:id" element={<ClientProfile />} />
          <Route path="/viewPdf/:pdf" element={<ViewPdf />} />
          <Route path="/viewTask/:pdf" element={<ViewTask />} />
          <Route path="/acceptedClient/:id" element={<AcceptedClientPage />} />
          <Route path="/pendingJob/:id" element={<ClientPendingDetails />} />
          <Route path="/acceptapplication/:id" element={<Payment />}>
            <Route index element={<ClientDetails />} />
            <Route
              path="/acceptapplication/:id/project"
              element={<Projects />}
            />
          </Route>
          <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
);
