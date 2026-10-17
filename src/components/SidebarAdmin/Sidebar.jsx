import { RxCaretRight,RxCaretLeft  } from "react-icons/rx";
import { useState } from "react";
import {NavLink,useNavigate} from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import  data  from "../../data";
import "./Sidebar.css";
import { useChange } from "../../store/useChange";
function Sidebar() {

    const {t} = useTranslation();
    const navigate=useNavigate();
    const [indexOpen, setIndexOpen] = useState(null);
const {sidebarOpen, setSidebarOpen,mood,language}=useChange()

return (
    <div   className={`sidebar 
    ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-[var(--color-light-main)]'} 
    ${language === 'en' 
      ? `max-md:left-0 ${sidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}` 
      : `max-md:right-0 ${sidebarOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}`
    }`}>
    <div className="text">
     
        <h3>University Admin</h3>
    </div>
<div className="home" onClick={()=>navigate('/dashboard')}>< AiOutlineHome /> <h4>{t("home")}</h4></div>
    <div className="nav">
        {data.map((section, index) => {
        const Icon = section.icon;
        const isOpen = indexOpen === index;

        return (
            <div   key={index}>
            <div
            className="info"
                onClick={() =>
                setIndexOpen(isOpen ? null : index)
                }
            >
                <Icon className="icon" />
             <h3>{t(section.title)}</h3>

                {language === 'en'?
                <RxCaretRight 
                className={`caret-right ${
                    isOpen ? "rotate-90" : ""  
                } ${language ==='ar'? 'mr-auto' : 'ml-auto'} `}
                />: <RxCaretLeft  className={`caret-left ${
                    isOpen ? "-rotate-90" : ""  
                }`}/>}
            </div>

            {isOpen && section.items && (
                <div className="data">
                <ul>
                    {section.items.map((item, i) => {
                    const SubIcon = item.icon;

                    return (
                       <NavLink key={i} to={item.path} onClick={() => setSidebarOpen()}>
                        
                        <li>
                        <SubIcon className="icons" />
                        <span>{t(item.name)}</span>
                        </li>
                       </NavLink>
                    );
                    })}
                </ul>
                </div>
            )}
            </div>
        );
        })}
    </div>
    </div>
);
}

export default Sidebar;