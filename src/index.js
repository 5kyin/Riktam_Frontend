import React,{ createContext } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// ALL Imports
import Login from "./_pages/RegisterLogin/login"
import Register from "./_pages/RegisterLogin/register"
import Main from "./_pages/Dashboard/main"

require('./_components/axiosMiddleWare')

const root = ReactDOM.createRoot(document.getElementById('root'));

const GETUSER = localStorage.getItem("User")
export const USERContext = React.createContext();
let USER = null
if(GETUSER) USER = JSON.parse(GETUSER)

const paths = [
  {  path: "/", element: USER ? <Main />:<Login />,},
  {  path: "/register", element:  <Register />,},
  {  path: "/dashboard", element:  <Main />,},
]
 

const router = createBrowserRouter(paths);

root.render(
  <React.StrictMode>
    <USERContext.Provider value={USER}>
      <RouterProvider router={router} />
    </USERContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
