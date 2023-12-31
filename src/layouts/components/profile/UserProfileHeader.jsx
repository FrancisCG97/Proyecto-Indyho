import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';

import Icon from '@core/components/icon';

import { useAuth } from '@hooks/useAuth';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfileHeader = () => {
  // ** State
  const { user } = useAuth();
  const [data, setData] = useState({
    location: 'Vatican City',
    joiningDate: 'April 2021',
    fullName: user.email,
    designation: 'UX Designer',
    profileImg: '/images/avatars/14.png',
    designationIcon: 'tabler:color-swatch',
    coverImg: '/images/pages/profile-banner.png',
  });
  // useEffect(() => {
  //   axios.get('/profile').then(response => {
  //     setData(response.data)
  //   })
  // }, [])
  const designationIcon = data?.designationIcon || 'tabler:briefcase';

  return data !== null ? (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={data.coverImg}
        sx={{
          height: { xs: 150, md: 250 },
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <ProfilePicture src={data.profileImg} alt="profile-picture" />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Typography variant="h5" sx={{ mb: 2.5 }}>
              {data.fullName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon={designationIcon} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.designation}
                </Typography>
              </Box>
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon="tabler:map-pin" />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon="tabler:calendar" />
                <Typography sx={{ color: 'text.secondary' }}>
                  Joined {data.joiningDate}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:check" fontSize="1.125rem" />
            Connected
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default UserProfileHeader;
