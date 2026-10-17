import { TbFileCvFilled } from "react-icons/tb";
import DeleteEditAction from "../components/DeleteEditAction/DeleteEditAction";

export const getDashboardConfig = (resourceType, t, optionsData = {}, handlers = {}, i18n = {}) => {
    const { 
        university = [], 
        colleges = [], 
        departments = [], 
        programs = [], 
        staff = [], 
        jopPosting = []
    } = optionsData || {};

    const { openDeleteModal, setContent } = handlers;

    const actionColumn = {
        accessorKey: "action",
        header: t("actions"),
        cell: ({ row }) => {
            const itemId = row.original?.id || row.id;
            return (
                <DeleteEditAction 
                    row={row} 
                    onDelete={() => openDeleteModal && openDeleteModal(itemId)}
                />
            );
        }
    };

    const renderContentCell = (textKey) => ({
        cell: ({ row }) => {
            const desc = row.original[textKey] || "";
            return (
                <div 
                    className="cursor-pointer" 
                    onClick={() => setContent && setContent(desc)} 
                    title={t('View All')}
                >
                    {desc.length > 30 ? `${desc.substring(0, 30)}...` : desc}
                </div>
            );
        }
    });

    switch (resourceType) {
        // ==================== 1. الجامعات (Universities) ====================
        case 'universities':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/universities/",
                titleAdd: t("add_university"),
                titleEdit: t("edit_university"),
                searchKeys: ['name_ar', 'name_en'],
                columns: [
                    { accessorKey: "name_ar", header: t("name_ar") },
                    { accessorKey: "name_en", header: t("name_en") },
                    { accessorKey: "location", header: t("location") },
                    { accessorKey: "email", header: t("email") },
                    { accessorKey: "phone", header: t("phone") },
                    actionColumn,
                ],
                fields: [
                    { name: "name_ar", placeholder: t("name_ar"), type: 'text' },
                    { name: "name_en", placeholder: t("name_en"), type: 'text' },
                    { name: "location", placeholder: t("location"), type: 'text' },
                    { name: "email", placeholder: t("email"), type: 'email' },
                    { name: "phone", placeholder: t("phone"), type: 'text' },
                ],
                mapItem: (item) => item
            };

        // ==================== 2. الكليات (Colleges) ====================
        case 'colleges':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/academics/colleges/",
                titleAdd: t("add_colleges"),
                titleEdit: t("edit_college"),
                searchKeys: ['name_en', 'name_ar'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "name_ar", header: `${t("name")} (${t("arabic")})` },
                    { accessorKey: "name_en", header: `${t("name")} (${t("english")})` },
                    { accessorKey: "description_ar", header: `${t("Description")} (${t("arabic")})`, ...renderContentCell("description_ar") },
                    { accessorKey: "description_en", header: `${t("Description")} (${t("english")})`, ...renderContentCell("description_en") },
                    { 
                        accessorKey: "images", 
                        header: `${t("images")}`,
                        cell: ({ row }) => {
                            const imgs = row.original.images || [];
                            return (
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                    {imgs.length > 0 ? imgs.map((imgObj, idx) => (
                                        <img key={idx} src={imgObj.image} alt="college" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                    )) : <span>-</span>}
                                </div>
                            );
                        }
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: "select", options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "name_ar", label: `${t("name")} (${t("arabic")})`, placeholder: t("name_ar"), type: "text", required: true },
                    { name: "name_en", label: `${t("name")} (${t("english")})`, placeholder: t("name_en"), type: "text", required: true },
                    { name: "description_ar", label: `${t("Description")} (${t("arabic")})`, placeholder: t("description_ar"), type: "textarea" },
                    { name: "description_en", label: `${t("Description")} (${t("english")})`, placeholder: t("description_en"), type: "textarea" },
                    { name: "images", label: `${t("images")}`, placeholder: t("images"), type: "file", multiple: true },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 3. الأقسام (Departments) ====================
        case 'departments':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/academics/departments/",
                titleAdd: t("add_Department"),
                titleEdit: t("edit_department"),
                searchKeys: ['name_en', 'name_ar'],
                columns: [
                    { accessorKey: "college", header: t("collage") },
                    { accessorKey: "name_ar", header: t("department_ar") },
                    { accessorKey: "name_en", header: t("department_en") },
                    actionColumn,
                ],
                fields: [
                    { name: "college", label: t("collage"), placeholder: t("collage"), type: "select", required: true, options: colleges.map(c => ({ value: c.id, name: c.name_ar || c.name_en })) },
                    { name: "name_ar", label: t("department_ar"), placeholder: t("department_ar"), type: "text", required: true },
                    { name: "name_en", label: t("department_en"), placeholder: t("department_en"), type: "text", required: true },
                ],
                mapItem: (item) => {
                    const targetCol = colleges.find(c => Number(c.id) === Number(item.college));
                    return { ...item, college: targetCol ? (targetCol.name_ar || targetCol.name_en) : item.college };
                }
            };

        // ==================== 4. البرامج الأكاديمية (Programs) ====================
        case 'programs':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/academics/programs/",
                titleAdd: t("add_programs"),
                titleEdit: t("edit_programe"),
                searchKeys: ['name_ar', 'name_en'],
                columns: [
                    { accessorKey: "department", header: t("department") },
                    { accessorKey: "name_ar", header: t("program_ar") },
                    { accessorKey: "name_en", header: t("program_en") },
                    { accessorKey: "level", header: t("level") },
                    actionColumn,
                ],
                fields: [
                    { name: "department", label: t("department"), placeholder: t("department"), type: "select", required: true, options: departments.map(d => ({ value: d.id, name: d.name_ar || d.name_en })) },
                    { name: "name_ar", label: t("program_ar"), placeholder: t("program_ar"), type: "text", required: true },
                    { name: "name_en", label: t("program_en"), placeholder: t("program_en"), type: "text", required: true },
                    { name: "level", label: t("level"), placeholder: t("level"), type: "text", required: true },
                ],
                mapItem: (item) => {
                    const targetDep = departments.find(d => Number(d.id) === Number(item.department));
                    return { ...item, department: targetDep ? (targetDep.name_ar || targetDep.name_en) : item.department };
                }
            };

        // ==================== 5. الكادر التدريسي (Staff) ====================
        case 'staff':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/academics/staff/",
                titleAdd: t("add_staff"),
                titleEdit: t("edit_staff"),
                searchKeys: ['full_name', 'email'],
                columns: [
                    { accessorKey: "department", header: t("department") },
                    { accessorKey: "full_name", header: t("full_name") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})` },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})` },
                    { accessorKey: "bio_ar", header: `${t("bio")} (${t("arabic")})`, ...renderContentCell("bio_ar") },
                    { accessorKey: "bio_en", header: `${t("bio")} (${t("english")})`, ...renderContentCell("bio_en") },
                    { accessorKey: "email", header: t("email") },
                    { accessorKey: "staff_type", header: t("type_staff") },
                    { 
                        accessorKey: "image", 
                        header: t("image"),
                        cell: ({ row }) => {
                            const imgUrl = row.original.image || row.original.photo;
                            return imgUrl ? <img src={imgUrl} alt="staff" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} /> : <span>-</span>;
                        }
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "department", placeholder: t("department"), type: 'select', options: departments.map(d => ({ value: d.id, name: d.name_ar || d.name_en })) },
                    { name: "full_name", placeholder: t("full_name"), type: 'text' },
                    { name: "title_ar", placeholder: t("title_ar"), type: 'text' },
                    { name: "title_en", placeholder: t("title_en"), type: 'text' },
                    { name: "bio_ar", placeholder: t("bio_ar"), type: 'textarea' },
                    { name: "bio_en", placeholder: t("bio_en"), type: 'textarea' },
                    { name: "email", placeholder: t("email"), type: 'email' },
                    { name: "staff_type", placeholder: t("type_staff"), type: 'text' },
                    { name: "image", placeholder: t("image"), type: 'file' },
                ],
                mapItem: (item) => {
                    const targetDep = departments.find(d => Number(d.id) === Number(item.department));
                    return { ...item, department: targetDep ? (targetDep.name_ar || targetDep.name_en) : item.department };
                }
            };

        // ==================== 6. الأبحاث العلمية (Research) ====================
        case 'research':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/academics/research/",
                titleAdd: t("add_research"),
                titleEdit: t("edit_research"),
                searchKeys: ['title_ar', 'title_en'],
                columns: [
                    { accessorKey: "staff", header: t("staff") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})` },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})` },
                    { accessorKey: "abstract_ar", header: `${t("abstract")} (${t("arabic")})`, ...renderContentCell("abstract_ar") },
                    { accessorKey: "abstract_en", header: `${t("abstract")} (${t("english")})`, ...renderContentCell("abstract_en") },
                    { accessorKey: "published_date", header: t("published_date") },
                    { 
                        accessorKey: "url", 
                        header: t("url"),
                        cell: ({ row }) => row.original.url ? <a href={row.original.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{t('View Link')}</a> : "-"
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "staff", placeholder: t("staff"), type: "select", options: staff.map(s => ({ value: s.id, name: s.full_name })) },
                    { name: "title_ar", placeholder: t("title_ar"), type: "text" },
                    { name: "title_en", placeholder: t("title_en"), type: "text" },
                    { name: "abstract_ar", placeholder: t("abstract_ar"), type: "textarea" },
                    { name: "abstract_en", placeholder: t("abstract_en"), type: "textarea" },
                    { name: "published_date", placeholder: t("published_date"), type: "date" },
                    { name: "url", placeholder: t("url"), type: "text" },
                ],
                mapItem: (item) => {
                    const targetStaff = staff.find(s => Number(s.id) === Number(item.staff));
                    return { ...item, staff: targetStaff ? targetStaff.full_name : item.staff };
                }
            };

        // ==================== 7. الفعاليات (Events) ====================
        case 'events':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/news/events/",
                titleAdd: t("add_events"),
                titleEdit: t("edit_event"),
                searchKeys: ['title_ar', 'title_en'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})`, ...renderContentCell("title_ar") },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})`, ...renderContentCell("title_en") },
                    { accessorKey: "event_date", header: t("event_date") },
                    { accessorKey: "location", header: t("location") },
                    { accessorKey: "description_ar", header: `${t("description")} (${t("arabic")})`, ...renderContentCell("description_ar") },
                    { accessorKey: "description_en", header: `${t("description")} (${t("english")})`, ...renderContentCell("description_en") },
                    { accessorKey: "image", header: t("image"), cell: ({ row }) => <img src={row.original.image} alt="event" className="image block m-auto !w-[70px]" /> },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "title_ar", placeholder: t("title_ar"), type: 'text' },
                    { name: "title_en", placeholder: t("title_en"), type: 'text' },
                    { name: "event_date", placeholder: t("event_date"), type: 'datetime-local' },
                    { name: "location", placeholder: t("location"), type: 'text' },
                    { name: "description_ar", placeholder: t("description_ar"), type: 'textarea' },
                    { name: "description_en", placeholder: t("description_en"), type: 'textarea' },
                    { name: "image", placeholder: t("image"), type: 'file' },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 8. المقالات (Articles) ====================
        case 'articles':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/news/articles/",
                titleAdd: t("add_articles"),
                titleEdit: t("edit_articles"),
                searchKeys: ['title_ar', 'title_en'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})`, ...renderContentCell("title_ar") },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})`, ...renderContentCell("title_en") },
                    { accessorKey: "content_ar", header: `${t("content")} (${t("arabic")})`, ...renderContentCell("content_ar") },
                    { accessorKey: "content_en", header: `${t("content")} (${t("english")})`, ...renderContentCell("content_en") },
                    { accessorKey: "image", header: t("image"), cell: ({ row }) => <img src={row.original.image} alt="article" className="image block m-auto !w-[70px]" /> },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "title_ar", placeholder: t("title_ar"), type: 'text' },
                    { name: "title_en", placeholder: t("title_en"), type: 'text' },
                    { name: "content_ar", placeholder: t("content_ar"), type: 'textarea' },
                    { name: "content_en", placeholder: t("content_en"), type: 'textarea' },
                    { name: "image", placeholder: t("image"), type: 'file' },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 9. الإعلانات (Advertisements) ====================
        case 'advertisements':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/news/announcements/",
                titleAdd: t("add_advertisements"),
                titleEdit: t("edit_advertisements"),
                searchKeys: ['title'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})`},
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})`},
                { accessorKey: "body_ar", header:`${t("body")} (${t("arabic")})`, ...renderContentCell("body_ar") },
                { accessorKey: "body_en", header: `${t("body")} (${t("english")})`, ...renderContentCell("body_en") },


                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: "select", options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "title_ar", label: t('title_ar'), placeholder: t("title_ar"), type: "text", required: true },
                     { name: "title_en", label: t('title_en'), placeholder: t("title_en"), type: "text", required: true },
                    { name: "body_ar", label: t('body_ar'), placeholder: t("body_ar"), type: "textarea", required: true },
                    { name: "body_en", label: t('body_en'), placeholder: t("body_en"), type: "textarea", required: true },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 10. الوظائف (Job Postings) ====================
        case 'job-postings':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/careers/postings/",
                titleAdd: t("add_job"),
                titleEdit: t("edit_job"),
                searchKeys: ['title_ar', 'title_en', 'job_type'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})`, ...renderContentCell("title_ar") },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})`, ...renderContentCell("title_en") },
                    { accessorKey: "job_type", header: t("type_job") },
                    { accessorKey: "description_ar", header: `${t("description")} (${t("arabic")})`, ...renderContentCell("description_ar") },
                    { accessorKey: "description_en", header: `${t("description")} (${t("english")})`, ...renderContentCell("description_en") },
                    { accessorKey: "deadline", header: t("deadline") },
                    { accessorKey: "status", header: t("status") },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "title_ar", placeholder: t("title_ar"), type: 'text' },
                    { name: "title_en", placeholder: t("title_en"), type: 'text' },
                    { name: "job_type", placeholder: t("type_job"), type: 'text' },
                    { name: "description", placeholder: t("description"), type: 'textarea' },
                    { name: "description_ar", placeholder: t("description_ar"), type: 'textarea' },
                    { name: "description_en", placeholder: t("description_en"), type: 'textarea' },
                    { name: "deadline", placeholder: t("deadline"), type: 'date' },
                    { name: "status", placeholder: t("status"), type: "select", options: [{ value: "open", name: t("open") }, { value: "closed", name: t("closed") }] },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 11. الخدمات (Services) ====================
        case 'services':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/services/list/",
                titleAdd: t("add_services"),
                titleEdit: t("edit_services"),
                searchKeys: ['name_ar', 'name_en', 'service_type'],
                columns: [
                    { accessorKey: "name_ar", header: t("name_ar") },
                    { accessorKey: "name_en", header: t("name_en") },
                    { accessorKey: "service_type", header: t("service_type") },
                    { accessorKey: "description_ar", header: `${t("description")} (${t("arabic")})`, ...renderContentCell("description_ar") },
                    { accessorKey: "description_en", header: `${t("description")} (${t("english")})`, ...renderContentCell("description_en") },
                    actionColumn,
                ],
                fields: [
                    { name: "name_ar", placeholder: t("name_ar"), type: "text" },
                    { name: "name_en", placeholder: t("name_en"), type: "text" },
                    { name: "service_type", placeholder: t("service_type"), type: "text" },
                    { name: "description_ar", placeholder: t("description_ar"), type: "textarea" },
                    { name: "description_en", placeholder: t("description_en"), type: "textarea" },
                ],
                mapItem: (item) => item
            };

        // ==================== 12. الفروع (Branches) ====================
        case 'branches':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/branches/",
                titleAdd: t("add_branches"),
                titleEdit: t("edit_branch"),
                searchKeys: ['name'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "name", header: t("branch_name") },
                    { accessorKey: "address", header: t("address") },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "name", placeholder: t("branch_name"), type: 'text' },
                    { name: "address", placeholder: t("address"), type: 'text' },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 13. اللغات (Languages) ====================
        case 'languages':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/languages/",
                titleAdd: t("add_language"),
                titleEdit: t("edit_languages"),
                searchKeys: ['label', 'code'],
                columns: [
                    { accessorKey: "label", header: t("language") },
                    { accessorKey: "code", header: t("code") },
                    actionColumn,
                ],
                fields: [
                    { name: "label", placeholder: t("language"), type: 'text' },
                    { name: "code", placeholder: t("code"), type: 'text' },
                ],
                mapItem: (item) => item
            };

        // ==================== 14. المكتبات (Library) ====================
        case 'library':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/services/library/",
                titleAdd: t("add_library"),
                titleEdit: t("edit_library"),
                searchKeys: ['name'],
                columns: [
                    { accessorKey: "university", header: t("university") },
                    { accessorKey: "name", header: t("library_name") },
                    { accessorKey: "location", header: t("location") },
                    { 
                        accessorKey: "url", 
                        header: t("url"),
                        cell: ({ row }) => <a href={row.original.access_url} target="_blank" rel="noopener noreferrer" className="library-link">{t('Open Library')}</a>
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "name", placeholder: t("name"), type: 'text' },
                    { name: "location", placeholder: t("location"), type: 'text' },
                    { name: "access_url", placeholder: t("access_url"), type: 'url' },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 15. الصفحات الثابتة (Pages) ====================
        case 'pages':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/pages/",
                titleAdd: t("add_pages"),
                titleEdit: t("edit_page"),
                searchKeys: ['slug', 'title_ar', 'title_en'],
                columns: [
                { accessorKey: "university", header: t("university") },
                    { accessorKey: "slug", header: t("slug") },
                    { accessorKey: "title_ar", header: `${t("title")} (${t("arabic")})`, ...renderContentCell("title_ar") },
                    { accessorKey: "title_en", header: `${t("title")} (${t("english")})`, ...renderContentCell("title_en") },
                    { accessorKey: "content_ar", header: `${t("content")} (${t("arabic")})`, ...renderContentCell("content_ar") },
                    { accessorKey: "content_en", header: `${t("content")} (${t("english")})`, ...renderContentCell("content_en") },
                    { accessorKey: "page_type", header: t("page_type") },
                    actionColumn,
                ],
                fields: [
        { name: "university", placeholder: t("university"), type: 'select', options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "slug", label: t("slug"), placeholder: t("slug"), type: "text", required: true },
                    { name: "page_type", label: t("page_type"), placeholder: t("page_type"), type: "text", required: true },
                    { name: "title_ar", label: `${t("title")} (${t("arabic")})`, placeholder: t("title_ar"), type: "text", required: true },
                    { name: "title_en", label: `${t("title")} (${t("english")})`, placeholder: t("title_en"), type: "text", required: true },
                    { name: "content_ar", label: `${t("content")} (${t("arabic")})`, placeholder: t("content_ar"), type: "textarea", required: false },
                    { name: "content_en", label: `${t("content")} (${t("english")})`, placeholder: t("content_en"), type: "textarea", required: false },
                ],
  mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }            };

        // ==================== 16. الطلاب (Students) ====================
        case 'students':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/admissions/students/",
                titleAdd: t("add_student"),
                titleEdit: t("edit_student"),
                searchKeys: ['full_name', 'email', 'national_id'],
                columns: [
                    { accessorKey: "full_name", header: t("full_name") },
                    { accessorKey: "email", header: t("email") },
                    { accessorKey: "national_id", header: t("national_id") },
                    { 
                        accessorKey: "status", 
                        header: t("status"),
                        cell: ({ getValue }) => <span className={`status-badge ${getValue()}`}>{t(getValue())}</span>
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "full_name", placeholder: t("full_name"), type: "text" },
                    { name: "email", placeholder: t("email"), type: "email" },
                    { name: "national_id", placeholder: t("national_id"), type: "text" },
                    { name: "status", placeholder: t('status'), type: 'text' }
                ],
                mapItem: (item) => item
            };

        // ==================== 17. وسائل التواصل الاجتماعي (Social Media) ====================
        case 'social-media':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/social-media/",
                titleAdd: t("add_socialMedia"),
                titleEdit: t("edit_socialMedia"),
                searchKeys: ['platform'],
                columns: [
                    { accessorKey: "university", header: t("university"),},
                    { accessorKey: "platform", header: t("platForm") },
                    { 
                        accessorKey: "url", 
                        header: t("url"),
                        cell: ({ row }) => row.original.url ? <a href={row.original.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{row.original.url}</a> : "-"
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "university", placeholder: t("university"), type: "select", options: university.map(u => ({ value: u.id, name: u.name_ar || u.name_en })) },
                    { name: "platform", placeholder: t("platform"), type: "text" },
                    { name: "url", placeholder: t("url"), type: "text" },
                ],
                mapItem: (item) => {
                    const targetUni = university.find(u => Number(u.id) === Number(item.university));
                    return { ...item, university: targetUni ? (targetUni.name_ar || targetUni.name_en) : item.university };
                }
            };

        // ==================== 18. رسائل الاتصال (Contact Messages) ====================
        case 'contact-messages':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/core/contact-messages/",
                titleAdd: t("add_message"),
                titleEdit: t("edit_Message"),
                searchKeys: ['sender_name', 'subject'],
                columns: [
                    { accessorKey: "sender_name", header: t("sender_name") },
                    { accessorKey: "sender_email", header: t("sender_email") },
                    { accessorKey: "subject_ar", header: `${t("subject")} (${t("arabic")})` },
                 { accessorKey: "subject_en", header: `${t("subject")} (${t("english")})` },

                    { accessorKey: "message_ar", header: `${t("message")} (${t("arabic")})`, ...renderContentCell("message_ar") },
                { accessorKey: "message_en", header: `${t("message")} (${t("english")})`, ...renderContentCell("message_en") },

                    actionColumn,
                ],
                fields: [
                    { name: "sender_name", placeholder: t("sender_name"), type: "text" },
                    { name: "sender_email", placeholder: t("sender_email"), type: "email" },
                    { name: "subject_ar", placeholder: t("subject_ar"), type: "text" },
                    { name: "subject_en", placeholder: t("subject_en"), type: "text" },
                    { name: "message_ar", placeholder: t("message_ar"), type: "textarea" },
                    { name: "message_en", placeholder: t("message_en"), type: "textarea" },
                ],
                mapItem: (item) => item
            };

        // ==================== 19. معلومات القبول (Admissions Info) ====================
        case 'admissions-info':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/admissions/info/",
                titleAdd: t("add_admission"),
               titleEdit: t("edit_admissions"),
                searchKeys: ['program', '_prog_name_ar', '_prog_name_en'],
                columns: [
                    { accessorKey: "program", header: t("program") },
                    { accessorKey: "requirements_ar", header: `${t("requirements")} (${t("arabic")})`, ...renderContentCell("requirements_ar") },
                    { accessorKey: "requirements_en", header: `${t("requirements")} (${t("english")})`, ...renderContentCell("requirements_en") },
                    { accessorKey: "procedure_ar", header: `${t("procedure")} (${t("arabic")})`, ...renderContentCell("procedure_ar") },
                    { accessorKey: "procedure_en", header: `${t("procedure")} (${t("english")})`, ...renderContentCell("procedure_en") },
                    { accessorKey: "tuition_fee", header: t("tuition_fee"), cell: ({ row }) => `$${row.original.tuition_fee}` },
                    { accessorKey: "academic_calendar", header: t("acadimec_calender") },
                    actionColumn,
                ],
                fields: [
                    {
                        name: "program",
                        placeholder: t("program"),
                        type: "select",
                        options: programs.map((p) => ({
                            value: p.id,
                            name: i18n?.language === 'ar' ? (p.name_ar || p.name_en) : (p.name_en || p.name_ar)
                        }))
                    },
                    { name: "requirements_ar", placeholder: t("requirements_ar"), type: 'textarea' },
                    { name: "requirements_en", placeholder: t("requirements_en"), type: 'textarea' },
                    { name: "procedure_ar", placeholder: t("procedure_ar"), type: 'textarea' },
                    { name: "procedure_en", placeholder: t("procedure_en"), type: 'textarea' },
                    { name: "tuition_fee", placeholder: t("tuition_fee"), type: 'number' },
                    { name: "academic_calendar", placeholder: t("acadimec_calender"), type: 'date' },
                ],
                mapItem: (item) => {
                    const targetProgram = programs.find((p) => Number(p.id) === Number(item.program));
                    return {
                        ...item,
                        program: targetProgram ? (targetProgram.name_ar || targetProgram.name_en) : item.program,
                        _prog_name_ar: targetProgram?.name_ar || "",
                        _prog_name_en: targetProgram?.name_en || ""
                    };
                }
            };

        // ==================== 20. طلبات التوظيف (Job Applications) ====================
        case 'applications':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/careers/applications/",
                addUrl: "http://127.0.0.1:8000/api/v1/dashboard/careers/applications/",
                titleAdd: t("add_applications"),
                titleEdit: t("edit_application"),
                searchKeys: ['applicant_name', 'job'],
                columns: [
                    { accessorKey: "job", header: t("job") },
                    { accessorKey: "applicant_name", header: t("applicant_name") },
                    { accessorKey: "applicant_email", header: t("applicant_email") },
                    {
                        accessorKey: "cv",
                        header: t("cv"),
                        cell: ({ row }) => {
                            const cvUrl = row.original.cv;
                            return (
                                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="cv-link" download>
                                    <TbFileCvFilled className='cv text-4xl text-[var(--color-light-main)] block m-auto' />
                                </a>
                            );
                        }
                    },
                    actionColumn,
                ],
                fields: [
                    {
                        name: "job",
                        placeholder: t("job"),
                        type: 'select',
                        options: jopPosting.map((uni) => ({
                            value: uni.id,
                            name: uni.title
                        }))
                    },
                    { name: "applicant_name", placeholder: t("applicant_name"), type: 'text' },
                    { name: "applicant_email", placeholder: t("applicant_email"), type: 'email' },
                    { name: "cv", placeholder: t("cv"), type: 'file' },
                ],
                mapItem: (item) => {
                    const targetJop = jopPosting.find((uni) => Number(uni.id) === Number(item.job));
                    return {
                        ...item,
                        job: targetJop ? targetJop.title : item.job
                    };
                }
            };

        // ==================== 21. طلبات قبول الطلاب (Student Admissions Applications) ====================
        case 'applicationsStudent':
            return {
                baseUrl: "http://127.0.0.1:8000/api/v1/dashboard/admissions/applications/",
                titleAdd: t("add_application"),
                titleEdit: t("edit_application"),
                searchKeys: ['student_details.full_name'],
                columns: [
                    { accessorKey: "student_details.full_name", header: t("student") },
                    { accessorKey: "student_details.email", header: t("email") },
                    { 
                        accessorKey: "program_details", 
                        header: t("program"),
                        cell: ({ row }) => {
                            const program = row.original?.program_details;
                            if (!program) return "-";
                            return i18n?.language === 'ar' ? (program.name_ar || program.name_en) : (program.name_en || program.name_ar);
                        }
                    },
                    { accessorKey: "status", header: t("status"), cell: ({ row }) => t(row.original?.status || "pending") },
                    { 
                        accessorKey: "apply_date", 
                        header: t("apply_date"),
                        cell: ({ row }) => {
                            const dateVal = row.original?.apply_date;
                            if (!dateVal) return "-";
                            return new Date(dateVal).toLocaleDateString(i18n?.language, {
                                year: 'numeric',
                                month: 'long', 
                                day: 'numeric'
                            });
                        }
                    },
                    { 
                        accessorKey: "form_file", 
                        header: t("file"),
                        cell: ({ row }) => row.original?.form_file ? (
                            <a href={`http://127.0.0.1:8000${row.original.form_file}`} target="_blank" rel="noreferrer" className="view-file-link">
                                {t("view_file")}
                            </a>
                        ) : "-"
                    },
                    actionColumn,
                ],
                fields: [
                    { name: "full_name", placeholder: t("full_name"), type: "text" },
                    { name: "email", placeholder: t("email"), type: "email" },
                    { name: "national_id", placeholder: t("national_id"), type: "text" },
                    {
                        name: "program",
                        placeholder: t("program"),
                        type: "select",
                        options: programs.map((p) => ({
                            value: p.id,
                            name: i18n?.language === 'ar' ? (p.name_ar || p.name_en) : (p.name_en || p.name_ar)
                        }))
                    },
                    { name: "form_file", placeholder: t("file"), type: "file" }
                ],
                fieldsEdit: [
                    { name: "student_name", placeholder: t("student_name"), type: "text" },
                    { name: "email", placeholder: t("email"), type: "email" },
                    {
                        name: "program",
                        placeholder: t("program"),
                        type: "select",
                        options: programs.map((p) => ({
                            value: p.id,
                            name: i18n?.language === 'ar' ? (p.name_ar || p.name_en) : (p.name_en || p.name_ar)
                        }))
                    },
                    {
                        name: "status",
                        placeholder: t("status"),
                        type: "select",
                        options: [
                            { value: "pending", name: t("pending") },
                            { value: "accepted", name: t("accepted") },
                            { value: "rejected", name: t("rejected") },
                        ]
                    },
                    { name: "form_file", placeholder: t("file"), type: "file" }
                ],
                mapItem: (item) => item
            };

        default:
            return null;
    }
};