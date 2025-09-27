import React from "react";
import logo from "../assets/logo.png";
import highlight from "../assets/highligt.svg";
import "../assets/style.css";
import { Mail } from "@mui/icons-material";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { support_mail } from "../utils/APIRoutes";

// Font Awesome CDN (inserted in index.html or dynamically loaded separately)
const functionTOCopy = (value) => {
  copy(value);
  toast.success("Copied to clipboard!", { id: 1 });
};
const BuyBot = () => {
  return (
    <section>
      <div className="main_pages">
        <div className="icon_img">
          <img src={highlight} alt="" className="highlighted highlight-1" />
          <img src={highlight} alt="" className="highlighted highlight-2" />
          <img src={highlight} alt="" className="highlighted highlight-3" />
          <img src={highlight} alt="" className="highlighted highlight-4" />
        </div>

        <img src={logo} alt="Buy Bot Logo" className="logo" />
        <h2>
          Welcome to <span>BNB Chainx</span>
        </h2>
        <p>Whether you're in e-commerce, trading, marketing,</p>

        <div className="btn_main">
          <a href="/login">Login Now</a>
        </div>

        <ul className="!text-white">
          {/* <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li> */}
          <Mail onClick={() => functionTOCopy(support_mail)} />{" "}
          <span
            className="!text-[11px]"
            onClick={() => functionTOCopy(support_mail)}
          >
            {support_mail}
          </span>
        </ul>
      </div>
    </section>
  );
};

export default BuyBot;
