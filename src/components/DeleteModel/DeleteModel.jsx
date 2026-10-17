import './DeleteModel.css';
import { useTranslation } from "react-i18next";
import { useChange } from '../../store/useChange';
function DeleteModel({ onConfirm,isPending }) {

    const { t } = useTranslation();
    const { setShowDelete, mood } = useChange();

    return (
        <div className='delet-model'>
            <div className={`delete-box ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}>

                <h3>{t("Are You Sure?")}</h3>

                <div className='delet-actions'>

                    <button
className={`yes-btn ${isPending ? 'bg-gray-500 opacity-50 cursor-not-allowed' : ''}`}                        onClick={onConfirm}
                        disabled={isPending}
                    >
{isPending ? t("deleting...") : t("Yes")}                    </button>

                    <button
                        className='no-btn'
                        onClick={()=>setShowDelete(false)}
                    >
                        {t("No")}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default DeleteModel;