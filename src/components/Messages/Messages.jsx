import { RiMessage2Line, RiChatOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useChange } from "../../store/useChange";
import { useDashboard } from "../../Hooks/useDashboard";
import './Messages.css';

const Messages = () => {
    const { t, i18n } = useTranslation();
    const { contact } = useDashboard();
    const navigate = useNavigate();
    const { mood } = useChange();
    
    const message = Array.isArray(contact) ? contact.slice(0, 3) : [];

    return (
        <div className={`box ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}>
            <div className="info">
                <div className={`text ${mood ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-main)]'}`}>
                    <RiMessage2Line className="icon" />
                    <h4>{t("messages")}</h4>
                </div>
                <button 
                    className={`${mood ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-main)]'}`} 
                    onClick={() => navigate('contact-messages')}
                >
                    {t("view_all")}
                </button>
            </div>

            <div className="messages">
                {message.length > 0 ? (
                    message.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`card ${mood ? 'bg-[var(--color-dark-second)]' : 'bg-[var(--color-light-second)]'}`}
                        >
                            <div className="data">
                                <div>
                                    <div className={mood ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-main)]'}>
                                        <h4>{msg.sender_name}</h4>
                                        <p>{msg.subject}</p>
                                        <p>{i18n.language === 'en' ? msg.subject_en : msg.subject_ar}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={`flex flex-col items-center justify-center py-10 w-full gap-y-3 ${mood ? 'text-gray-400' : 'text-gray-500'}`}>
                        <RiChatOffLine size={40} className="opacity-60" />
                        <p className="text-sm font-medium">{t("no_messages_found") || "لا توجد رسائل حالياً"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;