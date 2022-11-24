import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
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
        className="m-3"
        variant="warning"
        onClick={() => {
          navigate(`/addRestaurantes`);
        }}
        style={{ height: "60px" }}
      >
        Add restaurant
      </Button>
    </div>
  );
};

export default Profile;
