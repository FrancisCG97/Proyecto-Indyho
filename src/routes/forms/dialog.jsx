import { useState, forwardRef } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../db/firebase-config';

import {
  Box,
  Grid,
  Card,
  Dialog,
  Button,
  styled,
  Typography,
  Fade,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
} from '@mui/material';

import CustomTextField from '../../@core/components/mui/text-field'

import Icon from '../../@core/components/icon'

import useBgColor from '../../hooks/useBgColor'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const DialogAddAddress = ({ data, index }) => {
  const [show, setShow] = useState(false)
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [provider, SetProvider] = useState("");

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // ** Hooks
  const bgColors = useBgColor()

  //Actualizar datos
  const updateProduct = (index) => {
    console.log("editar");
    console.log(data)

    const productRef = doc(db, "new-products", index);

    updateDoc(productRef, {
      productName: newName || name,
      description: newDesc || description,
      provider: newProvider || provider,
      price: newPrice || price,
    })
      .then(() => {
        console.log("Producto actualizado!");
        setShow(false)
      })
      .catch((error) => {
        console.error("Se produjo un error al actualizar: ", error);
      });
  }

  const handleUser = () => {
    const choosenProd = data.filter(x => x.id == index)
    SetName(choosenProd[0].productName)
    SetDescription(choosenProd[0].description)
    SetProvider(choosenProd[0].provider)
    SetPrice(choosenProd[0].price)

    console.log(choosenProd)
    console.log(name)
  }

  return (
    <Card sx={{ boxShadow: "none" }}>
      <MenuItem
        sx={{
          '& svg': { mr: 2 },
          width: "88%",
          m: "0px 8px",
          display: "flex",
          justifyContent: "space-between"
        }}
        onClick={() => { setShow(true); handleUser() }}
      >
        <Grid sx={{ mr: "-20px" }}>
          <Icon icon="tabler:edit" fontSize={20} />
        </Grid>
        <Grid sx={{ mr: "10px" }}>
          Editar
        </Grid>
      </MenuItem>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Editar producto/servicio
            </Typography>
          </Box>
          <Grid container spacing={6} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextField
                fullWidth
                label="Editar nombre"
                id="productName"
                value={newName}
                placeholder={name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextField
                fullWidth
                label="Editar descripción"
                id="description"
                value={newDesc}
                placeholder={description}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextField
                fullWidth
                label="Editar proveedor"
                id="provider"
                value={newProvider}
                placeholder={provider}
                onChange={(e) => setNewProvider(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextField
                fullWidth
                label="Editar precio"
                id="price"
                value={newPrice}
                placeholder={price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
            <Grid item md={6} xs={12}>
              <DialogActions
                sx={{ px: "0" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setShow(false)}
                >
                  Cancelar
                </Button>
              </DialogActions>
            </Grid>

            <Grid item md={6} xs={12}
            >
              <DialogActions
                sx={{ px: "5" }}
              >
                <Button
                  onClick={() => updateProduct(index)}
                  variant="contained"
                >
                  Editar
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DialogAddAddress;