import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../apolloClient';
import { useSnackbar } from '../../context';
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from '@mui/material/Link';
import { loginBox, loginMainGrid, loginUserValidationSchema } from './helper';
import { content } from './content';
import { constants, routes } from '../../config/constant';

const Login = () => {
  const [login] = useMutation(LOGIN);
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    isTouched: {},
    error: {},
    isDisabled: true,
    showPassword: false,
  });

  const { email, password, isTouched, error, isDisabled, showPassword } =
    formValues;

  const handleError = (values) => {
    loginUserValidationSchema
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
      return error[type] || '';
    }
    return '';
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
      const output = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      if (output?.data?.login?.data) {
        localStorage.setItem(
          constants.accessToken,
          output.data.login.data.token
        );
        localStorage.setItem(
          constants.user,
          JSON.stringify(output.data.login.data.user)
        );
        snackBar(
          `${output.data.login.data.user.firstName} ${content.LOGIN_SUCCESSFULLY}`,
          constants.success
        );
        navigation(
          output.data.login.data.user.role === constants.admin
            ? routes.ADMIN_DASHBOARD
            : routes.USER_DASHBOARD,
          {
            replace: true,
          }
        );
      } else {
        snackBar(content.TRY_WITH_DIFFERENT_CREDENTIALS, constants.error);
      }
    } catch (error) {
      snackBar(content.TRY_WITH_DIFFERENT_CREDENTIALS, constants.error);
      console.log('CATCH BLOCK : Login : handleSubmit =>', error);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem(constants.accessToken) &&
      localStorage.getItem(constants.user)
    ) {
      navigation(
        JSON.parse(localStorage.getItem(constants.user)).role ===
          constants.admin
          ? routes.ADMIN_DASHBOARD
          : routes.USER_DASHBOARD,
        {
          replace: true,
        }
      );
    }
  }, []);

  return (
    <Grid container component="main" sx={loginMainGrid}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Box sx={loginBox}>
          <Box sx={{ mt: 0 }}>
            <Typography fontSize={30}>
              {content.LOGIN_TO_YOUR_ACCOUNT}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="off"
              id={content.EMAIL}
              label={content.EMAIL_ADDRESS_LABEL}
              name={content.EMAIL}
              value={email}
              onChange={(event) => handleOnChange(content.EMAIL, event)}
              onBlur={() => handleOnBlur(content.EMAIL)}
              error={Boolean(getError(content.EMAIL))}
              helperText={getError(content.EMAIL)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="off"
              name={content.PASSWORD}
              label={content.PASSWORD_LABEL}
              id={content.PASSWORD}
              value={password}
              onChange={(event) => handleOnChange(content.PASSWORD, event)}
              onBlur={() => handleOnBlur(content.PASSWORD)}
              error={Boolean(getError(content.PASSWORD))}
              helperText={getError(content.PASSWORD)}
              type={showPassword ? 'text' : content.PASSWORD}
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={content.REMEMBER_ME}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              {content.SIGN_IN}
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  {content.FORGOT_PASSWORD}
                </Link>
              </Grid> */}
              <Grid item>
                <Link href={routes.REGISTER_USER} variant="body2">
                  {content.DONT_HAVE_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
