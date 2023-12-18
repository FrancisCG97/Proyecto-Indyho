import {
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  LinearProgress,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import CustomAvatar from '@core/components/mui/avatar';
import CustomTextField from '@core/components/mui/text-field';
import OptionsMenu from '@core/components/option-menu';
import { getInitials } from '@core/utils/get-initials';

const renderName = (row) => {
  if (row.avatar) {
    return (
      <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor || 'primary'}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    );
  }
};

const columns = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Name',
    renderCell: ({ row }) => {
      const { name, date } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderName(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              {name}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.disabled', textTransform: 'capitalize' }}
            >
              {date}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'leader',
    headerName: 'Leader',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.leader}</Typography>
    ),
  },
  {
    flex: 0.1,
    field: 'team',
    minWidth: 130,
    headerName: 'Team',
    renderCell: ({ row }) => (
      <AvatarGroup className="pull-up">
        {row.avatarGroup.map((src, index) => (
          <CustomAvatar key={index} src={src} sx={{ height: 26, width: 26 }} />
        ))}
      </AvatarGroup>
    ),
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => (
      <>
        <LinearProgress
          color="primary"
          value={row.status}
          variant="determinate"
          sx={{ mr: 3, height: 8, width: '100%' }}
        />
        <Typography
          sx={{ color: 'text.secondary' }}
        >{`${row.status}%`}</Typography>
      </>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <OptionsMenu
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          'Details',
          'Archive',
          { divider: true },
          { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } },
        ]}
      />
    ),
  },
];

const projectData = [
  {
    id: 1,
    status: 38,
    leader: 'Eileen',
    name: 'Website SEO',
    date: '10 may 2021',
    avatarColor: 'success',
    avatarGroup: [
      '/images/avatars/1.png',
      '/images/avatars/4.png',
      '/images/avatars/3.png',
      '/images/avatars/2.png',
    ],
  },
  {
    id: 2,
    status: 45,
    leader: 'Owen',
    date: '03 Jan 2021',
    name: 'Social Banners',
    avatar: '/images/icons/project-icons/social-label.png',
    avatarGroup: ['/images/avatars/5.png', '/images/avatars/6.png'],
  },
  {
    id: 3,
    status: 92,
    leader: 'Keith',
    date: '12 Aug 2021',
    name: 'Logo Designs',
    avatar: '/images/icons/project-icons/sketch-label.png',
    avatarGroup: [
      '/images/avatars/2.png',
      '/images/avatars/1.png',
      '/images/avatars/7.png',
      '/images/avatars/8.png',
    ],
  },
  {
    id: 4,
    status: 56,
    leader: 'Merline',
    date: '19 Apr 2021',
    name: 'IOS App Design',
    avatar: '/images/icons/project-icons/sketch-label.png',
    avatarGroup: [
      '/images/avatars/5.png',
      '/images/avatars/3.png',
      '/images/avatars/6.png',
      '/images/avatars/7.png',
    ],
  },
  {
    id: 5,
    status: 25,
    leader: 'Harmonia',
    date: '08 Apr 2021',
    name: 'Figma Dashboards',
    avatar: '/images/icons/project-icons/figma-label.png',
    avatarGroup: [
      '/images/avatars/7.png',
      '/images/avatars/6.png',
      '/images/avatars/8.png',
    ],
  },
  {
    id: 6,
    status: 36,
    leader: 'Allyson',
    date: '29 Sept 2021',
    name: 'Crypto Admin',
    avatar: '/images/icons/project-icons/html-label.png',
    avatarGroup: ['/images/avatars/2.png', '/images/avatars/5.png'],
  },
  {
    id: 7,
    status: 72,
    leader: 'Georgie',
    date: '20 Mar 2021',
    name: 'Create Website',
    avatar: '/images/icons/project-icons/react-label.png',
    avatarGroup: [
      '/images/avatars/3.png',
      '/images/avatars/1.png',
      '/images/avatars/6.png',
    ],
  },
  {
    id: 8,
    status: 89,
    leader: 'Fred',
    date: '09 Feb 2021',
    name: 'App Design',
    avatar: '/images/icons/project-icons/xd-label.png',
    avatarGroup: ['/images/avatars/7.png', '/images/avatars/6.png'],
  },
  {
    id: 9,
    status: 77,
    leader: 'Richardo',
    date: '17 June 2021',
    name: 'Angular APIs',
    avatar: '/images/icons/project-icons/figma-label.png',
    avatarGroup: [
      '/images/avatars/5.png',
      '/images/avatars/8.png',
      '/images/avatars/1.png',
    ],
  },
  {
    id: 10,
    status: 100,
    leader: 'Genevra',
    date: '06 Oct 2021',
    name: 'Admin Template',
    avatar: '/images/icons/project-icons/vue-label.png',
    avatarGroup: [
      '/images/avatars/2.png',
      '/images/avatars/3.png',
      '/images/avatars/4.png',
      '/images/avatars/5.png',
    ],
  },
];
const ProfileTable = () => {
  // ** State
  const [data, setData] = useState(projectData);
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  // useEffect(() => {
  //   axios
  //     .get('/pages/profile-table', { params: { q: value } })
  //     .then((response) => {
  //       setData(response.data);
  //     });
  //   console.log(data);
  // }, [value]);

  const handleFilter = (val) => {
    setValue(val);
  };

  return data ? (
    <Card>
      <CardHeader
        title="Projects"
        action={
          <CustomTextField
            value={value}
            placeholder="Search Project"
            onChange={(e) => handleFilter(e.target.value)}
          />
        }
      />
      <DataGrid
        autoHeight
        pagination
        getRowId={(row) => row.id}
        rows={data}
        rowHeight={60}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 7, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  ) : null;
};

export default ProfileTable;
