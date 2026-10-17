import LineCharts from '../../components/Charts/LineCharts';
import PieCharts from '../../components/Charts/PieChart';
import BarCharts from '../../components/Charts/BarCharts';
import StatsCards from '../../components/StatsCards/StatsCards';
import Upcomingevents from '../../components/Events/Upcomingevents';
import PageTransition from '../../components/PageTransition/PageTransition'
import RecentApplications from '../../components/RecentApplications/RecentApplications'
import Messages from '../../components/Messages/Messages';
import QuickActions from '../../components/QuickActions/QuickActions';


import { useTranslation } from 'react-i18next';
import './Dashboard.css'

import { useChange } from '../../store/useChange';
const Dashboard=()=>{
const {mood}=useChange()
const {t} = useTranslation()

return (
    <PageTransition>
    <div className="dashboard">
       <section className={`title ${mood ? 'bg-[var(--color-dark-main)]':'bg-[var(--color-light-main)]'}`}>
<div className="text">
    <h3>{t("Welcome back, admin") }</h3>
</div>

       </section>
      <StatsCards/>
       <section className='stats'>
<LineCharts/>
<PieCharts/>
       </section>
       <section className='stats'>
         <BarCharts/>
         <Upcomingevents/>
       </section>
       <section className='stats'>
        <RecentApplications/>
        <Messages/>
       </section>
       <QuickActions/>
      
    </div>
    </PageTransition>
)
}
export default Dashboard