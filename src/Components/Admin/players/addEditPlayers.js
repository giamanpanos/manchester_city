import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  showSuccessToast,
  showErrorToast,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from "../../Utils/tools";
// import Fileuploader from "../../Utils/fileUploader";
import DisplayImage from "../../Utils/DisplayImageMine";

import {
  TextField,
  Input,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";
import { addPlayer } from "../../../firebase";

import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: "",
};

const AddEditPlayers = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [defaultImg, setDefaultImg] = useState("");

  const formik = useFormik({
    // when we edit a player, we want to display the data and so to do that we should add the following property as true so that formik enables us to put values
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastname: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(100, "The max is 100"),
      position: Yup.string().required("This input is required"),
      image: Yup.string() /*.required("This input is required")*/,
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
      // add
      addPlayer(dataToSubmit)
        .then(() => {
          showSuccessToast("Player added");
          formik.resetForm();
          props.history.push("/admin_players");
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      // edit
      const updatedPlayer = doc(db, "players", props.match.params.playerId);
      async function updatePlayer() {
        await updateDoc(updatedPlayer, dataToSubmit)
          .then(() => {
            showSuccessToast("Player updated");
          })
          .catch((error) => {
            showErrorToast(error);
          })
          .finally(() => setLoading(false));
      }
      updatePlayer();
    }
  };

  useEffect(() => {
    const param = props.match.params.playerId;
    if (param) {
      try {
        async function getPlayer() {
          const docRef = doc(db, "players", param);
          const docSnap = await getDoc(docRef);
          if (docSnap.data()) {
            getDownloadURL(ref(getStorage(), "players")).then((url) => {
              updateImageName(docSnap.data().image);
              setDefaultImg(url);
            });
            setFormType("edit");
            setValues(docSnap.data());
          } else {
            showErrorToast("Sorry, nothing was found");
          }
        }
        getPlayer();
      } catch (error) {
        showErrorToast(error);
      }
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.playerId]);

  const updateImageName = (filename) => {
    formik.setFieldValue("image", filename);
  };

  const resetImage = () => {
    formik.setFieldValue("image", "");
    setDefaultImg("");
  };

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            {formType === "add" ? (
              <>
                <FormControl error={selectIsError(formik, "image")}>
                  {/* <Fileuploader
                    dir="players"
                    defaultImg={defaultImg} // image url
                    defaultImgName={formik.values.image} // name of file
                    filename={(filename) => updateImageName(filename)}
                    resetImage={() => resetImage()}
                  />
                  {selectErrorHelper(formik, "image")} */}
                  <Input
                    type="file"
                    id="filename"
                    name="filename"
                    style={{ border: "none" }}
                    resetImage={() => resetImage()}
                  />
                </FormControl>
                <hr />
              </>
            ) : (
              <DisplayImage values={values} />
            )}
            <h4>Player Info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add firstname"
                  // it takes for us the onChange, onBlur and value properties for us as we have put in other forms manually
                  {...formik.getFieldProps("name")}
                  // we put ... because we need to destructure the object that this function returns
                  {...textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add lastname"
                  // it takes for us the onChange, onBlur and value properties for us as we have put in other forms manually
                  {...formik.getFieldProps("lastname")}
                  // we put ... because we need to destructure the object that this function returns
                  {...textErrorHelper(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  type="number"
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add number"
                  // it takes for us the onChange, onBlur and value properties for us as we have put in other forms manually
                  {...formik.getFieldProps("number")}
                  // we put ... because we need to destructure the object that this function returns
                  {...textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  // it takes for us the onChange, onBlur and value properties for us as we have put in other forms manually
                  {...formik.getFieldProps("position")}
                >
                  <MenuItem value="" disabled>
                    Select a position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {selectErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add player" : "Edit player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
