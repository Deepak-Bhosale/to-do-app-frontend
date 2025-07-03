import * as yup from "yup";

export const loginUserValidationSchema = yup.object({
  email: yup.string().email().label("Email Address").required(),
  password: yup.string().required("Password is required"),
});

export const loginMainGrid = {
  height: "100vh",
  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  justifyContent: "flex-end",
  alignItems: "center",
  matginRight: "10px",
};

export const loginBox = {
  marginRight: "20px",
  marginLeft: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(8px)",
  padding: 5,
  borderRadius: 3,
};
