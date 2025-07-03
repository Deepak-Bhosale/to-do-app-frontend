import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { constants, routes } from "../../config/constant";
import errorBoundry from "../../assets/error_boundry.jpg";
import { content } from "./content";

const NotFoundRoute = () => {
  const navigate = useNavigate();

  const handleOnHomePage = () => {
    if (localStorage.getItem("accessToken")) {
      navigate(
        JSON.parse(localStorage.getItem("user")).role === constants.admin
          ? routes.ADMIN_DASHBOARD
          : routes.USER_DASHBOARD,
        {
          replace: true,
        }
      );
    } else {
      navigate(routes.LOGIN, {
        replace: true,
      });
    }
  };

  return (
    <div>
      <center>
        <p style={{ fontSize: "50px", color: "#BEBEBE" }}>{content.OOOPS}</p>
        <img src={errorBoundry} alt="" height="300rem" width="300rem" />
        <p>{content.PAGE_NOT_FOUND}</p>
        <Button
          sx={{
            m: 1,
          }}
          variant="contained"
          onClick={() => handleOnHomePage()}
        >
          {content.GO_HOME}
        </Button>
      </center>
    </div>
  );
};

export default NotFoundRoute;
