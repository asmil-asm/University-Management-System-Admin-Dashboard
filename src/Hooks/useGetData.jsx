import { useQuery } from "@tanstack/react-query"
import API from "../services/API"
const BASE_URL = "/api/v1/dashboard";

const getData=async(url,key)=>{
     const config = {
        headers: {
          'Content-Type': ['articles', 'application', 'admissions', 'applictionStudent', 'library', 'events'].includes(key) 
            ? 'multipart/form-data' 
            : 'application/json',
        }
      };
    try {
        const res=await API.get(`${BASE_URL}${url}`,config)
return res.data.results ?? res.data ?? [];
    } catch (error) {
      console.error(`Error fetching ${key}:`, error); 
      throw error
    }

}
export const useGetData=({key,endpoint})=>{
return useQuery ({
    queryKey:[key],
    queryFn:()=>getData(endpoint,key)
    
})
}