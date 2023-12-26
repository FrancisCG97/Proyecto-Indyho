import { useState, forwardRef } from 'react'
import {
  doc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db } from '../../db/firebase-config';

// ** MUI Imports
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
} from '@mui/material';
import { TextField } from '@mui/material';

// ** Custom Component Import
import CustomTextField from '../../@core/components/mui/text-field'

// ** Icon Imports
import Icon from '../../@core/components/icon'

// ** Hooks
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
  // ** States
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
      productName: newName|| name,
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
    const elegido = data.filter(x => x.id == index)
    SetName(elegido[0].productName)
    SetDescription(elegido[0].description)
    SetProvider(elegido[0].provider)
    SetPrice(elegido[0].price)

    console.log(elegido)
    console.log(name)
  }

  return (
    <Card>
      <Button onClick={() => { setShow(true); handleUser() }}> Editar </Button>
      <Dialog
        // fullWidth
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

          <Grid sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>

            <Grid item sm={6} xs={12}>
              <CustomTextField
                label="Editar nombre"
                id="productName"
                value={newName}
                placeholder={name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Grid >

            <Grid item sm={6} xs={12}>
              <CustomTextField
                label="Editar descripción"
                id="description"
                value={newDesc}
                placeholder={description}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <CustomTextField
                label="Editar proveedor"
                id="provider"
                value={newProvider}
                placeholder={provider}
                onChange={(e) => setNewProvider(e.target.value)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <CustomTextField
                label="Editar precio"
                id="price"
                value={newPrice}
                placeholder={price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </Grid>
            {/* probar condicional */}
          </Grid>

          <DialogActions
            sx={{
              justifyContent: 'center',
              px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            }}
          >

            <Button
              onClick={() => updateProduct(index)}
              variant="contained"
              sx={{ mb: 4 }}
            >
              Editar
            </Button>

          </DialogActions>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          }}
        >
          <Button variant="contained" color="error" onClick={() => setShow(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DialogAddAddress;






// import { useState, forwardRef } from 'react'
// import {
//   doc,
//   collection,
//   getDocs,
//   updateDoc,
//   deleteDoc
// } from "firebase/firestore";
// import { db } from '../../db/firebase-config';

// // ** MUI Imports
// import {
//   Box,
//   Grid,
//   Card,
//   Dialog,
//   Button,
//   styled,
//   Typography,
//   Fade,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from '@mui/material';
// import TabPanel from '@mui/lab/TabPanel';
// import TabContext from '@mui/lab/TabContext';
// import { TextField } from '@mui/material';

// // ** Custom Component Import
// import CustomTextField from '../../@core/components/mui/text-field'

// // ** Icon Imports
// import Icon from '../../@core/components/icon'

// // ** Hooks
// import useBgColor from '../../hooks/useBgColor'

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Fade ref={ref} {...props} />
// })

// const CustomCloseButton = styled(IconButton)(({ theme }) => ({
//   top: 0,
//   right: 0,
//   color: 'grey.500',
//   position: 'absolute',
//   boxShadow: theme.shadows[2],
//   transform: 'translate(10px, -10px)',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: `${theme.palette.background.paper} !important`,
//   transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
//   '&:hover': {
//     transform: 'translate(7px, -5px)'
//   }
// }))

// const DialogAddAddress = () => {
//   // ** States
//   const [show, setShow] = useState(false)
//   const [data, setData] = useState([]);
//   const [name, SetName] = useState("");
//   const [description, SetDescription] = useState("");
//   const [price, SetPrice] = useState("");
//   const [provider, SetProvider] = useState("");

//   console.log(name);
//   console.log(description);
//   console.log(price);
//   console.log(provider);

//   const [editMode, setEditMode] = useState(null);
//   const [newName, setNewName] = useState("");
//   const [newDesc, setNewDesc] = useState("");
//   const [newProvider, setNewProvider] = useState("");
//   const [newPrice, setNewPrice] = useState("");

//   // ** Hooks
//   const bgColors = useBgColor()

//   //No toma el objeto editProduct, la función solo anda hasta el console log, solo me falta darle funcionalidad y ver estilos


//   //Actualizar datos
//   const updateProduct = (index) => {
//     console.log("editar");

//     const productRef = doc(db, "new-products", index);

//     updateDoc(productRef, {
//       productName: newName,
//       description: newDesc,
//       provider: newProvider,
//       price: newPrice,
//     })

//       .then(() => {
//         console.log("Producto actualizado!");
//         setEditMode(null);
//       })
//       .catch((error) => {
//         console.error("Se produjo un error al actualizar: ", error);
//       });
//     }

//     return (
//       <Card>
//         <Button onClick={() => {setShow(true); console.log(data)}}> Editar </Button>
//         <Dialog
//           fullWidth
//           open={show}
//           maxWidth='md'
//           scroll='body'
//           onClose={() => setShow(false)}
//           TransitionComponent={Transition}
//           onBackdropClick={() => setShow(false)}
//           sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
//         >
//           <DialogContent
//             sx={{
//               pb: theme => `${theme.spacing(8)} !important`,
//               px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//               pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
//             }}
//           >
//             <CustomCloseButton onClick={() => setShow(false)}>
//               <Icon icon='tabler:x' fontSize='1.25rem' />
//             </CustomCloseButton>
//             <Box sx={{ mb: 8, textAlign: 'center' }}>
//               <Typography variant='h3' sx={{ mb: 3 }}>
//                 Editar producto/servicio
//               </Typography>
//             </Box>
//             <Grid>
//               <TextField
//                 id="productName"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)} />
//               <TextField
//                 id="description"
//                 value={newDesc}
//                 onChange={(e) => setNewDesc(e.target.value)} />
//               <TextField
//                 id="provider"
//                 value={newProvider}
//                 onChange={(e) => setNewProvider(e.target.value)} />
//               <TextField
//                 id="price"
//                 value={newPrice}
//                 onChange={(e) => setNewPrice(e.target.value)} />
//             </Grid>
//             <DialogActions
//               sx={{
//                 justifyContent: 'center',
//                 px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//                 pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
//               }}
//             >
//               <Button
//                 onClick={() => updateProduct} // Asegúrate de pasar el índice correcto
//                 variant="contained"
//                 sx={{ mb: 4 }}
//               >
//                 Editar
//               </Button>
//             </DialogActions>
//           </DialogContent>
//           <DialogActions
//             sx={{
//               justifyContent: 'center',
//               px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//               pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
//             }}
//           >
//             <Button variant="contained" color="error" onClick={() => setShow(false)}>
//               Cancelar
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Card>
//     );
// };

// export default DialogAddAddress;