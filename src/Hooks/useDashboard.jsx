import { useGetData } from "./useGetData";
import { apiEndpoints } from "../services/apiEndpoints";
export const useDashboard=(neededKeys = [])=>{
       const shouldFetch = (key) => 
        neededKeys.length === 0 || neededKeys.includes(key);

    const contact=useGetData({
        key:'contact',
        endpoint:apiEndpoints.contact,
    enabled: shouldFetch('contact')
    })
    const jopPosting=useGetData({
        key:'jopPosting',
        endpoint:apiEndpoints.jobPosting,
            enabled: shouldFetch('jopPosting')

    })
     const events=useGetData({
        key:'events',
        endpoint:apiEndpoints.events,
         enabled: shouldFetch('events')

        
    })
   const colleges=useGetData({
        key:'colleges',
        endpoint:apiEndpoints.colleges,
         enabled: shouldFetch('colleges')

    })
    const universities=useGetData({
        key:'university',
        endpoint:apiEndpoints.university,
        enabled: shouldFetch('university')

    })
     const library=useGetData({
        key:'library',
        endpoint:apiEndpoints.library,
        enabled: shouldFetch('library')

    })
  const application=useGetData({
        key:'application',
        endpoint:apiEndpoints.application,
        enabled: shouldFetch('application')

    })
      const student=useGetData({
        key:'student',
        endpoint:apiEndpoints.student,
    enabled: shouldFetch('student')

    })
       const articles=useGetData({
        key:'articles',
        endpoint:apiEndpoints.articles,
     enabled: shouldFetch('articles')

    })
        const staff=useGetData({
        key:'staff',
        endpoint:apiEndpoints.staff,
    enabled: shouldFetch('staff')

    })
    const socialMedia=useGetData({
        key:'socialMedia',
        endpoint:apiEndpoints.socialMedia,
            enabled: shouldFetch('socialMedia')

    })
    const services=useGetData({
        key:'services',
        endpoint:apiEndpoints.services,
     enabled: shouldFetch('services')

    })
    const programs=useGetData({
        key:'programs',
        endpoint:apiEndpoints.programs,
    enabled: shouldFetch('programs')

    })
    const pages=useGetData({
        key:'pages',
        endpoint:apiEndpoints.pages,
            enabled: shouldFetch('pages')

    })
    const language=useGetData({
        key:'language',
        endpoint:apiEndpoints.language,
        enabled: shouldFetch('language')

    })
    const departments=useGetData({
        key:'departments',
        endpoint:apiEndpoints.departments,
                enabled: shouldFetch('departments')

    })
    const branches=useGetData({
        key:'branches',
        endpoint:apiEndpoints.branches,
        enabled: shouldFetch('branches')

    })
    const admissions=useGetData({
        key:'admissions',
        endpoint:apiEndpoints.admissions,
                enabled: shouldFetch('admissions')

    })
    const applictionStudent=useGetData({
        key:'applictionStudent',
        endpoint:apiEndpoints.applicationStudent,
        enabled: shouldFetch('applictionStudent')

    })
    const advertisements=useGetData({
        key:'advertisements',
        endpoint:apiEndpoints.advertisements,
        enabled: shouldFetch('advertisements')

    })
    const research=useGetData({
        key:'research',
        endpoint:apiEndpoints.research,
         enabled: shouldFetch('research')

    })
    return {
colleges:colleges.data,
jopPosting:jopPosting.data,
contact:contact.data,
socialMedia:socialMedia.data,
services:services.data,
pages:pages.data,
programs:programs.data,
admissions:admissions.data,
advertisements:advertisements.data,
research:research.data,
language:language.data,
branches:branches.data,
departments:departments.data,
applictionStudent:applictionStudent.data,
events:events.data,
university:universities.data,
library:library.data,
applications:application.data,
students:student.data,
articles:articles.data,
staff:staff.data,  
isLoading:
colleges.isLoading ||
contact.isLoading ||
events.isLoading ||
universities.isLoading ||
library.isLoading ||
application.isLoading ||
student.isLoading ||
articles.isLoading ||
staff.isLoading ||
jopPosting.isLoading||
socialMedia.isLoading ||
services.isLoading ||
pages.isLoading ||
programs.isLoading || 
admissions.isLoading ||
advertisements.isLoading ||
research.isLoading ||
language.isLoading ||
branches.isLoading ||
departments.isLoading ||
applictionStudent.isLoading
}
}