import "@/App.css";
import Home from "@/pages/home";
import About from "@/pages/about";
import { Route, Routes } from "react-router";
import DashboardLayout from "@/components/layout/dashboard";
import Workspace from "@/pages/workspace";
import HeroLayout from "@/components/layout/hero";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Form from "@/pages/form";

export default function App() {
  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HeroLayout />} errorElement={<ErrorFound />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/workspace" element={<DashboardLayout />}>
          <Route path=":workspaceId">
            <Route index element={<Workspace />} />
            <Route path=":fromId" element={<Form />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}
