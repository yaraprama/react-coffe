import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const miniData = [
  { value: 20 },
  { value: 35 },
  { value: 30 },
  { value: 45 },
  { value: 40 },
  { value: 55 },
];

export default function ReportCard() {
  return (
    <div className="card report">
      <h3>Laporan</h3>

      {/* TOTAL PENDAPATAN */}
      <div className="report-item">
        <Icon icon="mdi:cash-multiple" />
        <div>
          <p>Total Pendapatan</p>
          <h4>Rp 50.000.000</h4>
        </div>
      </div>

      {/* MINI CHART */}
      <div className="mini-chart">
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={miniData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF8A00"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TOTAL PESANAN */}
      <div className="report-item">
        <Icon icon="mdi:clipboard-list" />
        <div>
          <p>Total Pesanan</p>
          <h4>1.600</h4>
        </div>
      </div>

      {/* PERTUMBUHAN */}
      <div className="report-item">
        <Icon icon="mdi:chart-line" />
        <div>
          <p>Pertumbuhan</p>
          <h4 className="positive">+12%</h4>
        </div>
      </div>
    </div>
  );
}
