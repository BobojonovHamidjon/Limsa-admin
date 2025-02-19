import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Categories from "../Pages/Categories";
import Login from "../Pages/Login";
import Brands from "../Pages/Brands";
import Cars from "../Pages/Cars";
import Models from "../Pages/Models";
import Cities from "../Pages/Cities";
import Locations from "../Pages/Locations";
export const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement: <div>Bunaqa  sahifa  mavjud  emas </div>,
        children:[
            {
                path:"/",
                element:<Categories/>
            },
            {
              path:"/login",
              element:<Login/>
            },
            {
                path:"/brands",
                element:<Brands/>
            },
            {
                path:"/cities",
                element:<Cities/>
            },
            {
                path:"/locations",
                element:<Locations/>
            },
            {
                path:"/cars",
                element:<Cars/>
            },
            {
                path:"/models",
                element:<Models/>
            }
        ]
    }
])