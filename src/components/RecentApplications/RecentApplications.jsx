import Tables from "../Tables/Tables"
import { FaRegFileAlt } from "react-icons/fa";
import './RecentApplications.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { TbFileCvFilled } from 'react-icons/tb';
import { useChange } from "../../store/useChange";
import { useDashboard } from "../../Hooks/useDashboard";
const RecentApplications=()=>{
       const navigate=useNavigate();
       const {t} = useTranslation();
   const {applications,jopPosting}=useDashboard()

 
     const columns = [
         {
             accessorKey: "job",
             header: t("job"),
         },
         {
             accessorKey: "applicant_name",
             header:t( "applicant_name"),
         },
         {
             accessorKey: "applicant_email",
             header: t("applicant_email"),
         },
         {
             accessorKey: "cv",
             header:t("cv"),
           cell: ({ row }) => {
                   const cvUrl = row.original.cv
                   
                   return (
                       <a 
                           href={cvUrl} 
                           target="_blank"         
                           rel="noopener noreferrer"
                            className="cv-link"
                           download               
                       >
                       <TbFileCvFilled className='cv text-4xl text-[var(--color-light-main) ] block m-auto'/>
                       </a>
                   );
               }
         },
        
     ];
     const {mood}=useChange()
     const mappedData = (applications || []).map((item) => {
        const targetJob = jopPosting?.find((job) => Number(job.id) === Number(item.job));
        return {
            ...item,
            job: targetJob ? targetJob.title : item.job 
        };
    }).slice(0,3);
return (
    <div className={`recent ${mood ? 'bg-[var(--color-dark-main)]':'bg-white'}`}>
     <div>
         <div className="info">
          <div  className={`text ${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`}>
            <div className="icon"><FaRegFileAlt/></div>
            <h4>{t("Recent_applications")}</h4>
        </div>
        <button  className={`${mood ? 'text-[var(--color-light-text)]':'text-[var(--color-light-main)]'}`} onClick={()=>navigate('applications')}>{t("view_all")}</button>
      </div>
<Tables className='recent-table'  data={mappedData} columns={columns}/>
     </div>
    </div>
)
}
export default RecentApplications