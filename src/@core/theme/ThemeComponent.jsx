import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';

import themeConfig from '@configs/themeConfig';

// ** Theme
import themeOptions from './ThemeOptions';
// ** Global Styles
import GlobalStyling from './globalStyles';

const ThemeComponent = (props) => {
  // ** Props
  const { settings, children } = props;

  // ** Pass merged ThemeOptions (of core and user) to createTheme function
  let theme = createTheme(themeOptions(settings, 'light'));

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
