import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@material-ui/core";

import { useFormik } from "formik";
import * as Yup from "yup";

import { showSuccessToast, showErrorToast } from "../../Utils/tools";

import { db, addPromotion } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("The email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    try {
      const q = query(
        collection(db, "promotions"),
        where("email", "==", values.email)
      );
      const isOnTheList = await getDocs(q);
      if (isOnTheList.docs.length >= 1) {
        showErrorToast("sorry you are on the list already");
        setLoading(false);
        return false;
      }
      addPromotion({ email: values.email });
      formik.resetForm();
      setLoading(false);
      showSuccessToast("Congratulations!");
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit" style={{ cursor: "pointer" }}>
                Subscribe
              </button>
            )}

            <div className="enroll_discl">
              Subscribe now to receive the latest news for your favourite team!
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
