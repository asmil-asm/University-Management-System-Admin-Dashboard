import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import PageTransition from '../../components/PageTransition/PageTransition';
import Tables from '../../components/Tables/Tables';
import SearchAdd from '../../components/SearchAdd/SearchAdd';
import FormEidte from '../../components/Forms/FormEidte';
import FormAdd from '../../components/Forms/FormAdd';
import DeleteModel from '../../components/DeleteModel/DeleteModel';
import { useChange } from '../../store/useChange';
import { useDashboard } from '../../Hooks/useDashboard';
import useHandler from '../../Hooks/useHandler';
import Content from '../../components/content/Content';
import { getDashboardConfig } from '../../lib/dashboardConfigs';
import { DATA_KEY_MAP } from '../../lib/keys';
import './ResourcePage.css';

const EMPTY_ARRAY = [];

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
    const { t, i18n } = useTranslation();

    const resourceType = useMemo(
        () => location.pathname.split('/').filter(Boolean).pop(),
        [location.pathname]
    );

    const dataKey = DATA_KEY_MAP[resourceType] || resourceType;

    const neededKeys = useMemo(() => {
        const deps = RESOURCE_DEPENDENCIES[resourceType] || EMPTY_ARRAY;
        return Array.from(new Set([...deps, dataKey].filter(Boolean)));
    }, [resourceType, dataKey]);

    const dashboardData = useDashboard(neededKeys);

    const rowData = dashboardData?.[dataKey] ?? EMPTY_ARRAY;

    const {
        search, showEidte, showAdd, showDelete, formData,
        content, setSelectedIdToDelete, setShowDelete, setContent,
    } = useChange();

    const {
        handelAdd, handleUpdate, confirmDelete,
        isAdding, isUpdating, isDeleting,
        
    } = useHandler({ listQueryKey: dataKey });

    const openDeleteModal = useCallback((id) => {
        setSelectedIdToDelete(id);
        setShowDelete(true);
    }, [setShowDelete, setSelectedIdToDelete]);

    const {
        university = EMPTY_ARRAY,
        colleges = EMPTY_ARRAY,
        departments = EMPTY_ARRAY,
        programs = EMPTY_ARRAY,
        staff = EMPTY_ARRAY,
        jopPosting = EMPTY_ARRAY,
    } = dashboardData || {};

    const config = useMemo(
        () => getDashboardConfig(
            resourceType,
            t,
            { university, colleges, departments, programs, staff, jopPosting },
            { openDeleteModal, setContent },
            i18n
        ),
        [
            resourceType, t, i18n, i18n.language,
            university, colleges, departments, programs, staff, jopPosting,
            openDeleteModal, setContent,
        ]
    );

    const filterData = useMemo(() => {
        if (!config) return EMPTY_ARRAY;

        const source = rowData || EMPTY_ARRAY;
        const searchTerm = String(search ?? '').toLowerCase().trim();
        const searchKeys = config.searchKeys ?? EMPTY_ARRAY;

        const filtered = !searchTerm || searchKeys.length === 0
            ? source
            : source.filter((item) =>
                searchKeys.some((key) => {
                    const val = key.split('.').reduce((acc, k) => acc?.[k], item);
                    return String(val ?? '').toLowerCase().includes(searchTerm);
                })
            );

        return filtered.map((item) =>
            config.mapItem ? config.mapItem(item) : item
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
                        onSave={() => handelAdd(config.baseUrl, formData)}
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