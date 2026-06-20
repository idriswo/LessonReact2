import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer/Footer'
import Header from '../pages/Header/Header'

const Layout = memo(() => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
})

export default Layout