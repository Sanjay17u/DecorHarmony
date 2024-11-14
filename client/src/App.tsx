import './App.css'
import Login from './auth/Login'
// import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import MainLayout from './MainLayout'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import NavBar from './components/NavBar'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<NavBar/>,
    // children: [
    //   {
    //     path: "/login"
    //   }
    // ]
  },

  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/signup",
    element: <Signup/>
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },

  {
    path: "/reset-password",
    element: <ResetPassword/>
  },

  {
    path: "/VerifyEmail",
    element: <VerifyEmail/>
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
