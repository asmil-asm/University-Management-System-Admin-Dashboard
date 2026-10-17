import './QuickActions.css'
import data from '../../data'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useChange } from '../../store/useChange';
const QuickActions=()=>{
const {t} = useTranslation();

    const {mood}=useChange()
return(
    <div className='quick'>
<h2 className={` ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`}>{t("Quick actions")}</h2>
<div className="actions">
    {data.map((item,index)=>(
        <div key={index} className={`cart ${mood ? 'bg-[var(--color-dark-main)]':'bg-white'}`}>
<div className={`text ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`}>
    <div className="icon"><div className="icon">{<item.icon />}</div>
</div>
    <h4>{t(item.title)}</h4>

</div>
<ul>
  {item.items.map((li,i)=>(
    <Link key={i} to={li.path}><li className={` ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-dark-text)]'}`} >{t(li.name)}</li></Link>
  ))}  
</ul>
        </div>
    ))}
</div>
    </div>
)
}
export default QuickActions