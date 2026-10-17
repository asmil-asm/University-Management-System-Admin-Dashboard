import toast from 'react-hot-toast';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import API from '../services/API'

const useLogin = () => {
        const {setTokens} = useAuth(); 
      const navigate = useNavigate(); 
        const { t } = useTranslation();
     const mutations=useMutation({
        mutationFn:async(formData)=>{
            if(!formData.username || !formData.password)
                throw new Error(t("Please fill in all fields"))
 const res = await API.post(
        "/api/v1/token/",
       {
          username: formData.username,
          password: formData.password,
        }

      );  
      return res.data     
     },
     onSuccess:(responseData)=>{
        setTokens(responseData.access, responseData.refresh);
   toast.success(t("Welcome back"));
        navigate('/dashboard', { replace: true }); 
     },
     onError:(error)=>{
          console.error(error); 
      toast.error(t("Username or password incorrect")); 
     }

     })
     
      

  
 return{
    login:mutations.mutate,
    isLoading:mutations.isPending,
    isError:mutations.isError
 }
}

export default useLogin