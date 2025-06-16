import "@/App.css";
import Home from "@/pages/home";
import About from "@/pages/about";
import { Route, Routes } from "react-router";
import DashboardLayout from "@/components/layout/dashboard";
import Workspace from "@/pages/workspace";
import DashboardHome from "@/pages/workspace/home";
import HeroLayout from "@/components/layout/hero";
import CreateForm from "@/pages/form/create";
import PreviewFormPage from "@/pages/form/preview";
import AnalyticsPage from "@/pages/form/analytics/page";

export default function App() {
  const NotFound = () => (
    <div className="flex justify-center items-center">
      <h1>404 - Page Not Found</h1>
    </div>
  );
  const ErrorFound = () => (
    <div className="flex justify-center items-center">
      <h1>Error: Something Not Found.</h1>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HeroLayout />} errorElement={<ErrorFound />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />

        <Route path=":workspaceId">
          <Route index element={<Workspace />} />
          <Route path=":formId/create" element={<CreateForm />} />
          <Route path=":formId/analytics" element={<AnalyticsPage />} />
        </Route>
      </Route>
      <Route
        path=":workspaceId/:formId/preview"
        element={<PreviewFormPage />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
