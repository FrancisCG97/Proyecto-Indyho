// ** React Imports
import { useCallback, useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';

// ** Custom Table Components Imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

// ** Store Imports
// import { useDispatch, useSelector } from 'react-redux';

// ** Next Imports
import { Link } from 'react-router-dom';

// ** Actions Imports
// import { deleteUser, fetchData } from 'src/store/apps/user';
// import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer';
import CardStatsHorizontalWithDetails from '@core/components/card-statistics/card-stats-horizontal-with-details';

// ** Icon Imports
import Icon from '@core/components/icon';
import CustomAvatar from '@core/components/mui/avatar';

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip';
import CustomTextField from '@core/components/mui/text-field';

// ** Utils Import
import { getInitials } from '@core/utils/get-initials';

const TableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Button
        color="secondary"
        variant="tonal"
        startIcon={<Icon icon="tabler:upload" />}
      >
        Export
      </Button>
      <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder="Search User"
          onChange={(e) => handleFilter(e.target.value)}
        />

        <Button
          onClick={toggle}
          variant="contained"
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add New User
        </Button>
      </Box>
    </Box>
  );
};

// ** renders client column
const userRoleObj = {
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  author: { icon: 'tabler:circle-check', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'info' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
  subscriber: { icon: 'tabler:user', color: 'warning' },
};

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary',
};

// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return (
      <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({ id }) => {
  // ** Hooks
  //   const dispatch = useDispatch();

  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // dispatch(deleteUser(id));
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          to="/apps/user/view/account"
          onClick={handleRowOptionsClose}
        >
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }) => {
      const { fullName, email } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              noWrap
              component={Link}
              href="/apps/user/view/account"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {fullName}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 170,
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin="light"
            sx={{ mr: 4, width: 30, height: 30 }}
            color={userRoleObj[row.role].color || 'primary'}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </CustomAvatar>
          <Typography
            noWrap
            sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
          >
            {row.role}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Plan',
    field: 'currentPlan',
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
            textTransform: 'capitalize',
          }}
        >
          {row.currentPlan}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'billing',
    headerName: 'Billing',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.billing}
        </Typography>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />,
  },
];

const cardStatsData = {
  statsSquare: [
    {
      stats: '97.8k',
      title: 'Orders',
      avatarColor: 'error',
      icon: 'tabler:briefcase',
    },
    {
      stats: '3.4k',
      title: 'Review',
      avatarColor: 'success',
      icon: 'tabler:message-dots',
    },
  ],
  statsHorizontal: [
    {
      stats: '86%',
      icon: 'tabler:cpu',
      title: 'CPU Usage',
    },
    {
      stats: '1.24gb',
      icon: 'tabler:server',
      title: 'Memory Usage',
      avatarColor: 'success',
    },
    {
      stats: '0.2%',
      avatarColor: 'error',
      title: 'Downtime Ratio',
      icon: 'tabler:chart-pie-2',
    },
    {
      stats: '128',
      title: 'Issues Found',
      avatarColor: 'warning',
      icon: 'tabler:alert-octagon',
    },
  ],
  statsVertical: [
    {
      stats: '1.28k',
      chipColor: 'error',
      chipText: '-12.2%',
      avatarColor: 'error',
      title: 'Total Profit',
      subtitle: 'Last week',
      avatarIcon: 'tabler:credit-card',
    },
    {
      stats: '24.67k',
      chipText: '+25.7%',
      title: 'Total Sales',
      chipColor: 'success',
      subtitle: 'Last week',
      avatarColor: 'success',
      avatarIcon: 'tabler:credit-card',
    },
  ],
  statsWithAreaChart: [
    {
      stats: '92.6k',
      avatarIcon: 'tabler:users',
      title: 'Subscribers Gained',
      chartSeries: [{ data: [40, 4, 58, 12, 35, 10, 84] }],
    },
    {
      stats: '36.5%',
      chartColor: 'error',
      avatarColor: 'error',
      title: 'Quarterly Sales',
      avatarIcon: 'tabler:shopping-cart',
      chartSeries: [{ data: [44, 75, 24, 57, 6, 84] }],
    },
    {
      stats: '97.5k',
      chartColor: 'warning',
      avatarColor: 'warning',
      title: 'Orders Received',
      avatarIcon: 'tabler:package',
      chartSeries: [{ data: [30, 84, 11, 76, 0, 49, 9] }],
    },
    {
      stats: '91.8k',
      chartColor: 'success',
      avatarColor: 'success',
      title: 'Revenue Generated',
      avatarIcon: 'tabler:credit-card',
      chartSeries: [{ data: [6, 35, 25, 61, 32, 84, 70] }],
    },
  ],
  statsHorizontalWithDetails: [
    {
      stats: '21,459',
      title: 'Session',
      trendDiff: '+29',
      icon: 'tabler:user',
      subtitle: 'Total Users',
    },
    {
      stats: '4,567',
      trendDiff: '+18',
      title: 'Paid Users',
      avatarColor: 'error',
      icon: 'tabler:user-plus',
      subtitle: 'Last week analytics',
    },
    {
      stats: '19,860',
      trendDiff: '-14',
      trend: 'negative',
      title: 'Active Users',
      avatarColor: 'success',
      icon: 'tabler:user-check',
      subtitle: 'Last week analytics',
    },
    {
      stats: '237',
      trendDiff: '+42',
      title: 'Pending Users',
      avatarColor: 'warning',
      icon: 'tabler:user-exclamation',
      subtitle: 'Last week analytics',
    },
  ],
};

const datacards = [
  {
    stats: '21,459',
    title: 'Session',
    trendDiff: '+29',
    icon: 'tabler:user',
    subtitle: 'Total Users',
  },
  {
    stats: '4,567',
    trendDiff: '+18',
    title: 'Paid Users',
    avatarColor: 'error',
    icon: 'tabler:user-plus',
    subtitle: 'Last week analytics',
  },
  {
    stats: '19,860',
    trendDiff: '-14',
    trend: 'negative',
    title: 'Active Users',
    avatarColor: 'success',
    icon: 'tabler:user-check',
    subtitle: 'Last week analytics',
  },
  {
    stats: '237',
    trendDiff: '+42',
    title: 'Pending Users',
    avatarColor: 'warning',
    icon: 'tabler:user-exclamation',
    subtitle: 'Last week analytics',
  },
];

const datausers = {
  users: [
    {
      id: 1,
      billing: 'Auto Debit',
      fullName: 'Galen Slixby',
      company: 'Yotz PVT LTD',
      role: 'editor',
      username: 'gslixby0',
      country: 'El Salvador',
      contact: '(479) 232-9151',
      email: 'gslixby0@abc.net.au',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '',
      avatarColor: 'primary',
    },
    {
      id: 2,
      billing: 'Manual - Paypal',
      fullName: 'Halsey Redmore',
      company: 'Skinder PVT LTD',
      role: 'author',
      username: 'hredmore1',
      country: 'Albania',
      contact: '(472) 607-9137',
      email: 'hredmore1@imgur.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png',
    },
    {
      id: 3,
      billing: 'Manual - Cash',
      fullName: 'Marjory Sicely',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'msicely2',
      country: 'Russia',
      contact: '(321) 264-4599',
      email: 'msicely2@who.int',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 4,
      billing: 'Auto Debit',
      fullName: 'Cyrill Risby',
      company: 'Oozz PVT LTD',
      role: 'maintainer',
      username: 'crisby3',
      country: 'China',
      contact: '(923) 690-6806',
      email: 'crisby3@wordpress.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '/images/avatars/3.png',
    },
    {
      id: 5,
      billing: 'Auto Debit',
      fullName: 'Maggy Hurran',
      company: 'Aimbo PVT LTD',
      role: 'subscriber',
      username: 'mhurran4',
      country: 'Pakistan',
      contact: '(669) 914-1078',
      email: 'mhurran4@yahoo.co.jp',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 6,
      billing: 'Manual - Cash',
      fullName: 'Silvain Halstead',
      company: 'Jaxbean PVT LTD',
      role: 'author',
      username: 'shalstead5',
      country: 'China',
      contact: '(958) 973-3093',
      email: 'shalstead5@shinystat.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '',
      avatarColor: 'error',
    },
    {
      id: 7,
      billing: 'Manual - Paypal',
      fullName: 'Breena Gallemore',
      company: 'Jazzy PVT LTD',
      role: 'subscriber',
      username: 'bgallemore6',
      country: 'Canada',
      contact: '(825) 977-8152',
      email: 'bgallemore6@boston.com',
      currentPlan: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'warning',
    },
    {
      id: 8,
      billing: 'Auto Debit',
      fullName: 'Kathryne Liger',
      company: 'Pixoboo PVT LTD',
      role: 'author',
      username: 'kliger7',
      country: 'France',
      contact: '(187) 440-0934',
      email: 'kliger7@vinaora.com',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '/images/avatars/4.png',
    },
    {
      id: 9,
      billing: 'Manual - Credit Card',
      fullName: 'Franz Scotfurth',
      company: 'Tekfly PVT LTD',
      role: 'subscriber',
      username: 'fscotfurth8',
      country: 'China',
      contact: '(978) 146-5443',
      email: 'fscotfurth8@dailymotion.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png',
    },
    {
      id: 10,
      billing: 'Manual - Credit Card',
      fullName: 'Jillene Bellany',
      company: 'Gigashots PVT LTD',
      role: 'maintainer',
      username: 'jbellany9',
      country: 'Jamaica',
      contact: '(589) 284-6732',
      email: 'jbellany9@kickstarter.com',
      currentPlan: 'company',
      status: 'inactive',
      avatar: '/images/avatars/5.png',
    },
    {
      id: 11,
      billing: 'Auto Debit',
      fullName: 'Jonah Wharlton',
      company: 'Eare PVT LTD',
      role: 'subscriber',
      username: 'jwharltona',
      country: 'United States',
      contact: '(176) 532-6824',
      email: 'jwharltona@oakley.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '/images/avatars/4.png',
    },
    {
      id: 12,
      billing: 'Auto Debit',
      fullName: 'Seth Hallam',
      company: 'Yakitri PVT LTD',
      role: 'subscriber',
      username: 'shallamb',
      country: 'Peru',
      contact: '(234) 464-0600',
      email: 'shallamb@hugedomains.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/5.png',
    },
    {
      id: 13,
      billing: 'Manual - Cash',
      fullName: 'Yoko Pottie',
      company: 'Leenti PVT LTD',
      role: 'subscriber',
      username: 'ypottiec',
      country: 'Philippines',
      contact: '(907) 284-5083',
      email: 'ypottiec@privacy.gov.au',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/7.png',
    },
    {
      id: 14,
      billing: 'Manual - Paypal',
      fullName: 'Maximilianus Krause',
      company: 'Digitube PVT LTD',
      role: 'author',
      username: 'mkraused',
      country: 'Democratic Republic of the Congo',
      contact: '(167) 135-7392',
      email: 'mkraused@stanford.edu',
      currentPlan: 'team',
      status: 'active',
      avatar: '/images/avatars/6.png',
    },
    {
      id: 15,
      billing: 'Manual - Credit Card',
      fullName: 'Zsazsa McCleverty',
      company: 'Kaymbo PVT LTD',
      role: 'maintainer',
      username: 'zmcclevertye',
      country: 'France',
      contact: '(317) 409-6565',
      email: 'zmcclevertye@soundcloud.com',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/2.png',
    },
    {
      id: 16,
      billing: 'Auto Debit',
      fullName: 'Bentlee Emblin',
      company: 'Yambee PVT LTD',
      role: 'author',
      username: 'bemblinf',
      country: 'Spain',
      contact: '(590) 606-1056',
      email: 'bemblinf@wired.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '/images/avatars/6.png',
    },
    {
      id: 17,
      billing: 'Manual - Paypal',
      fullName: 'Brockie Myles',
      company: 'Wikivu PVT LTD',
      role: 'maintainer',
      username: 'bmylesg',
      country: 'Poland',
      contact: '(553) 225-9905',
      email: 'bmylesg@amazon.com',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'success',
    },
    {
      id: 18,
      billing: 'Auto Debit',
      fullName: 'Bertha Biner',
      company: 'Twinte PVT LTD',
      role: 'editor',
      username: 'bbinerh',
      country: 'Yemen',
      contact: '(901) 916-9287',
      email: 'bbinerh@mozilla.com',
      currentPlan: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png',
    },
    {
      id: 19,
      billing: 'Auto Debit',
      fullName: 'Travus Bruntjen',
      company: 'Cogidoo PVT LTD',
      role: 'admin',
      username: 'tbruntjeni',
      country: 'France',
      contact: '(524) 586-6057',
      email: 'tbruntjeni@sitemeter.com',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '',
      avatarColor: 'primary',
    },
    {
      id: 20,
      billing: 'Auto Debit',
      fullName: 'Wesley Burland',
      company: 'Bubblemix PVT LTD',
      role: 'editor',
      username: 'wburlandj',
      country: 'Honduras',
      contact: '(569) 683-1292',
      email: 'wburlandj@uiuc.edu',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '/images/avatars/6.png',
    },
    {
      id: 21,
      billing: 'Manual - Cash',
      fullName: 'Selina Kyle',
      company: 'Wayne Enterprises',
      role: 'admin',
      username: 'catwomen1940',
      country: 'USA',
      contact: '(829) 537-0057',
      email: 'irena.dubrovna@wayne.com',
      currentPlan: 'team',
      status: 'active',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 22,
      billing: 'Manual - Cash',
      fullName: 'Jameson Lyster',
      company: 'Quaxo PVT LTD',
      role: 'editor',
      username: 'jlysterl',
      country: 'Ukraine',
      contact: '(593) 624-0222',
      email: 'jlysterl@guardian.co.uk',
      currentPlan: 'company',
      status: 'inactive',
      avatar: '/images/avatars/8.png',
    },
    {
      id: 23,
      billing: 'Manual - Paypal',
      fullName: 'Kare Skitterel',
      company: 'Ainyx PVT LTD',
      role: 'maintainer',
      username: 'kskitterelm',
      country: 'Poland',
      contact: '(254) 845-4107',
      email: 'kskitterelm@ainyx.com',
      currentPlan: 'basic',
      status: 'pending',
      avatar: '/images/avatars/3.png',
    },
    {
      id: 24,
      billing: 'Auto Debit',
      fullName: 'Cleavland Hatherleigh',
      company: 'Flipopia PVT LTD',
      role: 'admin',
      username: 'chatherleighn',
      country: 'Brazil',
      contact: '(700) 783-7498',
      email: 'chatherleighn@washington.edu',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/2.png',
    },
    {
      id: 25,
      billing: 'Manual - Paypal',
      fullName: 'Adeline Micco',
      company: 'Topicware PVT LTD',
      role: 'admin',
      username: 'amiccoo',
      country: 'France',
      contact: '(227) 598-1841',
      email: 'amiccoo@whitehouse.gov',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'error',
    },
    {
      id: 26,
      billing: 'Manual - Credit Card',
      fullName: 'Hugh Hasson',
      company: 'Skinix PVT LTD',
      role: 'admin',
      username: 'hhassonp',
      country: 'China',
      contact: '(582) 516-1324',
      email: 'hhassonp@bizjournals.com',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/4.png',
    },
    {
      id: 27,
      billing: 'Manual - Cash',
      fullName: 'Germain Jacombs',
      company: 'Youopia PVT LTD',
      role: 'editor',
      username: 'gjacombsq',
      country: 'Zambia',
      contact: '(137) 467-5393',
      email: 'gjacombsq@jigsy.com',
      currentPlan: 'enterprise',
      status: 'active',
      avatar: '/images/avatars/5.png',
    },
    {
      id: 28,
      billing: 'Manual - Cash',
      fullName: 'Bree Kilday',
      company: 'Jetpulse PVT LTD',
      role: 'maintainer',
      username: 'bkildayr',
      country: 'Portugal',
      contact: '(412) 476-0854',
      email: 'bkildayr@mashable.com',
      currentPlan: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'warning',
    },
    {
      id: 29,
      billing: 'Auto Debit',
      fullName: 'Candice Pinyon',
      company: 'Kare PVT LTD',
      role: 'maintainer',
      username: 'cpinyons',
      country: 'Sweden',
      contact: '(170) 683-1520',
      email: 'cpinyons@behance.net',
      currentPlan: 'team',
      status: 'active',
      avatar: '/images/avatars/7.png',
    },
    {
      id: 30,
      billing: 'Manual - Cash',
      fullName: 'Isabel Mallindine',
      company: 'Voomm PVT LTD',
      role: 'subscriber',
      username: 'imallindinet',
      country: 'Slovenia',
      contact: '(332) 803-1983',
      email: 'imallindinet@shinystat.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info',
    },
    {
      id: 31,
      billing: 'Auto Debit',
      fullName: 'Gwendolyn Meineken',
      company: 'Oyondu PVT LTD',
      role: 'admin',
      username: 'gmeinekenu',
      country: 'Moldova',
      contact: '(551) 379-7460',
      email: 'gmeinekenu@hc360.com',
      currentPlan: 'basic',
      status: 'pending',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 32,
      billing: 'Manual - Paypal',
      fullName: 'Rafaellle Snowball',
      company: 'Fivespan PVT LTD',
      role: 'editor',
      username: 'rsnowballv',
      country: 'Philippines',
      contact: '(974) 829-0911',
      email: 'rsnowballv@indiegogo.com',
      currentPlan: 'basic',
      status: 'pending',
      avatar: '/images/avatars/5.png',
    },
    {
      id: 33,
      billing: 'Manual - Credit Card',
      fullName: 'Rochette Emer',
      company: 'Thoughtworks PVT LTD',
      role: 'admin',
      username: 'remerw',
      country: 'North Korea',
      contact: '(841) 889-3339',
      email: 'remerw@blogtalkradio.com',
      currentPlan: 'basic',
      status: 'active',
      avatar: '/images/avatars/8.png',
    },
    {
      id: 34,
      billing: 'Manual - Cash',
      fullName: 'Ophelie Fibbens',
      company: 'Jaxbean PVT LTD',
      role: 'subscriber',
      username: 'ofibbensx',
      country: 'Indonesia',
      contact: '(764) 885-7351',
      email: 'ofibbensx@booking.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '/images/avatars/4.png',
    },
    {
      id: 35,
      billing: 'Manual - Paypal',
      fullName: 'Stephen MacGilfoyle',
      company: 'Browseblab PVT LTD',
      role: 'maintainer',
      username: 'smacgilfoyley',
      country: 'Japan',
      contact: '(350) 589-8520',
      email: 'smacgilfoyley@bigcartel.com',
      currentPlan: 'company',
      status: 'pending',
      avatar: '',
      avatarColor: 'error',
    },
    {
      id: 36,
      billing: 'Auto Debit',
      fullName: 'Bradan Rosebotham',
      company: 'Agivu PVT LTD',
      role: 'subscriber',
      username: 'brosebothamz',
      country: 'Belarus',
      contact: '(882) 933-2180',
      email: 'brosebothamz@tripadvisor.com',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'success',
    },
    {
      id: 37,
      billing: 'Manual - Cash',
      fullName: 'Skip Hebblethwaite',
      company: 'Katz PVT LTD',
      role: 'admin',
      username: 'shebblethwaite10',
      country: 'Canada',
      contact: '(610) 343-1024',
      email: 'shebblethwaite10@arizona.edu',
      currentPlan: 'company',
      status: 'inactive',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 38,
      billing: 'Auto Debit',
      fullName: 'Moritz Piccard',
      company: 'Twitternation PVT LTD',
      role: 'maintainer',
      username: 'mpiccard11',
      country: 'Croatia',
      contact: '(365) 277-2986',
      email: 'mpiccard11@vimeo.com',
      currentPlan: 'enterprise',
      status: 'inactive',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 39,
      billing: 'Manual - Paypal',
      fullName: 'Tyne Widmore',
      company: 'Yombu PVT LTD',
      role: 'subscriber',
      username: 'twidmore12',
      country: 'Finland',
      contact: '(531) 731-0928',
      email: 'twidmore12@bravesites.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary',
    },
    {
      id: 40,
      billing: 'Auto Debit',
      fullName: 'Florenza Desporte',
      company: 'Kamba PVT LTD',
      role: 'author',
      username: 'fdesporte13',
      country: 'Ukraine',
      contact: '(312) 104-2638',
      email: 'fdesporte13@omniture.com',
      currentPlan: 'company',
      status: 'active',
      avatar: '/images/avatars/6.png',
    },
    {
      id: 41,
      billing: 'Auto Debit',
      fullName: 'Edwina Baldetti',
      company: 'Dazzlesphere PVT LTD',
      role: 'maintainer',
      username: 'ebaldetti14',
      country: 'Haiti',
      contact: '(315) 329-3578',
      email: 'ebaldetti14@theguardian.com',
      currentPlan: 'team',
      status: 'pending',
      avatar: '',
      avatarColor: 'info',
    },
    {
      id: 42,
      billing: 'Manual - Credit Card',
      fullName: 'Benedetto Rossiter',
      company: 'Mybuzz PVT LTD',
      role: 'editor',
      username: 'brossiter15',
      country: 'Indonesia',
      contact: '(323) 175-6741',
      email: 'brossiter15@craigslist.org',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning',
    },
    {
      id: 43,
      billing: 'Auto Debit',
      fullName: 'Micaela McNirlan',
      company: 'Tambee PVT LTD',
      role: 'admin',
      username: 'mmcnirlan16',
      country: 'Indonesia',
      contact: '(242) 952-0916',
      email: 'mmcnirlan16@hc360.com',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: '',
      avatarColor: 'error',
    },
    {
      id: 44,
      billing: 'Manual - Paypal',
      fullName: 'Vladamir Koschek',
      company: 'Centimia PVT LTD',
      role: 'author',
      username: 'vkoschek17',
      country: 'Guatemala',
      contact: '(531) 758-8335',
      email: 'vkoschek17@abc.net.au',
      currentPlan: 'team',
      status: 'active',
      avatar: '',
      avatarColor: 'success',
    },
    {
      id: 45,
      billing: 'Manual - Cash',
      fullName: 'Corrie Perot',
      company: 'Flipopia PVT LTD',
      role: 'subscriber',
      username: 'cperot18',
      country: 'China',
      contact: '(659) 385-6808',
      email: 'cperot18@goo.ne.jp',
      currentPlan: 'team',
      status: 'pending',
      avatar: '/images/avatars/3.png',
    },
    {
      id: 46,
      billing: 'Manual - Credit Card',
      fullName: 'Saunder Offner',
      company: 'Skalith PVT LTD',
      role: 'maintainer',
      username: 'soffner19',
      country: 'Poland',
      contact: '(200) 586-2264',
      email: 'soffner19@mac.com',
      currentPlan: 'enterprise',
      status: 'pending',
      avatar: '',
      avatarColor: 'primary',
    },
    {
      id: 47,
      billing: 'Auto Debit',
      fullName: 'Karena Courtliff',
      company: 'Feedfire PVT LTD',
      role: 'admin',
      username: 'kcourtliff1a',
      country: 'China',
      contact: '(478) 199-0020',
      email: 'kcourtliff1a@bbc.co.uk',
      currentPlan: 'basic',
      status: 'active',
      avatar: '/images/avatars/1.png',
    },
    {
      id: 48,
      billing: 'Auto Debit',
      fullName: 'Onfre Wind',
      company: 'Thoughtmix PVT LTD',
      role: 'admin',
      username: 'owind1b',
      country: 'Ukraine',
      contact: '(344) 262-7270',
      email: 'owind1b@yandex.ru',
      currentPlan: 'basic',
      status: 'pending',
      avatar: '',
      avatarColor: 'error',
    },
    {
      id: 49,
      billing: 'Auto Debit',
      fullName: 'Paulie Durber',
      company: 'Babbleblab PVT LTD',
      role: 'subscriber',
      username: 'pdurber1c',
      country: 'Sweden',
      contact: '(694) 676-1275',
      email: 'pdurber1c@gov.uk',
      currentPlan: 'team',
      status: 'inactive',
      avatar: '',
      avatarColor: 'warning',
    },
    {
      id: 50,
      billing: 'Manual - Cash',
      fullName: 'Beverlie Krabbe',
      company: 'Kaymbo PVT LTD',
      role: 'editor',
      username: 'bkrabbe1d',
      country: 'China',
      contact: '(397) 294-5153',
      email: 'bkrabbe1d@home.pl',
      currentPlan: 'company',
      status: 'active',
      avatar: '/images/avatars/2.png',
    },
  ],
};

export const UserList = () => {
  // ** State
  const [role, setRole] = useState('');
  const [plan, setPlan] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // ** Hooks
  //   const dispatch = useDispatch();
  //   const store = useSelector((state) => state.user);
  //   useEffect(() => {
  //     dispatch(
  //       fetchData({
  //         role,
  //         status,
  //         q: value,
  //         currentPlan: plan,
  //       }),
  //     );
  //   }, [dispatch, plan, role, status, value]);

  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handlePlanChange = useCallback((e) => {
    setPlan(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {datacards && (
          <Grid container spacing={6}>
            {datacards.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Search Filters" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Role"
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: (e) => handleRoleChange(e),
                  }}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="maintainer">Maintainer</MenuItem>
                  <MenuItem value="subscriber">Subscriber</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Plan"
                  SelectProps={{
                    value: plan,
                    displayEmpty: true,
                    onChange: (e) => handlePlanChange(e),
                  }}
                >
                  <MenuItem value="">Select Plan</MenuItem>
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                  <MenuItem value="team">Team</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Select Status"
                  SelectProps={{
                    value: status,
                    displayEmpty: true,
                    onChange: (e) => handleStatusChange(e),
                  }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={datausers.users}
            getRowId={(row) => row.id}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  );
};

export default UserList;