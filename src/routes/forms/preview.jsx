/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { doc, collection, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../db/firebase-config';

// ** React Imports
import { useEffect, useState, forwardRef } from 'react';

import { Link } from 'react-router-dom';

import DialogAddAddress from "./dialog";

// ** Actions Imports
// import { deleteUser, fetchData } from 'src/store/apps/user';
// import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer';
import CardStatsHorizontalWithDetails from '@core/components/card-statistics/card-stats-horizontal-with-details';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'

// ** Icon Imports
import Icon from '@core/components/icon';
import CustomAvatar from '@core/components/mui/avatar';

// ** Custom Components Imports
import CustomChip from '@core/components/mui/chip';
import CustomTextField from '@core/components/mui/text-field';

import { getInitials } from '@core/utils/get-initials';

// ** Hooks
import useBgColor from '../../hooks/useBgColor'


const TableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;

  return (
    // Tabla
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
      <Box
        sx={{
          rowGap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Button
          color="secondary"
          variant="tonal"
          startIcon={<Icon icon="tabler:upload" />}
          sx={{ mr: 4 }}
        >
          Export
        </Button>

        <Button
          variant="contained"
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon fontSize="1.125rem" icon="material-symbols:refresh" />
          Limpiar filtros
        </Button>
      </Box>

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
        >
          <Icon fontSize="1.125rem" icon="ion:search" />
        </Button>
      </Box>
    </Box>
  );
};



const Preview = () => {

  const [data, setData] = useState([]);
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [provider, SetProvider] = useState("");

  console.log(name);
  console.log(description);
  console.log(price);
  console.log(provider);

  const [editMode, setEditMode] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // ** renders client column
  const userRoleObj = {
    admin: { icon: 'tabler:device-laptop', color: 'secondary' },
    author: { icon: 'tabler:circle-check', color: 'success' },
    editor: { icon: 'tabler:edit', color: 'info' },
    maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
    subscriber: { icon: 'tabler:user', color: 'warning' },
  };

  // ** renders client column
  const renderClient = (row) => {
    if (row.avatar) {
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
            to="/preview"
            onClick={handleRowOptionsClose}
          >
            <Icon icon="tabler:eye" fontSize={20} />
            Ver más
          </MenuItem>
          <Button variant='contained' onClick={() => setShow(true)}>
            Show
          </Button>
          <MenuItem sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:edit" fontSize={20} />
            Editar
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Eliminar
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
      headerName: 'Producto o servicio',
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
                // component={Link}
                // href="/apps/user/view/account"
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {description}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      field: 'price',
      minWidth: 170,
      headerName: 'Precio',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin="light"
              sx={{ mr: 4, width: 30, height: 30 }}
              color={userRoleObj[row.role] || 'primary'}
            >
              <Icon icon={userRoleObj[row.role]} />
            </CustomAvatar>
            <Typography
              noWrap
              sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
            >
              {price}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      field: 'provider',
      minWidth: 170,
      headerName: 'Proveedor',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin="light"
              sx={{ mr: 4, width: 30, height: 30 }}
              color={userRoleObj[row.role] || 'primary'}
            >
              <Icon icon={userRoleObj[row.role]} />
            </CustomAvatar>
            <Typography
              noWrap
              sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
            >
              {provider}
            </Typography>
          </Box>
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





  const datausers = {
    users: [
      {
        id: 1,
        productName: data.productName,
        price: data.price,
        provider: data.provider,
      },
    ]
  }



  //Agregar datos
  useEffect(() => {

    const fetchData = async () => {

      try {
        const collectionRef = collection(db, "new-products");
        const querySnapshot = await getDocs(collectionRef);

        const newData = [];
        querySnapshot.forEach((doc) => {
          const productData = { id: doc.id, ...doc.data() };
          newData.push(productData);

          SetDescription(productData.description)
          SetName(productData.productName)
          SetPrice(productData.price)
          SetProvider(productData.provider)
        });

        setData(newData);

      } catch (error) {
        console.error("Error al recopilar información: ", error);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return null;
  }


  //Actualizar datos
  function updateProduct(i) {

    const editProduct = data[i];
    const productRef = doc(db, "new-products", editProduct.id);

    updateDoc(productRef, {
      productName: newName,
      description: newDesc,
      provider: newProvider,
      price: newPrice,
    })

      .then(() => {
        console.log("Producto actualizado!");
        setEditMode(null);
      })
      .catch((error) => {
        console.error("Se produjo un error al actualizar: ", error);
      });
  }


  //Eliminar datos
  function deleteProduct(j) {
    const deleteProd = data[j];
    const productRef = doc(db, "new-products", deleteProd.id);

    deleteDoc(productRef)

      .then(() => {
        console.log("Producto eliminado!");
      })
      .catch((error) => {
        console.error("Se produjo un error al eliminar: ", error);
      });
  }


  return (
    <><>
    </><Grid item xs={12}>
        <Card>
          <CardHeader title="Filtrar búsqueda" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Producto/Servicio"
                  SelectProps={{
                    value: "",
                    displayEmpty: true,
                    onChange: (e) => handleRoleChange(e),
                  }}
                >
                  <MenuItem value=""> Seleccionar </MenuItem>
                  <MenuItem value="product"> Producto </MenuItem>
                  <MenuItem value="service"> Servicio </MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Cargo del solicitante"
                  SelectProps={{
                    value: "",
                    displayEmpty: true,
                    onChange: (e) => handlePlanChange(e),
                  }}
                >
                  <MenuItem value=""> Seleccionar </MenuItem>
                  <MenuItem value="encargadoCompras"> Encargado de compras </MenuItem>
                  <MenuItem value="finanzas">Encargado de finanzas </MenuItem>
                  <MenuItem value="subGerente">Sub gerente </MenuItem>
                  <MenuItem value="gerenteArea">Gerente compras </MenuItem>
                  <MenuItem value="gerenteGeneral">Gerente general </MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={datausers.users}
            getRowId={(row) => row.id}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]} />
        </Card>
        <Card>
          <Grid item xs={12} md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            {data.map((newData, index) => (

              <TabContext key={index.toString()} value={index.toString()}>
                <TabPanel key={index.toString()} value={index.toString()} sx={{ p: 0 }}>

                  {editMode === index ? (
                    <Grid>
                      <TextField
                        id="productName"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)} />
                      <TextField
                        id="description"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)} />
                      <TextField
                        id="provider"
                        value={newProvider}
                        onChange={(e) => setNewProvider(e.target.value)} />
                      <TextField
                        id="price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)} />
                    </Grid>

                  ) : (

                    <Grid>
                      <Typography>{newData.productName}</Typography>
                      <Typography>{newData.description}</Typography>
                      <Typography sx={{ mb: 4, color: "text.secondary" }}>{newData.provider}</Typography>
                      <Typography sx={{ mb: 4, color: "text.secondary" }}>{newData.price}</Typography>
                    </Grid>
                  )}

                  <Button
                    variant="contained"
                    sx={{ mb: 4 }}
                    onClick={() => {
                      if (editMode === index) {
                        updateProduct(index);
                      } else {
                        setEditMode(index);
                        setNewName(newData.productName);
                        setNewDesc(newData.description);
                        setNewProvider(newData.provider);
                        setNewPrice(newData.price);
                      }
                    }}
                  >

                    {editMode === index ? "Guardar" : "Editar"}

                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mb: 4 }}
                    onClick={() => deleteProduct(index)}
                  >
                    Eliminar producto
                  </Button>

                </TabPanel>
              </TabContext>

            ))}
          </Grid>

        </Card>
      </Grid>
    </>
  )
}


export default Preview;