import React from "react";
import { ImageNames } from "./ImageNamesMine";

function DisplayImage({ values }) {
  const finalImageName = values.lastname.replace(" ", "_");

  return (
    <div>
      <img src={ImageNames[finalImageName]} alt={values.lastname} />
    </div>
  );
}

export default DisplayImage;
