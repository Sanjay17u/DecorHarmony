import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return(
        <>
          <div className="flex flex-col min-h-screen m-2 md:m-0">
            {/* NavBar */}
            <header>
                <NavBar/>
            </header>
            {/* Main Content */}
             <div className="flex-1">
                <Outlet/>
             </div>
             {/* Footer */}
             <footer>
                <Footer/>
             </footer>
          </div>
        </>
    )
}

export default MainLayout