import { IoIosAdd } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useChange } from "../../store/useChange";
import './SearchAdd.css';

function SearchAdd(){
    const {t} = useTranslation();
    const {search,setSearch,setShowAdd,resetForm}=useChange()

    return(
        <>
        <div className="header-searchAdd">
            <input type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e)=> setSearch(e.target.value)}/>

            <button className="add-btn" onClick={()=>{
                setShowAdd(true)
                resetForm()
            }
                
            } >
                {t("add")}
                <IoIosAdd/>
                
                </button>
        </div>
        </>
    );
}
export default SearchAdd;