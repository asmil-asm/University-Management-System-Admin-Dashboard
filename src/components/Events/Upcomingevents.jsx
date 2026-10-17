import { BsCalendar4Event } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChange } from "../../store/useChange";
import { useDashboard } from "../../Hooks/useDashboard";
import './Upcomingevents.css'
const Upcomingevents=()=>{
    const {t} =useTranslation();
    const {events}=useDashboard()
    const navigate=useNavigate()
    const {mood,language}=useChange()
    const event=events ||[]
    const currentDate=new Date()
    const oneYearago=new Date();
const date=oneYearago.setFullYear(currentDate.getFullYear()-1)
const sortEvents=[...event].sort((a,b)=>new Date(b.event_date) - new Date(a.event_date));
const eventList=event.length <=4 ? sortEvents : sortEvents.filter(item => new Date(item.event_date) >= date).slice(0, 4);
    const lightColors = ['#10b982', '#8b5cf6', '#2464ec', '#ee4444','#f49e0b'];
  const darkColors=['#0a6b50','#4a2c8a', '#103a8c', '#992e2e', '#b8730a']
return (
    <div className={` events ${mood ? 'bg-[var(--color-dark-main)]':'bg-white'}`}>
<div className={`text ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`} >
    <div className="flex items-center gap-x-2"><BsCalendar4Event className="icon"/>
    <h4>{t("upcoming_events")}</h4></div>
<button  className={` ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`} onClick={()=>navigate('events')}>{t("view_all")}</button>
</div>
<div className="info">
    {eventList.map((item,index)=>(
        <div className= "event" style={{ backgroundColor: mood ? darkColors[index] : lightColors[index] }}
 key={index} >
    {language === 'ar' ?<p>{item.title_ar}</p>:            <p>{item.title_en}</p>
}
            <span>{item.event_date.split('T')[0]}</span>
        </div>
    ))}
</div>
    </div>
)
}
export default Upcomingevents