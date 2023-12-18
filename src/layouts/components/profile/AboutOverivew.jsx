import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import Icon from '@core/components/icon';

import { useAuth } from '@hooks/useAuth';

const AboutResume = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:user" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Full Name :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>John Doe</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:check" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Status :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Active</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:crown" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Role :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Developer</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:flag" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Country :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Chile</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:language" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Language :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Spanish</Typography>
        </Box>
      </Box>
    </>
  );
};

const AboutContacts = () => {
  const { user } = useAuth();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:phone-call" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Contact :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            (123) 456-7890
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:brand-skype" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Skype :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Jon.Doe</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:mail" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Email :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{user.email}</Typography>
        </Box>
      </Box>
    </>
  );
};

const AboutTeams = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: `#7367F0` },
        }}
      >
        <Icon fontSize="1.25rem" icon="tabler:brand-github" color="primary" />

        <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
          Back-end Developer :
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>(126 Members)</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: `#7367F0` },
        }}
      >
        <Icon fontSize="1.25rem" icon="tabler:brand-react" color="info" />

        <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
          React Developer :
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>(98 Memmbers)</Typography>
      </Box>
    </>
  );
};

const AboutOver = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:check" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Task Compiled :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>13.5K</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:users" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Connections :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>897</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 3 },
          '& svg': { color: 'text.secondary' },
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon fontSize="1.25rem" icon="tabler:layout-grid" />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Projects Compiled :
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>146</Typography>
        </Box>
      </Box>
    </>
  );
};

const AboutOverivew = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                }}
              >
                About
              </Typography>
              <AboutResume />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                }}
              >
                Contacts
              </Typography>
              <AboutContacts />
            </Box>
            <div>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                }}
              >
                Teams
              </Typography>
              <AboutTeams />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                }}
              >
                Overview
              </Typography>
              <AboutOver />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AboutOverivew;
