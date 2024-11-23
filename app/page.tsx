import type { Metadata } from "next";
import Dashboard from "./components/Dashboard";

export const metadata: Metadata = {
  title: "Cikistore | Dashboard",
};

export default function Home() {
  return (
    <div className="p-2">
      <Dashboard />
    </div>
  );
}
