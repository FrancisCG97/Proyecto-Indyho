// ** MUI Imports
import {
  Timeline as MuiTimeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  styled,
} from '@mui/material';

import Icon from '@core/components/icon';
import OptionsMenu from '@core/components/option-menu';

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none',
    },
  },
});

const ActivityTimeline = () => {
  return (
    <Card>
      <CardHeader
        title="Actividad reciente"
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
        avatar={<Icon fontSize="1.25rem" icon="tabler:list-details" />}
        action={
          <OptionsMenu
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            options={[
              'Share timeline',
              'Suggest edits',
              { divider: true },
              'Report bug',
            ]}
          />
        }
      />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="warning" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ mt: 0, mb: (theme) => `${theme.spacing(2)} !important` }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Client Meeting
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  Today
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Project meeting with john @10:15am
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src="/images/avatars/3.png"
                  sx={{ mr: 3, width: 38, height: 38 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: 'text.primary' }}
                  >
                    Lester McCarthy (Client)
                  </Typography>
                  <Typography variant="caption">CEO of Infibeam</Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Create a new project for client
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  2 Days Ago
                </Typography>
              </Box>
              <Typography variant="body2">
                Add files to new design folder
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="info" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ mt: 0, mb: (theme) => `${theme.spacing(2)} !important` }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Shared 2 New Project Files
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  6 Days Ago
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Sent by Mollie Dixon
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { color: 'warning.main' },
                  }}
                >
                  <Icon fontSize="1.25rem" icon="tabler:file-text" />
                  <Typography
                    variant="body2"
                    sx={{ ml: 2, fontWeight: 500, color: 'text.primary' }}
                  >
                    App Guidelines
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { color: 'success.main' },
                  }}
                >
                  <Icon fontSize="1.25rem" icon="tabler:table" />
                  <Typography
                    variant="body2"
                    sx={{ ml: 2, fontWeight: 500, color: 'text.primary' }}
                  >
                    Testing Results
                  </Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Project status updated
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  10 Days Ago
                </Typography>
              </Box>
              <Typography variant="body2">
                Woocommerce iOS App Completed
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
