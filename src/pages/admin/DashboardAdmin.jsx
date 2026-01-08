import StatsCards from "./dashboard/StatsCards";
import ChartSection from "./dashboard/ChartSection";
import PerformanceCard from "./dashboard/PerformanceCard";
import OrderList from "./dashboard/OrderList";
import ReportCard from "./dashboard/ReportCard";
import "./dashboard.css";

export default function DashboardAdmin() {
  return (
    <div className="dashboard">
      <h2 className="greeting">Hello Yars,</h2>

      <StatsCards />

      <div className="dashboard-grid">
        <ChartSection />
        <PerformanceCard />
        <OrderList />
        <ReportCard />
      </div>
    </div>
  );
}
