import "@/App.css";
import { Route, Routes, useNavigate } from "react-router";
import DashboardLayout from "@/components/layout/dashboard";
import Workspace from "@/pages/workspace";
import DashboardHome from "@/pages/workspace/home";
import CreateForm from "@/pages/form/create";
import PreviewFormPage from "@/pages/form/preview";
import AnalyticsPage from "@/pages/form/analytics/page";
import { Button } from "@/components/ui/button";
import EmptyHome from "@/pages/home/emptyhome";
import LoginPage from "@/pages/login";

export default function App() {
  const navigate = useNavigate();
  const NotFound = () => (
    <div className="flex flex-col gap-7 w-full h-[100dvh] justify-center items-center text-center">
      <h1 className="text-6xl font-black ">404 - Page Not Found</h1>
      <Button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="scale-110 font-semibold"
        variant={"black"}
      >
        Go to Dashboard
      </Button>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<EmptyHome />} />
      <Route path="/login" element={<LoginPage />} />
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
