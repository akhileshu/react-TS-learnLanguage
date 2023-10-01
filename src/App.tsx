import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Login from "./components/Login";
import './App.css'

const App=()=>{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/learn",
      element: <Learning/>,
    },
    {
      path: "/quiz",
      element: <Quiz/>,
    },
    {
      path: "/result",
      element: <Result/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App
