import { useQuery } from "@tanstack/react-query"
import API from "../services/API"
const BASE_URL = "/api/v1/dashboard";

const getData=async(url,key)=>{
     
    try {
        const res=await API.get(`${BASE_URL}${url}`)
return res.data.results ?? res.data ?? [];
    } catch (error) {
      console.error(`Error fetching ${key}:`, error); 
      throw error
    }

}
export const useGetData=({key,endpoint,enabled=true})=>{
return useQuery ({
    queryKey:[key],
    queryFn:()=>getData(endpoint,key),
     enabled
    
})
}