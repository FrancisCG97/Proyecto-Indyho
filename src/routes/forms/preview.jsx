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
import { useNavigate } from "react-router-dom";


const TableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;

  const navigate = useNavigate();

  const addProd = () => {
    navigate("/form");
  }

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
          variant="contained"
          onClick={addProd}
        >
          <Icon fontSize="1.125rem" icon="ic:baseline-add" />
          Añadir producto
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
          {getInitials(row.productName ? row.productName : "")}
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
          <MenuItem sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:edit" fontSize={20} />
            <DialogAddAddress data={data} index={id} />
          </MenuItem>
          <MenuItem onClick={(e) => deleteProduct(e.target.value)} sx={{ '& svg': { mr: 2 } }}>
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
      width: "fit-content",
      field: 'product or service',
      headerName: 'Producto o servicio',
      display: "flex",
      justifyContent: "center",
      renderCell: ({ row }) => {

        const { productName } = row;

        return (
          <Box fullWidth sx={{ display: 'flex' }}>
            <Box fullWidth sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              {renderClient(row)}
              <Box sx={{ width: "100%", display: 'flex', flexDirection: "column" }}>
                {datausers.users.map((index) => (
                  <TabContext key={index.toString()} value={index.toString()}>
                    <TabPanel key={index.toString()} value={index.toString()} >
                      {editMode === index ? (
                        <>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              textDecoration: 'none',
                              color: 'text.secondary',
                              '&:hover': { color: 'primary.main' },
                            }}
                          >
                            {productName}
                          </Typography>
                        </>
                      ) : (
                        <Grid sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography sx={{ mr: "10px" }}>{productName}</Typography>
                        </Grid>
                      )}
                    </TabPanel>
                  </TabContext>
                ))}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      width: "fit-content",
      field: 'description',
      headerName: 'Descripción',
      renderCell: ({ row }) => {

        const { description } = row;

        return (
          <Box fullWidth sx={{ display: 'flex' }}>
            <Box fullWidth sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", display: 'flex', flexDirection: "column" }}>
                {datausers.users.map((index) => (
                  <TabContext key={index.toString()} value={index.toString()}>
                    <TabPanel key={index.toString()} value={index.toString()} >
                      {editMode === index ? (
                        <>
                          <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                            {description}
                          </Typography>
                        </>
                      ) : (
                        <Grid sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography sx={{ mr: "10px" }}>{description}</Typography>
                        </Grid>
                      )}
                    </TabPanel>
                  </TabContext>
                ))}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      width: "fit-content",
      field: 'Price',
      headerName: 'Precio',
      display: "flex",
      justifyContent: "center",
      renderCell: ({ row }) => {

        const { price } = row;

        return (
          <Box fullWidth sx={{ display: 'flex' }}>
            <Box fullWidth sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", display: 'flex', flexDirection: "column" }}>
                {datausers.users.map((index) => (
                  <TabContext key={index.toString()} value={index.toString()}>
                    <TabPanel key={index.toString()} value={index.toString()} >
                      {editMode === index ? (
                        <>
                          <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                            {price}
                          </Typography>
                        </>
                      ) : (
                        <Grid sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography sx={{ mb: 4, mr: "10px", color: "text.secondary" }}>{price}</Typography>
                        </Grid>
                      )}
                    </TabPanel>
                  </TabContext>
                ))}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      width: "fit-content",
      field: 'provider',
      headerName: 'Proveedor',
      display: "flex",
      justifyContent: "center",
      renderCell: ({ row }) => {

        const { provider } = row;

        return (
          <Box fullWidth sx={{ display: 'flex' }}>
            <Box fullWidth sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", display: 'flex', flexDirection: "column" }}>
                {datausers.users.map((index) => (
                  <TabContext key={index.toString()} value={index.toString()}>
                    <TabPanel key={index.toString()} value={index.toString()} >
                      {editMode === index ? (
                        <>
                          <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                            {provider}
                          </Typography>
                        </>
                      ) : (
                        <Grid sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography sx={{ mb: 4, mr: "10px", color: "text.secondary" }}>{provider}</Typography>
                        </Grid>
                      )}
                    </TabPanel>
                  </TabContext>
                ))}
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      renderCell: ({ row }) => <RowOptions id={row.id} />,
    },
  ]

  const datausers = {
    users: [
      {
        id: 1,
        productName: data.productName,
        description: data.description,
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
            rows={data}
            getRowId={(row) => row.id}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]} />

        </Card>
      </Grid>
    </>

  )
}


export default Preview;