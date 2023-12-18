import Grid from '@mui/material/Grid';

import AboutOverivew from './AboutOverivew';
import ActivityTimeline from './ActivityTimeline';
import ConnectionsTeams from './ConnectionsTeams';
import ProjectsTable from './ProjectsTable';

const ConnectionsData = [
  {
    tasks: '834',
    projects: '18',
    isConnected: true,
    connections: '129',
    name: 'Mark Gilbert',
    designation: 'UI Designer',
    avatar: '/images/avatars/11.png',
    chips: [
      {
        title: 'Figma',
        color: 'secondary',
      },
      {
        title: 'Sketch',
        color: 'warning',
      },
    ],
  },
  {
    tasks: '2.31k',
    projects: '112',
    isConnected: false,
    connections: '1.28k',
    name: 'Eugenia Parsons',
    designation: 'Developer',
    avatar: '/images/avatars/12.png',
    chips: [
      {
        color: 'error',
        title: 'Angular',
      },
      {
        color: 'info',
        title: 'React',
      },
    ],
  },
  {
    tasks: '1.25k',
    projects: '32',
    isConnected: false,
    connections: '890',
    name: 'Francis Byrd',
    designation: 'Developer',
    avatar: '/images/avatars/7.png',
    chips: [
      {
        title: 'HTML',
        color: 'primary',
      },
      {
        color: 'info',
        title: 'React',
      },
    ],
  },
  {
    tasks: '12.4k',
    projects: '86',
    isConnected: false,
    connections: '890',
    name: 'Leon Lucas',
    designation: 'UI/UX Designer',
    avatar: '/images/avatars/8.png',
    chips: [
      {
        title: 'Figma',
        color: 'secondary',
      },
      {
        title: 'Sketch',
        color: 'warning',
      },
      {
        color: 'primary',
        title: 'Photoshop',
      },
    ],
  },
  {
    tasks: '23.8k',
    projects: '244',
    isConnected: true,
    connections: '2.14k',
    name: 'Jayden Rogers',
    designation: 'Full Stack Developer',
    avatar: '/images/avatars/5.png',
    chips: [
      {
        color: 'info',
        title: 'React',
      },
      {
        title: 'HTML',
        color: 'warning',
      },
      {
        color: 'success',
        title: 'Node.js',
      },
    ],
  },
  {
    tasks: '1.28k',
    projects: '32',
    isConnected: false,
    designation: 'SEO',
    connections: '1.27k',
    name: 'Jeanette Powell',
    avatar: '/images/avatars/6.png',
    chips: [
      {
        title: 'Analysis',
        color: 'secondary',
      },
      {
        color: 'success',
        title: 'Writing',
      },
    ],
  },
];
const ProfileTab = () => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          <ConnectionsTeams connections={ConnectionsData} />
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
