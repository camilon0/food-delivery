import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { actionAddRestauranteAsync } from "../../redux/actions/restaurantesActions";
import { fileUpLoad } from "../../services/fileUpLoad";

const inputList = [
  {
    label: "Nombre",
    type: "text",
    name: "name",
  },
  {
    label: "Categoría",
    type: "select",
    name: "category",
  },
  {
    label: "Work time",
    type: "textarea",
    name: "time",
  },
  {
    label: "Descripción",
    type: "textarea",
    name: "description",
  },

  {
    label: "Imagen",
    type: "file",
    name: "image",
  },
];

const category = [
  {
    label: "Fast food",
    value: 1,
  },
  {
    label: "Pizzeria",
    value: 2,
  },
  {
    label: "Italiano",
    value: 3,
  },
  {
    label: "Coreano",
    value: 4,
  },
];

const schema = yup.object({
  name: yup.string().required("Debe ingresar el nombre del restaurante"),
  category: yup.string().required("Debe seleccionar una categoría"),
  description: yup
    .string()
    .required("Debe incluir una descripción del restaurante"),

  time: yup.string().required("Debe ingresar la hora del restaurante"),
});

const AddRestaurantes = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newRestaurante = {
      name: data.name,
      category: data.category,
      description: data.description,
      time: data.time,
      image: image,
    };
    console.log(newRestaurante);
    dispatch(actionAddRestauranteAsync(newRestaurante));
  };
  return (
    <div className="p-5">
      <h1>Agregar un nuevo Restaurante</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === "select") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name)}
                >
                  <option value="">Open this select menu</option>
                  {category.map((item) => (
                    <option
                      key={item.value}
                      value={item.label}
                      className="text-capitalize"
                    >
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }
          if (item.type === "textarea") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Control as="textarea" {...register(item.name)} />
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
                type={item.type}
                size={item.type === "file" ? "sm" : ""}
                {...register(item.name)}
              />
              <p>{errors[item.name]?.message}</p>
            </FloatingLabel>
          );
        })}

        <Button variant="warning" type="submit" className="mb-3">
          Agregar Restaurante
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurantes;
