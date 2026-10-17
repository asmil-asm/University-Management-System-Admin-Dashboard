import { useTranslation } from "react-i18next";
import { useChange } from '../../store/useChange';
import './Forms.css';

function FormEidte({ title, fields, onUpdate,isPending }) {
    const { t } = useTranslation();
    const { setShowEidte, mood, formData, setFormData } = useChange();

    return (
        <div className="form-container">
            <div className={`form-box ${mood ? 'bg-[var(--color-dark-main)]' : 'bg-white'}`}>
                <h2 className={mood ? 'text-[var(--color-light-text)]' : 'text-[var(--color-dark-text)]'}>{title}</h2>
                
                {fields.map((field, index) => (
                    <div key={index} className="form-field-group" style={{ marginBottom: '15px' }}>
                        <label className={mood ? 'text-[var(--color-light-text)]' : 'text-[var(--color-dark-text)]'} style={{ display: 'block', marginBottom: '5px' }}>
                            {field.label || field.placeholder || field.name}:
                        </label>
                        
                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={formData?.[field.name] || ""}
                                onChange={setFormData}
                                className={`form-control ${mood ? 'text-gray-300 bg-gray-800' : 'text-[var(--color-dark-text)] bg-white'}`}
                            >
                                <option value="">{t("select")}</option>
                                {(field.options || []).map((opt) => (
                                    <option key={opt.id || opt.value} value={opt.id || opt.value}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData?.[field.name] || ""}
                                onChange={setFormData}
                                className={`form-control ${mood ? 'text-[var(--color-light-text)] bg-gray-800' : 'text-[var(--color-dark-text)] bg-white'}`}
                                rows={4}
                            />
                        ) : field.type === 'file' ? (
                            <div className="file-input-wrapper">
 <input
    type="file"
    name={field.name}
    multiple={field.multiple || false} 
    accept={field.name === 'images' ? "image/*" : ".pdf,.doc,.docx,image/*"}
    onChange={(e) => {
        const files = field.multiple ? Array.from(e.target.files) : e.target.files[0];
        setFormData({
            target: {
                name: field.name,
                value: files
            }
        });
    }}
    className={mood ? 'text-gray-300' : 'text-gray-700'}
/>
                                {formData?.[field.name] && typeof formData[field.name] === 'string' && (
                                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                                        📄 {t("current_file") || "Current file exists"}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData?.[field.name] || ""}
                                onChange={setFormData}
                                className={`form-control ${mood ? 'text-[var(--color-light-text)] bg-gray-800' : 'text-[var(--color-dark-text)] bg-white'}`}
                            />
                        )}
                    </div>
                ))}
                
                <div className="form-action">
                    <button className={`save-btn ${isPending ? '!bg-gray-500' : ''}`} disabled={isPending}
 onClick={() => onUpdate(formData?.id)}> 
                        {isPending ? t("editing..."):t("edit")} 
                    </button>
                    <button className="cancel-btn" onClick={() => setShowEidte(false)}>
                        {t("cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormEidte;