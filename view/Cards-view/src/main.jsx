import React from "react";
import ReactDOM from "react-dom/client";
import ListGroup from "./components/Pages/ListGroup";
import IncreaseFrameRequest from "./components/Pages/IncreaseFrameRequest";
import ErrorPage from "./components/Pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router=createBrowserRouter([
  {
  path: '/',
  element:<ListGroup/>,
  errorElement: <ErrorPage/>,
  },
    {
      path:'/IncreaseFrame/:cardNumber',
      element: <IncreaseFrameRequest/>,
      errorElement:<ErrorPage/>
    }
  ]

,);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router}/>
  
);
