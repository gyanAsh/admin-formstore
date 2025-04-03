import "@/App.css";
import Home from "@/pages/home";
import About from "@/pages/about";
import { $counter } from "@/store/count";
import { Route, Routes } from "react-router";
import { useStore } from "@nanostores/react";
import DashboardLayout from "@/components/layout/dashboard";
import Workspace from "@/pages/workspace";
import LoginPage from "@/pages/login";
import HeroLayout from "./components/layout/hero";

export default function App() {
  const client = useStore($counter);

  console.log({ client });
  return (
    <Routes>
      <Route path="/" element={<HeroLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/workspace" element={<DashboardLayout />}>
        <Route path=":workspaceId" element={<Workspace />} />
      </Route>
    </Routes>
  );
}
