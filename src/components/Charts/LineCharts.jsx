import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import './Charts.css';
import { useTranslation } from 'react-i18next';
import { useChange } from '../../store/useChange';
import { useDashboard } from '../../Hooks/useDashboard';
import { FaChartLine } from "react-icons/fa"; 
const LineCharts = () => {
  const { mood } = useChange();
  const { applications, students } = useDashboard();
  const { t } = useTranslation();

  const totalStudents = students?.length || 0;
  const totalApplications = applications?.length || 0;

  const data = useMemo(() => {
    const now = new Date();
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = d.toLocaleString('en-US', { month: 'long' });
      result.push({
        name: t(monthName) || monthName,
        students: i === 0 ? totalStudents : Math.round(totalStudents * (1 - i * 0.15)),
        applications: i === 0 ? totalApplications : Math.round(totalApplications * (1 - i * 0.25)),
      });
    }
    return result;
  }, [totalStudents, totalApplications, t]);

  // فحص ما إذا كانت إجمالي البيانات الحالية صفرًا بالكامل
  const hasData = totalStudents > 0 || totalApplications > 0;

  const gridColor = mood ? '#374151' : '#e5e7eb';
  const axisColor = mood ? '#9ca3af' : '#374151';
  const tooltipBg = mood ? '#1f2937' : '#ffffff';
  const tooltipText = mood ? '#f9fafb' : '#111827';

  return (
    <div
      dir="ltr"
      className={`line charts ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}
      style={{ width: '100%', minHeight: '320px' }}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                color: tooltipText,
                border: 'none',
                borderRadius: 8,
              }}
            />
            <Legend />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#4f6ee3"
              strokeWidth={2.5}
              name={t('students')}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#82ca9d"
              strokeWidth={2.5}
              name={t('applications')}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className={`flex flex-col items-center justify-center h-full py-16 w-full gap-y-3 ${mood ? 'text-gray-400' : 'text-gray-500'}`}>
          <FaChartLine size={45} className="opacity-60" />
          <p className="text-sm font-medium">{t("no_chart_data") || "لا توجد بيانات إحصائية متاحة حالياً"}</p>
        </div>
      )}
    </div>
  );
};

export default LineCharts;