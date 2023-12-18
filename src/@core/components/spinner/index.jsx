// ** MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { LogoSvg } from '@core/layouts/components/shared-components/LogoSvg';

const FallbackSpinner = ({ sx }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <LogoSvg width={50} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
