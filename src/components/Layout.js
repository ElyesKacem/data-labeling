import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
            
				{/* <Footer /> */}
        </main>
    )
}

export default Layout