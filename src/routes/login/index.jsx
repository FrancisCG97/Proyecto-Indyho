import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import Icon from '@core/components/icon';
import CustomTextField from '@core/components/mui/text-field';
import { LogoSvg } from '@core/layouts/components/shared-components/LogoSvg';

import { useAuth } from '@hooks/useAuth';
import { useSettings } from '@hooks/useSettings';

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500,
  },
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const MaskImg = styled('img')(({ theme }) => ({
  bottom: 0,
  height: 300,
  width: '100%',
  position: 'absolute',
  [theme.breakpoints.down(1540)]: {
    height: 250,
  },
}));

const FooterIllustrationsV2 = (props) => {
  const { image, height, className } = props;
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  2;
  if (!hidden) {
    return (
      <>
        {!image ? (
          <MaskImg
            alt=""
            className={className}
            {...(height && { height })}
            src={`/images/pages/auth-v2-mask-${theme.palette.mode}.png`}
            loading="lazy"
          />
        ) : typeof image === 'string' ? (
          <MaskImg
            alt=""
            src={image}
            className={className}
            {...(height && { height })}
            loading="lazy"
          />
        ) : (
          image
        )}
      </>
    );
  } else {
    return null;
  }
};
const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary,
  },
}));

export const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  const { settings } = useSettings();

  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    await auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      setLoading(false);
    });
  };
  const imageSource =
    skin === 'bordered'
      ? 'auth-v2-login-illustration-bordered'
      : 'auth-v2-login-illustration';

  return (
    <Box className="content-right" sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: (theme) => theme.spacing(8, 0, 8, 8),
          }}
        >
          <LoginIllustration
            alt="login-illustration"
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            loading="lazy"
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LogoSvg width={34} />
            <Box sx={{ my: 6 }}>
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                {`Welcome! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            {/* <Alert
              icon={false}
              sx={{
                py: 3,
                mb: 6,
                ...bgColors.primaryLight,
                '& .MuiAlert-message': { p: 0 },
              }}
            >
              <Typography variant="body2" sx={{ mb: 2, color: 'primary.main' }}>
                Admin: <strong>admin@vuexy.com</strong> / Pass:{' '}
                <strong>admin</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.main' }}>
                Client: <strong>client@vuexy.com</strong> / Pass:{' '}
                <strong>client</strong>
              </Typography>
            </Alert> */}
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label="Email"
                      value={value || ''}
                      onBlur={onBlur}
                      blurOnSubmit={true}
                      onChange={onChange}
                      placeholder="admin@vuexy.com"
                      error={
                        (value && errors.email) ||
                        (getValues('password') && Boolean(errors.email))
                      }
                      {...(((value && errors.email) ||
                        (getValues('password') && Boolean(errors.email))) && {
                        helperText: errors.email.message,
                      })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ''}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={getValues('email') && Boolean(errors.password)}
                      {...(getValues('email') &&
                        errors.password && {
                          helperText: errors.password.message,
                        })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon
                                fontSize="1.25rem"
                                icon={
                                  showPassword ? 'tabler:eye' : 'tabler:eye-off'
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  label="Remember Me"
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                />
                <Typography component={LinkStyled} to="/forgot-password">
                  Forgot Password?
                </Typography>
              </Box>
              <LoadingButton
                loading={loading}
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 4 }}
              >
                Login
              </LoadingButton>
              {/* <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>
                  New on our platform?
                </Typography>
                <Typography to="/register" component={LinkStyled}>
                  Create an account
                </Typography>
              </Box> */}
              {/* <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: (theme) => `${theme.spacing(6)} !important`,
                }}
              >
                or
              </Divider>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  to="/"
                  component={Link}
                  sx={{ color: '#497ce2' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:facebook" />
                </IconButton>
                <IconButton
                  to="/"
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:twitter" />
                </IconButton>
                <IconButton
                  to="/"
                  component={Link}
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? '#272727' : 'grey.300',
                  }}
                >
                  <Icon icon="mdi:github" />
                </IconButton>
                <IconButton
                  to="/"
                  component={Link}
                  sx={{ color: '#db4437' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:google" />
                </IconButton>
              </Box> */}
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};
