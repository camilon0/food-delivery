import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { actionAddFoodAsync } from "../../redux/actions/restaurantesActions";
import { fileUpLoad } from "../../services/fileUpLoad";
import "../home/style.scss";
const inputListFood = [
  {
    label: "Nombre",
    type: "textarea",
    name: "name",
  },
  {
    label: "Categoría",
    type: "select",
    name: "category",
  },
  {
    label: "Id",
    type: "textarea",
    name: "id",
  },
  {
    label: "Precio",
    type: "number",
    name: "price",
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
    label: "Fast Food",
    value: 1,
  },
  {
    label: "Pizza",
    value: 2,
  },
  {
    label: "Coffee",
    value: 3,
  },
];

const schema = yup.object({
  name: yup.string().required("Debe ingresar el nombre de la comida"),
  category: yup.string().required("Debe seleccionar una categoría"),
  description: yup
    .string()
    .required("Debe incluir una descripción de la comida"),
  price: yup.number().required("Debe ingresar el precio de la comida"),
  id: yup.string().required("Debe ingresar el mismo nombre del restaurante"),
});

const AddFoods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newFood = {
      name: data.name,
      id: data.id,
      category: data.category,
      description: data.description,
      price: data.price,
      image: image,
    };

    console.log(newFood);
    dispatch(actionAddFoodAsync(newFood));
    navigate(`/home`);
  };
  return (
    <div className="p-5">
      <h1>Agregar una nueva comida</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputListFood.map((item, index) => {
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
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddFoods;
