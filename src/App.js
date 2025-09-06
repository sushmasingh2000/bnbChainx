import "animate.css";
import "aos/dist/aos.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";

import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import BuyBot from "./dashboard/BuyBot";
import { routes } from "./routes/Routes";
import { adminroutes } from "./AdminRoutes";
import AdminLayout from "./Adminpages/Layout";
import LogIn from "./Adminpages/Authentication/Login";
import ForgotPassword from "./authentication/Forgotpassword";
import Dashboard from "./dashboard/Dashboard";

const App = () => {
  const user = localStorage.getItem("logindataen");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BuyBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* //admin */}
        <Route path="/adminlogin" element={<LogIn />} />
        


        {user ? (
          adminroutes.map((route, i) => (
            <Route key={i} path={route.path} element=
              {<AdminLayout
                id={route.id}
                navLink={route.path}
                navItem={route.navItem}
                component={route.component}
              />}
            />
          ))
        ) : (
          <Route path="*" element={<Login />} />
        )}
        {/* Protected Routes */}
        {user ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
