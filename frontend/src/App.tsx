import "@/App.css";
import Home from "@/pages/home";
import Layout from "./components/layout/dashboard/DashboardLayout";
import { Button } from "./components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $counter } from "@/store/count";
import { NavLink } from "react-router";

export default function App() {
  const client = useStore($counter);

  console.log({ client });
  return (
    <Layout>
      <main className="flex min-h-screen w-full flex-col items-center justify-center relative isolate">
        <Home />
        <div className="flex items-center justify-center gap-3">
          <Button>
            {" "}
            <Plus />{" "}
          </Button>
          <h3>Count: {}</h3>
          <Button asChild>
            <NavLink to={"/about"} end>
              About
            </NavLink>
          </Button>
        </div>
      </main>
    </Layout>
  );
}
