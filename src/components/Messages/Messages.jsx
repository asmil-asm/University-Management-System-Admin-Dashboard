
import { RiMessage2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChange } from "../../store/useChange";
import { useDashboard } from "../../Hooks/useDashboard";
import './Messages.css'
const Messages=()=>{
           const {t,i18n} = useTranslation();
const {contact}=useDashboard()
            const navigate=useNavigate()
       const{mood}=useChange()
       const message=Array.isArray(contact)? contact.slice(0,3):[]
return(
    <div className={`box ${mood ? 'bg-[var(--color-dark-main)]':'bg-white'}`}>
        <div className="info">
<div className={`text ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`}>
    <RiMessage2Line className="icon"/>
                       <h4>{t("messages")}</h4> 

</div>
<button  className={` ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`} onClick={()=>navigate('contact-messages')}>{t("view_all")}</button>
        </div>
<div className="messages">
    { message.map((message,index)=>(
       <div key={index}  className={`card ${mood ? 'bg-[var(--color-dark-second)]':'bg-[var(--color-light-second)]'}`}>
<div className="data">
    <div >
    <div className={mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}>
       <h4> {message.sender_name}</h4>
        <p>{i18n.language ==='en'?message.subject_en:message.subject_ar}</p>
    </div>
    </div>
</div>
       </div> 
    ))}
</div>
    </div>
)
}
export default Messages