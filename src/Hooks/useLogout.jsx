import { useAuth } from "../store/useAuth"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
const useLogout = () => {
    const {clearAuth}=useAuth()
    const queryClient=useQueryClient()
    const navigate=useNavigate()
    const { t } = useTranslation(); 
  const handleLogout=()=>{
clearAuth()
queryClient.clear()
toast.success(t("Logged out successfully"));

    navigate('/', { replace: true });
  }
  return {handleLogout}
}

export default useLogout