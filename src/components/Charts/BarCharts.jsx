import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { useChange } from "../../store/useChange";
import { useDashboard } from "../../Hooks/useDashboard";
import "./Charts.css";

const BarCharts = () => {
  const { t } = useTranslation();
  const { staff } = useDashboard();
  const { mood } = useChange();

  const categories = ["Bachelor", "Master", "PhD", "Diploma"];

  const chartData = categories.map((category) => {
    const count =
      staff?.filter((item) => item.title === category).length || 0;
    return {
      name: t(category),
      value: count,
      key: category,
    };
  });

  return (
    <div
      dir="ltr"
      className={`charts bar ${
        mood ? "bg-[var(--color-dark-main)]" : "bg-white"
      }`}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value, entry) => [
              value,
              entry?.payload?.name ?? entry?.name ?? "",
            ]}
            labelFormatter={(label) => label}
          />
          <Bar
            dataKey="value"
            fill={mood ? "#1a2a6e" : "#4f6ee3"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;