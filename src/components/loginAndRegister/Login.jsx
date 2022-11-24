import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
  actionLoginAsync,
  actionLoginGoogleOrFacebook,
} from "../../redux/actions/userActions";
import { loginProvider } from "../../services/dataLogin";
import Logo from "../loginAndRegister/assets/images/Logo.png";
import Phone from "../loginAndRegister/assets/images/Phone.png";
import "./style.scss";

const schema = yup.object({
  email: yup
    .string()
    .email("Debe ingresar un email")
    .required("Por favor ingresar su email"),
  password: yup.string().required("Por favor ingresar contraseña"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { error, errorMessage } = useSelector((store) => store.userStore);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(actionLoginAsync(data));
    if (error) {
      Swal.fire("Oops!", `Ha ocurrido un error: ${errorMessage}`, "error");
    } else {
      Swal.fire("Good job!", "Tu cuenta se ha creado exitosamente!", "success");
    }
  };
  const handleLoginGoogleOrFacebook = (provider) => {
    dispatch(actionLoginGoogleOrFacebook(provider));
  };
  return (
    <>
      <div>
        <div className="login">
          <img src={Logo} alt="Logo" />
          <h2>Sing in</h2>
          <span>Login or create an account to start ordering</span>
        </div>
      </div>
      <div className="p-5">
        <h1></h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel label="Email address" className="mb-3">
            <Form.Control
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              {...register("email")}
            />
          </FloatingLabel>
          <p>{errors.email?.message}</p>
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password")}
            />
          </FloatingLabel>
          <p>{errors.password?.message}</p>

          <Button variant="warning" type="submit" className="mt-3 mb-3">
            Login
          </Button>
        </Form>
        <Link to="/Register">Would you like to create an account?</Link>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {loginProvider.map((provider, index) => (
            <img
              key={index}
              src={provider.image}
              alt={provider.name}
              style={{ width: "40px", cursor: "pointer" }}
              onClick={() => {
                handleLoginGoogleOrFacebook(provider.provider);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
