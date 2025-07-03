import * as yup from "yup";

export const registerUserValidationSchema = yup.object({
  firstName: yup.string().label("First Name").required(),
  lastName: yup.string().label("Last Name").required(),
  email: yup.string().email().label("Email Address").required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[a-z]/, "At least one lowercase character is required")
    .matches(/[A-Z]/, "At least one uppercase character is required")
    .matches(/[0-9]/, "At least one number is required")
    .matches(/[^a-zA-Z0-9]/, "At least one special character is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const mainGrid = (theme) => ({
  height: "100vh",
  backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
});

export const boxCss = (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const blurBoxCss = (theme) => ({
  backgroundColor: `rgba(${theme.palette.background.paper}, 0.5)`,
  backdropFilter: "blur(8px)",
  padding: 3,
  borderRadius: 3,
});

export const signUpTitle = (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: 30,
  mb: 1,
  color: theme.palette.primary.main,
});
