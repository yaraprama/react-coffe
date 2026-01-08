import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Datachart } from "./Datachart";

export default function ChartSection() {
  return (
    <div className="card chart-card">
      <h3>Statistik Penjualan</h3>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={Datachart}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="order"
            fill="#FF8A00"
            radius={[8, 8, 0, 0]}
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#2EC4B6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
