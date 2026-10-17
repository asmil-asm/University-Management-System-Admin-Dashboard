import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';   // ⬅️ استبدل useParams
import PageTransition from '../../components/PageTransition/PageTransition';
import Tables from "../../components/Tables/Tables";
import SearchAdd from "../../components/SearchAdd/SearchAdd";
import FormEidte from '../../components/Forms/FormEidte';
import FormAdd from '../../components/Forms/FormAdd';
import DeleteModel from '../../components/DeleteModel/DeleteModel';
import { useChange } from '../../store/useChange';
import { useDashboard } from '../../Hooks/useDashboard';
import useHandler from '../../Hooks/useHandler';
import Content from '../../components/content/Content'
import { getDashboardConfig } from '../../lib/dashboardConfigs';
import { useCallback } from 'react';
import { DATA_KEY_MAP } from '../../lib/keys';
import './ResourcePage.css';
const RESOURCE_DEPENDENCIES = {
    universities:           [],
    colleges:               ['university'],
    departments:            ['colleges'],
    programs:               ['departments'],
    staff:                  ['departments'],
    research:               ['staff'],
    events:                 ['university'],
    articles:               ['university'],
    advertisements:         ['university'],
    'job-postings':         ['university'],
    services:               [],
    branches:               ['university'],
    languages:              [],
    library:                ['university'],
    pages:                  ['university'],
    students:               [],
    'social-media':         ['university'],
    'contact-messages':     [],
    'admissions-info':      ['programs'],
    applications:           ['jopPosting'],
    'student-applications': ['programs'],
};
const ResourcePage = () => {
    const location = useLocation();
    const resourceType = location.pathname.split('/').filter(Boolean).pop();
    const dataKey = DATA_KEY_MAP[resourceType] || resourceType;
        const neededKeys = RESOURCE_DEPENDENCIES[resourceType] ||[];
    const dashboardData = useDashboard(neededKeys);
        const rowData = dashboardData?.[dataKey] ?? [];
    const { t, i18n } = useTranslation();

    const {
        search, showEidte, showAdd, showDelete, formData,
        content, setSelectedIdToDelete, setShowDelete, setContent,
    } = useChange();

    const {
        handelAdd, handleUpdate, confirmDelete,
        isAdding, isUpdating, isDeleting,
    } = useHandler(dataKey);

    const openDeleteModal =useCallback((id) => {
        setSelectedIdToDelete(id);
        setShowDelete(true);
    },[setShowDelete,setSelectedIdToDelete]);

    
    const {
    university = [],
    colleges = [],
    departments = [],
    programs = [],
    staff = [],
    jopPosting = [],
} = dashboardData || {};


    const config = useMemo(
        () => getDashboardConfig(
            resourceType,
            t,
        { university, colleges, departments, programs, staff, jopPosting },
            { openDeleteModal, setContent },
            i18n
        ),
        [resourceType, t, i18n.language,
        university, colleges, departments, programs, staff, jopPosting,
        openDeleteModal, setContent]   
    );

const filterData = useMemo(() => {
    if (!config) return [];

    const mapped = (rowData || []).map((item) =>
        config.mapItem ? config.mapItem(item) : item
    );

    const searchTerm = (search || "").toLowerCase();
    if (!searchTerm) return mapped;

    return mapped.filter((item) =>
        config.searchKeys.some((key) => {
            const val = key.split('.').reduce((acc, k) => acc?.[k], item);
            return String(val ?? "").toLowerCase().includes(searchTerm);
        })
    );
}, [config, search, rowData]);

    if (!config) return <div>Invalid Resource Type: {resourceType}</div>;

    return (
        <PageTransition>
            <div className='page'>
                <SearchAdd />
                <Tables columns={config.columns} data={filterData} />

                {showEidte && (
                    <FormEidte
                        key={formData?.id || 'edit-form'}
                        title={config.titleEdit}
                        fields={config.fieldsEdit || config.fields}
                        isPending={isUpdating}
                        onUpdate={() => handleUpdate(formData?.id, formData, config.baseUrl)}
                    />
                )}

                {showAdd && (
                    <FormAdd
                        isPending={isAdding}
                        title={config.titleAdd}
                        fields={config.fields}
                        onSave={() => handelAdd(config.addUrl || config.baseUrl, formData)}
                    />
                )}

                {showDelete && (
                    <DeleteModel
                        isPending={isDeleting}
                        onConfirm={() => confirmDelete(config.baseUrl)}
                    />
                )}

                {content && <Content content={content} />}
            </div>
        </PageTransition>
    );
};

export default ResourcePage;