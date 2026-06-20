import { lazy } from "react"

export const Login = lazy(() => import('../pages/Login/Login'))
export const Register = lazy(() => import('../pages/SignUp/SignUp'))


export const LandingPage = lazy(() => import('../pages/Landing/LandingPage'))


export const Home = lazy(()=> import("../pages/Home/Home"))
export const Partners = lazy(()=>import("../pages/Partners/Partners"))
export const Reminder = lazy(()=>import("../pages/Reminder/Reminder"))
export const Profile = lazy(()=>import("../pages/Profile/Profile"))