import { useTranslation } from "react-i18next";
import './StatsCards.css'
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { PiGraduationCapLight } from "react-icons/pi";
import { LiaNewspaper } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import{ IoBookOutline} from "react-icons/io5"
import {useChange} from '../../store/useChange'
import { useDashboard } from "../../Hooks/useDashboard";
const StatsCards = () => {
    const { mood} = useChange()
    const {university,colleges,articles,applications,library}=useDashboard()
  const { t } = useTranslation();
const stats = [
    { name: "universities", Icon: HiOutlineBuildingOffice, number:university?.length || 10 },
    { name: "colleges", Icon: PiGraduationCapLight, number: colleges?.length || 10 },
        { name: "articles", Icon: LiaNewspaper, number: articles?.length || 10 },
    { name: "applications", Icon: FaRegFileAlt, number: applications?.length || 10 },
    { name: "libraries", Icon: IoBookOutline, number: library?.length || 10 }
];
  
    
    return (
        <section className='stat-cards'>
            {stats.map((card, index) => (
                <div 
                    key={index} 
            className={`card ${mood ? 'bg-[var(--color-dark-main)] text-[var(--color-light-text)]' : 'bg-white text-[var(--color-dark-text)]'}`}
                >
<div className="icon">{card.Icon && <card.Icon />}</div>
<div className='number'>
  {card.number}
</div>
 <div className='name'>{t(card.name)}</div>
                   
                </div>
            ))}
        </section>
    )
}

export default StatsCards