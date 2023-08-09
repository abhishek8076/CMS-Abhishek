import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { Cms } from "./pages/CMS/Cms";
import { Extra } from "./pages/extra/Extra";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

         
            <Route path="/" element={<Home />} />
            <Route path="cms" element={<Cms />} />
            <Route path="extra" element={<Extra />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":user_id" element={<Single />} />
              <Route
                path="new"
                element={<New/>}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New/>}
              />
            </Route>
         
          {/* Add a catch-all route for 404 */}
          {/* <Route path='*' element={<NotFoundComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
