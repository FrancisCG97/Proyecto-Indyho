import { TabList as MuiTabList, TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, styled } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Icon from '@core/components/icon';

import UserProfileHeader from '@layouts/components/profile/UserProfileHeader';

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130,
    },
  },
}));

export const UserProfile = () => {
  const hideText = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(
    () => location.pathname.split('/').pop(),
    [location.pathname],
  );

  const handleChange = (event, newValue) => {
    const to = newValue === 'profile' ? '/profile' : `/profile/${newValue}`;
    navigate(to);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader />
      </Grid>
      <Grid item xs={12}>
        <TabContext value={activeTab || 'profile'}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="customized tabs example"
              >
                <Tab
                  value="profile"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...(!hideText && { '& svg': { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:user-check" />
                      {!hideText && 'Profile'}
                    </Box>
                  }
                />
                <Tab
                  value="teams"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...(!hideText && { '& svg': { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:users" />
                      {!hideText && 'Teams'}
                    </Box>
                  }
                />
                {/* <Tab
                  value="projects"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...(!hideText && { '& svg': { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:layout-grid" />
                      {!hideText && 'Projects'}
                    </Box>
                  }
                />
                <Tab
                  value="connections"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...(!hideText && { '& svg': { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:link" />
                      {!hideText && 'Connections'}
                    </Box>
                  }
                /> */}
              </TabList>
            </Grid>
            <Grid item xs={12}>
              <TabPanel sx={{ p: 0 }} value={activeTab}>
                <Outlet />
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  );
};
