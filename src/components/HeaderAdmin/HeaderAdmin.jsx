import { FaRegMoon } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiSidebar } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { FaUniversity } from "react-icons/fa";
import './HeaderAdmin.css';
import { useEffect } from "react";
import useLogout from "../../Hooks/useLogout";
import { useChange } from "../../store/useChange";
function HeaderAdmin(){
    const navigate=useNavigate();
    const {i18n}=useTranslation();
    const {handleLogout}=useLogout()
    const {mood,setMood, setSidebarOpen,language,setLanguage}=useChange()
    
    const handelChangeLanguage = () =>{
        const newLang = language === "ar" ? "en" : "ar";
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    }
    
    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, []);

    return(
        <>
        <div className={`header ${mood? 'bg-[var(--color-dark-main)]':'bg-white'}`}>
           <div className={`title ${mood ?'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`} onClick={()=>navigate('/dashboard')}>
                <div className='iconSide' onClick={setSidebarOpen}>
                    <FiSidebar />
                </div>
               
{mood ? (
  <FaUniversity size={30}   className="text-[var(--color-light-text)] cursor-pointer"/>
) : (
  <FaUniversity size={30} className="text-[var(--color-light-main)] cursor-pointer" />
)}           </div>
           <div className={`info ${mood ?'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`}>
                <div className="language" onClick={handelChangeLanguage}>
                    <div className="lan">
                        <div className="icon">
                            <MdLanguage/>
                        </div>
 <span className="hidden sm:inline-block">
{language === "ar" ? "En" : "Ar"}</span>
                    </div>
                </div>
                <div>
                    {mood ? <IoSunnyOutline onClick={setMood} className="icon mood"/> : <FaRegMoon onClick={setMood} className="icon mood"/>}
                </div>
                <div className={`user ${language === 'en' ? 'border-l' : 'border-r'}`}>
                    <FiLogOut className="icon" onClick={()=>{
                        handleLogout();
                    }}/>
                </div>
            </div>
        </div>
        </>
    );
}
export default HeaderAdmin;