import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useSnackbar } from "../../context";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../apolloClient/mutation";
import { useMutation } from "@apollo/client";
import { content } from "./content";
import {
  blurBoxCss,
  boxCss,
  mainGrid,
  registerUserValidationSchema,
  signUpTitle,
} from "./helper";
import {
  PersonOutline,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { routes } from "../../config/constant";

const RegisterUser = () => {
  const theme = useTheme();
  const [registerUser] = useMutation(REGISTER_USER);
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isTouched: {},
    error: {},
    isDisabled: true,
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    isTouched,
    error,
    isDisabled,
    showPassword,
    showConfirmPassword,
  } = formValues;

  const handleError = (values) => {
    registerUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setFormValues({
          ...values,
          error: {},
          isDisabled: false,
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setFormValues({
            ...values,
            error: schemaErrors,
            isDisabled: true,
          });
        }
      });
  };

  const handleOnBlur = (field) => {
    const temp = {
      ...formValues,
      isTouched: { ...formValues.isTouched, [field]: true },
    };
    setFormValues(temp);
    handleError(temp);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || "";
    }
    return "";
  };

  const handleOnChange = (field, event) => {
    const temp = {
      ...formValues,
      isTouched: { ...formValues.isTouched, [field]: true },
      [field]: event.target.value,
    };
    setFormValues(temp);
    handleError(temp);
  };

  const handleSubmit = async () => {
    try {
      const areFieldsNotEmpty = () => {
        for (const field in formValues) {
          if (formValues[field].length === 0) {
            return false;
          }
        }
        return true;
      };

      if (areFieldsNotEmpty()) {
        const output = await registerUser({
          variables: {
            input: {
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              email: formValues.email,
              password: formValues.password,
              role: "general",
            },
          },
        });
        if (output?.data?.registerUser?.status === 200) {
          snackBar(
            `${output.data.registerUser.data.firstName} your account has been created successfully`,
            "success"
          );
          navigation(routes.LOGIN, {
            replace: true,
          });
        } else {
          snackBar(
            `${formValues.firstName} try with different credentials`,
            "error"
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid container component="main" sx={mainGrid(theme)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={boxCss(theme)}>
          <Box sx={blurBoxCss(theme)}>
            <Typography sx={signUpTitle(theme)}>{content.SIGN_UP}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  autoComplete="off"
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(event) => handleOnChange("firstName", event)}
                  onBlur={() => handleOnBlur("firstName")}
                  error={Boolean(getError("firstName"))}
                  helperText={getError("firstName")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => handleOnChange("lastName", event)}
                  onBlur={() => handleOnBlur("lastName")}
                  error={Boolean(getError("lastName"))}
                  helperText={getError("lastName")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(event) => handleOnChange("email", event)}
                  onBlur={() => handleOnBlur("email")}
                  error={Boolean(getError("email"))}
                  helperText={getError("email")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  name="password"
                  label="Password"
                  id="password"
                  value={password}
                  onChange={(event) => handleOnChange("password", event)}
                  onBlur={() => handleOnBlur("password")}
                  error={Boolean(getError("password"))}
                  helperText={getError("password")}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setFormValues({
                            ...formValues,
                            showPassword: !showPassword,
                          })
                        }
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => handleOnChange("confirmPassword", event)}
                  onBlur={() => handleOnBlur("confirmPassword")}
                  error={confirmPassword && password !== confirmPassword}
                  helperText={
                    confirmPassword && password !== confirmPassword
                      ? "password must be same"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setFormValues({
                            ...formValues,
                            showConfirmPassword: !showConfirmPassword,
                          })
                        }
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              {content.SIGN_UP}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={routes.LOGIN} variant="body2">
                  {content.ALREADY_HAVE_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default RegisterUser;
