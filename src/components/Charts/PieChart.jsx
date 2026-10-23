import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useChange } from '../../store/useChange';
import { useDashboard } from '../../Hooks/useDashboard';
import { HiOutlineChartPie } from "react-icons/hi"; 
import './Charts.css';

const PieCharts = () => {
  const { mood, language } = useChange();
  const { colleges } = useDashboard();
  const { t } = useTranslation();

  const safeColleges = Array.isArray(colleges) ? colleges : [];

  const college = safeColleges.map((item) => ({
    name: language === 'ar' ? (item.name_ar || item.name_en) : (item.name_en || item.name_ar),
    key: item.id?.toString() || item.name_en,
    value: item.value || 300, 
  }));

  const lightColors = ['#10b982', '#8b5cf6', '#2464ec', '#ee4444', '#f49e0b'];
  const darkColors = ['#0a6b50', '#4a2c8a', '#103a8c', '#992e2e', '#b8730a'];

  const hasData = college.length > 0;

  return (
    <div 
      dir="ltr" 
      className={`pie charts ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}
      style={{ width: '100%', minHeight: '400px' }}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={college}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={110}
              innerRadius={60}
              paddingAngle={3}
              fill="#8884d8"
              dataKey="value"
            >
              {college.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={mood ? darkColors[index % darkColors.length] : lightColors[index % lightColors.length]} 
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, entry) => [value, entry.payload.name]} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className={`flex flex-col items-center justify-center h-full py-24 w-full gap-y-3 ${mood ? 'text-gray-400' : 'text-gray-500'}`}>
          <HiOutlineChartPie size={45} className="opacity-60" />
          <p className="text-sm font-medium">{t("no_colleges_found") || "لا توجد بيانات كليات متاحة حالياً"}</p>
        </div>
      )}
    </div>
  );
};

export default PieCharts;