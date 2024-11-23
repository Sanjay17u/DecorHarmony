import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import DecorDetail from './components/DecorDetails'
import Cart from './components/Cart'
import Marketplace from './admin/Marketplace'
import AddMenu from './admin/AddMenu'
import Orders from './admin/Orders'
import Success from './components/ui/Success'
import { useUserStore } from './store/useUserStore'


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};


const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};


const AdminRoute = ({children}:{children:React.ReactNode}) => {
  const {user, isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/" replace/>
  }

  return children;
}


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoutes><MainLayout/></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HeroSection/>
      },


      {
        path: "/profile",
        element: <Profile/>
      },


      {
        path: "/SearchPage/:text",
        element: <SearchPage/>
      },

      
      {
        path: "/Cart",
        element: <Cart/>
      },

      {
        path: "/DecorDetail/:id",
        element: <DecorDetail/>
      },

      {
        path: "/user/orders",
        element: <Success/>
      },
      
      
      
      // Admin Service Started
      
      
      {
        path: "/admin/marketplace",
        element: <AdminRoute><Marketplace/></AdminRoute>
      },


      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu/></AdminRoute>
      },

      {
        path: "/admin/orders",
        element: <AdminRoute><Orders/></AdminRoute>
      },


    ]
  },

  {
    path: "/login",
    element: <AuthenticatedUser><Login/></AuthenticatedUser>
  },

  {
    path: "/signup",
    element: <AuthenticatedUser><Signup/></AuthenticatedUser>
  },

  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
  },

  {
    path: "/reset-password",
    element: <ResetPassword/>
  },

  {
    path: "/VerifyEmail",
    element:<VerifyEmail/>
  },




])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  )
}

export default App
