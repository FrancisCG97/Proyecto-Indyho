import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import OptionsMenu from '@core/components/option-menu';

const ConnectionsTeams = ({ connections, teams }) => {
  return (
    <>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader
            title="Connections"
            action={
              <OptionsMenu
                iconButtonProps={{
                  size: 'small',
                  sx: { color: 'text.disabled' },
                }}
                options={[
                  'Share connections',
                  'Suggest edits',
                  { divider: true },
                  'Report bug',
                ]}
              />
            }
          />
          <CardContent>
            {connections &&
              connections.map((connection, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={connection.avatar}
                        sx={{ mr: 3, width: 38, height: 38 }}
                      />
                      <div>
                        <Typography
                          sx={{ fontWeight: 500, color: 'text.secondary' }}
                        >
                          {connection.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.disabled' }}
                        >
                          {connection.connections} Connections
                        </Typography>
                      </div>
                    </Box>
                    <Button
                      size="small"
                      color="primary"
                      variant={connection.isFriend ? 'contained' : 'tonal'}
                      sx={{
                        minWidth: 30,
                        minHeight: 30,
                        p: (theme) => `${theme.spacing(1.25)} !important`,
                      }}
                    >
                      <Icon
                        fontSize="1.125rem"
                        icon={
                          connection.isFriend
                            ? 'tabler:user-x'
                            : 'tabler:user-check'
                        }
                      />
                    </Button>
                  </Box>
                );
              })}
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                View all connections
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader
            title="Teams"
            action={
              <OptionsMenu
                iconButtonProps={{
                  size: 'small',
                  sx: { color: 'text.disabled' },
                }}
                options={[
                  'Share teams',
                  'Suggest edits',
                  { divider: true },
                  'Report bug',
                ]}
              />
            }
          />
          <CardContent>
            {teams &&
              teams.map((team, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={team.avatar}
                        sx={{ mr: 3, width: 38, height: 38 }}
                      />
                      <div>
                        <Typography
                          sx={{ fontWeight: 500, color: 'text.secondary' }}
                        >
                          {team.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.disabled' }}
                        >
                          {team.members} Members
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      href="/"
                      component={Link}
                      onClick={(e) => e.preventDefault()}
                      sx={{
                        height: 0,
                        textDecoration: 'none',
                        '& .MuiChip-root': { cursor: 'pointer' },
                      }}
                    >
                      <CustomChip
                        rounded
                        size="small"
                        skin="light"
                        color={team.ChipColor}
                        label={team.chipText}
                      />
                    </Box>
                  </Box>
                );
              })}
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                href="/"
                component={Link}
                onClick={(e) => e.preventDefault()}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                View all teams
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ConnectionsTeams;
