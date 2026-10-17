import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'
import Sidebar from '../../components/SidebarAdmin/Sidebar'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'
import { useChange } from '../../store/useChange'
import { Toaster } from 'react-hot-toast'
import { ScrollRestoration } from 'react-router-dom'
const AdminLayout = () => {
  const {mood,sidebarOpen, setSidebarOpen}=useChange()
  return (
    <>
    <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    <div className={`admin-page ${mood?'bg-[var(--color-dark-ground)]':'bg-[var(--color-light-ground)]'}`}>
      <Sidebar />
      {sidebarOpen && (
        <div className='overlay' onClick={() => setSidebarOpen(false)} />
      )}
      <div className='page'>
        <HeaderAdmin />
        <section className='main-pages'>
          <ScrollRestoration/>
          <Outlet /></section>
      </div>
    </div>
    </>
  )
}
export default AdminLayout
