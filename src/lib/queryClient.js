import { QueryClient } from "@tanstack/react-query";


export const queryClient = new QueryClient({

  defaultOptions:{
    queries:{
      enabled:true,
      staleTime: 1000 * 60 * 5, 
      retry: 1,
      refetchOnWindowFocus:false,
       gcTime: 10 * 60 * 1000,
         refetchOnMount: false,
    }
  }

});