import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import EstateList from './pages/EstateList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: { title: 'Dashboard' },
      },
      {
        path: 'estates',
        element: <EstateList />,
        handle: { title: 'Estate List' },
      },
 
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
