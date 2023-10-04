import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import FlexBetween from "@/components/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { setLogin } from "@/state";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values: any, onSubmitProps: any) => {
    //this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const saveUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      { method: "POST", body: formData },
    );

    const savedUser = await saveUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values: any, onSubmitProps: any) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
      );
      await router.push("/home");
    }
  };
  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <>
      <Formik
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        onSubmit={handleFormSubmit}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"grid"}
              gap={"30px"}
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label={"First Name"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //@ts-ignore
                    value={values.firstName}
                    name={"firstName"}
                    error={
                      //@ts-ignore
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    //@ts-ignore
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label={"Last Name"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //@ts-ignore
                    value={values.lastName}
                    name={"lastName"}
                    error={
                      //@ts-ignore
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    //@ts-ignore
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label={"Location"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //@ts-ignore
                    value={values.location}
                    name={"location"}
                    error={
                      //@ts-ignore
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    //@ts-ignore
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label={"Occupation"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    //@ts-ignore
                    value={values.occupation}
                    name={"occupation"}
                    error={
                      //@ts-ignore
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    //@ts-ignore
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn={"span 4"}
                    //@ts-ignore
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius={"5px"}
                  >
                    <Dropzone
                      accept={{
                        "image/*": [".png", ".jpeg", ".jpg"],
                      }}
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p={"1rem"}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {
                            //@ts-ignore
                            !values.picture ? (
                              <p>Add Picture Here</p>
                            ) : (
                              <FlexBetween>
                                <Typography>
                                  {
                                    //@ts-ignore
                                    values.picture.name
                                  }
                                </Typography>
                                <EditOutlined />
                              </FlexBetween>
                            )
                          }
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                label={"Email"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name={"email"}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label={"Password"}
                type={"password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name={"password"}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type={"submit"}
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  //@ts-ignore
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Register here"
                  : "Already have an account? Login here"}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
