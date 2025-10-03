import DashboardProvider from "./provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
