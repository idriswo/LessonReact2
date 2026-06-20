import { memo, useEffect } from 'react'
import SignUp from './pages/SignUp/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, LandingPage, Login, Partners, Profile, Reminder } from './router/router'
import { ProtectedRoute } from './router/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = memo(() => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/home',
      element: <ProtectedRoute><Home/></ProtectedRoute>  
    },
    {
      path:'/partners',
      element: <ProtectedRoute><Partners/></ProtectedRoute>
    },
    {
      path:'/profile',
      element: <ProtectedRoute><Profile/></ProtectedRoute>
    },
    {
      path:"/reminders",
      element: <ProtectedRoute><Reminder/></ProtectedRoute>
    }

  ])
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
})

export default App