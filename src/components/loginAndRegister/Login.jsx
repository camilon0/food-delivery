import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { actionLoginAsync } from "../../redux/actions/userActions";
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
  const { error, errorMessage } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(actionLoginAsync(data));
    if (error) {
      Swal.fire("Oops!", `Ha ocurrido un error: ${errorMessage}`, "error");
    } else {
      Swal.fire("Good job!", "Tu cuenta se ha creado exitosamente!", "success");
    }
  };
  return (<><div>
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
        <Link to={"/register"}>
          <button type="button">Login</button>
        </Link>
      </div>
    </div>
    <div className="p-5">
      <h1>Iniciar Sesión</h1>
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
          Iniciar Sesión
        </Button>
      </Form>
      <Link to="/Register">¿Desea crear una cuenta?</Link>
    </div></>
    
  );
};

export default Login;
