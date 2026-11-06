import  { useState, useEffect } from 'react';
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

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const safeColleges = Array.isArray(colleges) ? colleges : [];

  const college = safeColleges.map((item) => ({
    name: language === 'ar' ? (item.name_ar || item.name_en) : (item.name_en || item.name_ar),
    key: item.id?.toString() || item.name_en,
    value: item.value || 300, 
  }));

  const lightColors = ['#10b982', '#8b5cf6', '#2464ec', '#ee4444', '#f49e0b'];
  const darkColors = ['#0a6b50', '#4a2c8a', '#103a8c', '#992e2e', '#b8730a'];

  const hasData = college.length > 0;

  const isMobile = windowWidth < 640;
  const outerRadius = isMobile ? 70 : 110;
  const innerRadius = isMobile ? 35 : 60;
  const chartHeight = isMobile ? 320 : 400;

  return (
    <div 
      dir="ltr" 
      className={`pie charts w-full ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}
      style={{ minHeight: `${chartHeight}px`, padding: '10px' }}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              data={college}
              cx="50%"
              cy="42%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
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
            <Tooltip 
              formatter={(value, name, entry) => [value, entry.payload.name]} 
              contentStyle={{ fontSize: isMobile ? '12px' : '14px', borderRadius: '8px' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ 
                fontSize: isMobile ? '11px' : '13px', 
                paddingTop: '10px',
                width: '100%',
                whiteSpace: 'nowrap',
                overflowX: 'auto'
              }}
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