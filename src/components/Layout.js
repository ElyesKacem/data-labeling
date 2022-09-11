import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
            
				{/* <Footer /> */}
        </main>
    )
}

export default Layout