import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import './DeleteEditAction.css';
import { useChange } from "../../store/useChange";
function DeleteEditAction({ onDelete, row }) {
    const {
        setShowEidte,
     setFormDataDirect
    } = useChange();
const handleEidte = (data) => {
    setFormDataDirect(data);
};
    return (
        <div className="action">
            <button className="edit-btn" onClick={() => {
                handleEidte(row.original);
                setShowEidte(true);            
            }}>
                <CiEdit />
            </button>

            <button className="del-btn" onClick={onDelete}>
                <MdOutlineDelete />
            </button>
        </div>
    );
}

export default DeleteEditAction;