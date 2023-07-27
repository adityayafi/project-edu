import { Outlet } from "react-router-dom"
import AppHeader from "../components/header"
import AppFooter from "../components/footer";


const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <AppHeader />
            </header>
            <main className="mb-auto">
                <Outlet />
            </main>
            <footer>
                <AppFooter />
            </footer>
        </div>
    )
}

export default Layout;
