// ** React Import
import Autocomplete from '@mui/material/Autocomplete';
// ** MUI Import
import Paper from '@mui/material/Paper';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CustomAutocomplete = forwardRef((props, ref) => {
  return (
    // @ts-expect-error - AutocompleteProps is not compatible with PaperProps
    <Autocomplete
      {...props}
      ref={ref}
      PaperComponent={(props) => (
        <Paper {...props} className="custom-autocomplete-paper" />
      )}
    />
  );
});

export default CustomAutocomplete;
