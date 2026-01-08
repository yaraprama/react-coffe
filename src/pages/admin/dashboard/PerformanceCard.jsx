import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Performance", value: 78, fill: "#FF8A00" },
];

export default function PerformanceCard() {
  return (
    <div className="card performance">
      <h3>Performa</h3>

      <div className="performance-chart">
        <ResponsiveContainer width="100%" height={160}>
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="performance-value">
          78%
        </div>
      </div>

      <p className="performance-desc">
        Performa kinerja Arua Coffee
      </p>
    </div>
  );
}
