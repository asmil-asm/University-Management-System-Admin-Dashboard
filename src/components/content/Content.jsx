import { useChange } from '../../store/useChange';
import './Content.css';

const Content = ({ content }) => {
    const { setContent } = useChange();
    
    return (
        <div className="content" onClick={() => setContent(null)}>
            <div className="box" onClick={(e) => e.stopPropagation()}>
                <p>{content}</p>
                <div className="cancel cursor-pointer text-center" onClick={() => setContent(null)}>
                    cancel
                </div>
            </div>
        </div>
    );
};

export default Content;