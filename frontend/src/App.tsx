import "@/App.css";
import Home from "@/pages/home";
import About from "@/pages/about";
import { $counter } from "@/store/count";
import { Route, Routes } from "react-router";
import { useStore } from "@nanostores/react";
import DashboardLayout from "@/components/layout/dashboard";
import Workspace from "@/pages/workspace";
import HeroLayout from "./components/layout/hero";

export default function App() {
  const client = useStore($counter);

  console.log({ client });
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
      <Route path="/workspace" element={<DashboardLayout />}>
        <Route path=":workspaceId" element={<Workspace />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
