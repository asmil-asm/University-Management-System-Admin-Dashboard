import { useEffect } from 'react';
import { useChange } from '../../store/useChange';
import './Content.css';

const Content = ({ content }) => {
    const { setContent } = useChange();

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setContent(null); };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [setContent]);

    return (
        <div className="content" onClick={() => setContent(null)}>
            <div className="box" onClick={(e) => e.stopPropagation()}>
                <div className="box-header">
                    <h3 className="box-title">
                        <span>📄</span> Details
                    </h3>
                    <button
                        type="button"
                        className="box-close"
                        onClick={() => setContent(null)}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="box-body">{content}</div>

                <div className="box-footer">
                    <button
                        type="button"
                        className="cancel"
                        onClick={() => setContent(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Content;