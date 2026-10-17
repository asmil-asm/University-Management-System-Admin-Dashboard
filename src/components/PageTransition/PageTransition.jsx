
import  {motion}  from "framer-motion"
import { useLocation } from "react-router-dom"
function PageTransition({ children }) {
const location=useLocation()
    return (
        <motion.div
           key={location.pathname}

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1.5 }}>
            {children}
        </motion.div>
    )
}

export default PageTransition