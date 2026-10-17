import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useChange } from '../../store/useChange';
import { useDashboard } from '../../Hooks/useDashboard';
import './Charts.css'
const PieCharts =()=> {
  const {mood,language}=useChange();
  const {colleges}=useDashboard()
  const college = (colleges || []).map((item) => {
  return {
    name: language === 'ar'? item.name_ar:item.name_en, 
    key: item.id?.toString() || item.name_en ,
    value:300
  };
});

  const lightColors = ['#10b982', '#8b5cf6', '#2464ec', '#ee4444','#f49e0b'];
  const darkColors=['#0a6b50','#4a2c8a', '#103a8c', '#992e2e', '#b8730a']
  return (
   <div dir='ltr' className={`pie charts ${mood ? 'bg-[var(--color-dark-main)]':
      'bg-white'
    }`}>
     <PieChart responsive={true} width={400} height={400}>
      <Pie
        data={colleges}
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
          <Cell key={`cell-${index}`} fill={mood?darkColors[index % darkColors.length]:lightColors[index % lightColors.length]} />
        ))}
      </Pie>
      <Tooltip cl formatter={(value, name, entry) => [value, entry.payload.name]}  />
<Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
          />    </PieChart>
   </div>
  );
}
export default PieCharts