import React from "react";
import Logo from "../loginAndRegister/assets/images/Logo.png";
import Phone from "../loginAndRegister/assets/images/Phone.png";
import "./style.scss";
const Login = () => {
  return (
    <div>
      <div className="login">
        <img src={Logo} alt="Logo" />
        <h2>Sing in</h2>
        <span>
          Login or create an account with your phone number to start ordering
        </span>
        <div className="login__input">
          <img src={Phone} alt="Phone" />
          <input type="number" />
        </div>
      </div>
      <div className="login__btn">
        <button type="button">Login</button>
      </div>
    </div>
  );
};

export default Login;
