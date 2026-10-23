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
import { HiOutlineChartBar } from "react-icons/hi2"; // أيقونة للحالة الفارغة
import "./Charts.css";

const BarCharts = () => {
  const { t } = useTranslation();
  const { programs } = useDashboard();
  const { mood } = useChange();

  const categories = ["bachelor", "master", "phd", "diploma"];

  const safePrograms = Array.isArray(programs) ? programs : [];

  const chartData = categories.map((category) => {
    const count = safePrograms.filter((item) => {
      if (!item || !item.level) return false;
      return String(item.level).toLowerCase().trim() === category;
    }).length;

    return {
      name: t(category) || category,
      value: count,
      key: category,
    };
  });

  // فحص ما إذا كانت جميع القيم تساوي صفرًا أو القائمة فارغة
  const totalCount = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div
      dir="ltr"
      className={`charts bar ${
        mood ? "bg-[var(--color-dark-main)]" : "bg-white"
      }`}
    >
      {totalCount > 0 ? (
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
      ) : (
        <div className={`flex flex-col items-center justify-center h-full py-20 w-full gap-y-3 ${mood ? 'text-gray-400' : 'text-gray-500'}`}>
          <HiOutlineChartBar size={45} className="opacity-60" />
          <p className="text-sm font-medium">{t("no_programs_found") || "لا توجد بيانات برامج متاحة"}</p>
        </div>
      )}
    </div>
  );
};

export default BarCharts;