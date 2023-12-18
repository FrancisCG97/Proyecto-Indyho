/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../../db/firebase-config';
// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '../../@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CustomChip from '../../@core/components/mui/chip'
import CustomAvatar from '../../@core/components/mui/avatar'



const Preview = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "new-products");
        const querySnapshot = await getDocs(collectionRef);

        const newData = [];
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          newData.push(documentData);
        });

        setData(newData);
      } catch (error) {
        console.error("Error al recopilar información: ");
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return null;
  }

  const RowOptions = ({ id }) => {
    // ** Hooks
    const dispatch = useDispatch()
  }
    // ** State
    // const [anchorEl, setAnchorEl] = useState(null)
    // const rowOptionsOpen = Boolean(anchorEl)

    // const handleRowOptionsClick = event => {
    //   setAnchorEl(event.currentTarget)
    // }

    // const handleRowOptionsClose = () => {
    //   setAnchorEl(null)
    // }

    // const handleDelete = () => {
    //   dispatch(deleteUser(id))
    //   handleRowOptionsClose()
    // }

    const columns = [
      {
        flex: 0.25,
        minWidth: 280,
        field: 'fullName',
        headerName: 'User',
        renderCell: ({ row }) => {
          const { fullName, email } = row

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {renderClient(row)}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component={Link}
                  href='/apps/user/view/account'
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >

                </Typography>
                <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>

                </Typography>
              </Box>
            </Box>
          )
        }
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
                skin='light'
                sx={{ mr: 4, width: 30, height: 30 }}
                color={userRoleObj[row.role].color || 'primary'}
              >
                <Icon icon={userRoleObj[row.role].icon} />
              </CustomAvatar>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.role}
              </Typography>
            </Box>
          )
        }
      },
      {
        flex: 0.15,
        minWidth: 120,
        headerName: 'Plan',
        field: 'currentPlan',
        renderCell: ({ row }) => {
          return (
            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.currentPlan}
            </Typography>
          )
        }
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
          )
        }
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
              skin='light'
              size='small'
              label={row.status}
              color={userStatusObj[row.status]}
              sx={{ textTransform: 'capitalize' }}
            />
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }) => <RowOptions id={row.id} />
      }
    ]




    // return (

    //   <>
    //     <IconButton size='small' onClick={handleRowOptionsClick}>
    //       <Icon icon='tabler:dots-vertical' />
    //     </IconButton>
    //     <Menu
    //       keepMounted
    //       anchorEl={anchorEl}
    //       open={rowOptionsOpen}
    //       onClose={handleRowOptionsClose}
    //       anchorOrigin={{
    //         vertical: 'bottom',
    //         horizontal: 'right'
    //       }}
    //       transformOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right'
    //       }}
    //       PaperProps={{ style: { minWidth: '8rem' } }}
    //     >
    //       <MenuItem
    //         component={Link}
    //         sx={{ '& svg': { mr: 2 } }}
    //         href='/apps/user/view/account'
    //         onClick={handleRowOptionsClose}
    //       >
    //         <Icon icon='tabler:eye' fontSize={20} />
    //         View
    //       </MenuItem>
    //       <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
    //         <Icon icon='tabler:edit' fontSize={20} />
    //         Edit
    //       </MenuItem>
    //       <MenuItem sx={{ '& svg': { mr: 2 } }}>
    //         <Icon icon='tabler:trash' fontSize={20} />
    //         Delete
    //       </MenuItem>
    //     </Menu>
    //   </>















    // <Card>
    //   {data.map((newData, index) => (
    //      <TabContext key={index.toString()} value={index.toString()}>
    //       <TabPanel key={index.toString()} value={index.toString()} sx={{ p: 0 }}>
    //         <Typography variant='h4' sx={{ mb: 2 }}>
    //           {newData.productName}
    //         </Typography>
    //         <Typography sx={{ mb: 4, color: 'text.secondary' }}>
    //           {newData.description}
    //         </Typography>
    //         <Typography sx={{ mb: 4, color: 'text.secondary' }}>
    //           {newData.provider}
    //         </Typography>
    //         <Typography sx={{ mb: 4, color: 'text.secondary' }}>
    //           {newData.price}
    //         </Typography>
    //         <Button variant='contained' sx={{ mb: 4 }}>Button {index + 1}</Button>
    //       </TabPanel>
    //     </TabContext>
    //   ))}
    // </Card>
    // )
  }

  export default Preview;