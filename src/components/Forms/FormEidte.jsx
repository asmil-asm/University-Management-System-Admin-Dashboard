import { useTranslation } from "react-i18next";
import { useChange } from '../../store/useChange';
import './Forms.css';

function FormEidte({ title, fields, onUpdate, isPending }) {
    const { t } = useTranslation();
    const { setShowEidte, mood, formData, setFormData } = useChange();

    const getFileUrl = (path) => {
        if (!path) return "";
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        const API_ORIGIN = import.meta.env.VITE_API_BASE_URL || 'https://university-management-system-607v.onrender.com';
        const baseDomain = API_ORIGIN.split('/api/v1')[0].replace(/\/+$/, '');
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseDomain}${cleanPath}`;
    };

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
                                {formData?.existing_file && (
                                    <div style={{ marginBottom: '8px', fontSize: '13px' }}>
                                        <span className={mood ? 'text-gray-400' : 'text-gray-600'}>{t("current_file")}: </span>
                                        {/* ✅ استخدام الدالة هنا لحل المشكلة */}
                                        <a href={getFileUrl(formData.existing_file)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {t("view_file") || "View File"}
                                        </a>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    name={field.name}
                                    multiple={field.multiple || false} 
                                    accept={field.name === 'images' ? "image/*" : ".pdf,.doc,.docx,image/*"}
                                    onChange={(e) => {
                                        const files = field.multiple ? Array.from(e.target.files) : e.target.files[0];
                                        if (files) {
                                            setFormData({
                                                target: {
                                                    name: field.name,
                                                    value: files
                                                }
                                            });
                                        }
                                    }}
                                    className={mood ? 'text-gray-300' : 'text-gray-700'}
                                />
                                
                                <small style={{ display: 'block', color: '#888', marginTop: '4px' }}>
                                    {t("leave_empty_to_keep_current") || "Leave empty if you don't want to change the file"}
                                </small>
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
                    <button 
                        className={`save-btn ${isPending ? '!bg-gray-500' : ''}`} 
                        disabled={isPending}
                        onClick={() => onUpdate(formData?.id)}
                    > 
                        {isPending ? t("editing...") : t("edit")} 
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