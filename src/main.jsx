import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Home/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Singup from './Components/SingUp/Singup.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [ 
{
path: '/',
element: <Home></Home>


},

{

  path: 'login',
  element: <Login></Login>

},

{

  path: 'register',
  element: <Register></Register>
},

{

path: 'singup',
element: <Singup></Singup>

}


    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
