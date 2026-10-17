import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Charts.css';
import { useTranslation } from "react-i18next";
import { useChange } from '../../store/useChange';
import {useDashboard} from '../../Hooks/useDashboard'
const LineCharts = () => {
  const { mood } = useChange();
  const {applications,students}=useDashboard()
  const { t } = useTranslation();
  const totalStudents = students?.length || 0;
  const totalApplications =applications?.length || 0;
  const getDynamicData = () => {
    const monthsData = [];
    const date = new Date();

    for (let i = 2; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      
      const monthName = d.toLocaleString('en-US', { month: 'long' });
      monthsData.push({
        name: t(monthName), 
        students: i === 0 ? totalStudents : Math.round(totalStudents * (1 - i * 0.15)), 
        applications: i === 0 ? totalApplications : Math.round(totalApplications * (1 - i * 0.25))
      });
    }
    return monthsData;
  };

  const data = getDynamicData();

  return (
    <div dir='ltr' className={`line charts ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}>
      <LineChart  responsive={true} width={600} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend 
          payload={[
            { value: t('students'), type: 'line', id: 'students', color: '#4f6ee3' },
            { value: t('applications'), type: 'line', id: 'applications', color: '#82ca9d' }
          ]} 
        />
        
        <Line type="monotone" dataKey="students" stroke="#4f6ee3" name={t('students')} />
        <Line type="monotone" dataKey="applications" stroke="#82ca9d" name={t('applications')} />
      </LineChart>
    </div>
  );
}

export default LineCharts;