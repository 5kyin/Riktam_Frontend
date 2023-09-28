import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

// ALL Imports
import Login from "../_pages/RegisterLogin/login"
import Register from "../_pages/RegisterLogin/register"
import Main from "../_pages/Dashboard/main"

export const USERContext = React.createContext({
    USER: null,
    setUser:()=>{}
  });

export default function App() {
let _USER = null //Place Holder for the null incase of browserRefresh
const setUserFromContext = (userDetails) => {
        setUSER({...USER,USER:userDetails})
    }
const GETUSER = localStorage.getItem("User")
  if (GETUSER) _USER = JSON.parse(GETUSER)
const initState = {
    USER: _USER,
    setUser:setUserFromContext
    } 
    
  const [USER, setUSER] = React.useState(initState)
  const paths = [
    {  path: "/", element: !USER.USER ? <Navigate to="/login" />:<Navigate to="/dashboard" />,},
    {  path: "/login", element: !USER.USER ? <Login />:<Navigate to="/" />,},
    {  path: "/register", element:  USER.USER ? <Navigate to="/dashboard" />:<Register />,},
    {  path: "/dashboard", element:  USER.USER ? <Main />:<Navigate to="/" />,},
]
 

const router = createBrowserRouter(paths);

  return (
    <USERContext.Provider value={USER}>
      <RouterProvider router={router} />
    </USERContext.Provider>
  )
}
