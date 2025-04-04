import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FormHelperText } from "@material-ui/core";
import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import { getAuth } from "firebase/auth";

export const CityLogo = (props) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    ></div>
  );

  if (props.link) {
    return (
      <Link className="link_logo" to={props.linkTo}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : "#ffffff",
        fontSize: props.size ? props.size : "15px",
        color: props.color ? props.color : "#000000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const logoutHandler = () => {
  getAuth()
    .signOut()
    .then(() => {
      showSuccessToast("Goodbye!");
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
};

// function to display error message in formik inputs fields
export const textErrorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

// function to display error message in formik select fields
export const selectErrorHelper = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

// check if the select form has any errors to display them through the above function. This one will return true or false to use to the error prop
export const selectIsError = (formik, values) => {
  return formik.errors[values] && formik.touched[values];
};
