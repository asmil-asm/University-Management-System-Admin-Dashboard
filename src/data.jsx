import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { PiGraduationCapLight } from "react-icons/pi";
import { LiaNewspaper } from "react-icons/lia";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoPeopleOutline, IoSettingsOutline, IoEarthOutline, IoShareSocialOutline, IoBookOutline } from "react-icons/io5";
import { BsCalendar4Event } from "react-icons/bs";
import { MdOutlineGroups2 } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { CiFileOn, CiCircleAlert } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdCampaign } from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";

const data = [
{
    title: "core",
    icon: HiOutlineBuildingOffice,
    items: [
    { name: "universities", icon: HiOutlineBuildingOffice, path: 'universities'  },
    { name: "languages", icon: IoEarthOutline, path:'languages' },
    { name: "social_media", icon: IoShareSocialOutline, path:'social-media' },
    { name: "branches", icon: LuMapPin, path:'branches' },
    { name: "pages", icon: CiFileOn , path:'pages' },
    { name: "message", icon: RiMessage2Line, path:'contact-messages' },
    ],
},
{
    title: "academics",
    icon: PiGraduationCapLight,
    items: [
    { name: "colleges", icon: PiGraduationCapLight, path:'colleges'   },
    { name: "departments", icon: IoBookOutline ,path:'departments'  },
    { name:  "programs", icon: MdOutlineGroups2, path:'programs'  },
    { name:  "staff", icon: IoPeopleOutline,  path:'staff' },
    { name:"Research", icon: GiArchiveResearch,  path:'research' },

    ],
},
{
    title:"news",
    icon: LiaNewspaper,
    items: [
    { name: "articles", icon: LiaNewspaper  ,path:'articles'},
    { name: "events", icon: BsCalendar4Event ,path:'events' },
    {name: "Advertisements", icon:MdCampaign , path: 'advertisements'}
    ],
},
{
    title: "careers",
    icon: LuBriefcaseBusiness,
    items: [
            { name:  "applications", icon: FaRegFileAlt, path:'applications' },
    { name: "job_postings", icon: LuBriefcaseBusiness ,path:'job-postings' }

    ],
},
{
    title: "admission",
    icon: IoPeopleOutline,
    items: [
    { name: "students", icon: IoPeopleOutline  ,path:'students' },
    { name: "admission_info", icon: CiCircleAlert, path:'admissions-info' },
    { name:  "applications", icon: HiOutlineClipboardList, path:'applicationsStudent' },
    ],
},
{
    title: "services",
    icon: IoSettingsOutline,
    items: [
        { name:  "libraries", icon: IoBookOutline , path:'library' },
    { name: "services", icon: IoSettingsOutline, path:'services' }

    ],
},
];

export default data;