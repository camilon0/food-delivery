import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.userStore);
  const [admin, setAdmin] = useState(true);

  const adminRegistrado = () => {
    if (user.email === "camilo10.97@hotmail.com") {
      //Mechas@12345678
      setAdmin(false);
    }
  };

  useEffect(() => {
    adminRegistrado();
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ height: "200px" }}>
      <Button
        disabled={admin}
        className="m-3"
        variant="warning"
        onClick={() => {
          navigate(`/addFoods`);
        }}
        style={{ height: "60px" }}
      >
        Add foods
      </Button>
      <Button
        disabled={admin}
        className="m-3"
        variant="warning"
        onClick={() => {
          navigate(`/addRestaurantes`);
        }}
        style={{ height: "60px" }}
      >
        Add restaurant
      </Button>
      <Button
        disabled={admin}
        className="m-3"
        variant="warning"
        onClick={() => {
          navigate(`/deletedRestaurant`);
        }}
        style={{ height: "60px" }}
      >
        Deleted restaurant
      </Button>
      <Button
        disabled={admin}
        className="m-3"
        variant="warning"
        onClick={() => {
          navigate(`/deletedFood`);
        }}
        style={{ height: "60px" }}
      >
        Deleted foods
      </Button>
    </div>
  );
};

export default Profile;
