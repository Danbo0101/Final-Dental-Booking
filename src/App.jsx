import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import { useEffect, useRef, useState } from "react";

const App = (props) => {
  const currentUrl = window.location.href;

  console.log(currentUrl);

  return (
    <div
      className={`${
        currentUrl !== "http://localhost:5173/" ? "bg-custom-gradient" : ""
      }`}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
