import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from '../pages/Login/Login'
import AdminLayout from '../layout/AdminLayout/AdminLayout'
import ProtectedRoutes from './ProtectedRoutes'
import ResourcePage from '../pages/ResourcePage/ResourcePage'
import Dashboard from '../pages/Dashboard/Dashboard'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoutes>
                        <AdminLayout />
            </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'languages', element: <ResourcePage/>},
            { path: 'social-media', element: <ResourcePage/> },
            { path: 'branches', element: <ResourcePage/> },
            { path: 'pages', element:<ResourcePage/> },
            { path: 'contact-messages', element: <ResourcePage/> },
            { path: 'universities', element:<ResourcePage/> },
            { path: 'colleges', element: <ResourcePage/>},
            { path: 'departments', element: <ResourcePage/> },
            { path: 'applications', element: <ResourcePage/> },
            { path: 'job-postings', element: <ResourcePage/> },
            { path: 'programs', element: <ResourcePage/>},
            { path: 'students', element: <ResourcePage/> },
{ path: 'applicationsStudent', element: <ResourcePage/> },
            { path: 'staff', element: <ResourcePage/>},
            { path: 'services', element: <ResourcePage/> },
            { path: 'events', element: <ResourcePage/>},
            { path: 'advertisements', element: <ResourcePage/>},
            { path: 'articles', element: <ResourcePage/> },
            { path: 'admissions-info', element: <ResourcePage/> },
            { path: 'library', element: <ResourcePage/> },
            { path: 'research', element:<ResourcePage/> },
        ],
    },
])

const AppRouter=()=>{
    return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default AppRouter
