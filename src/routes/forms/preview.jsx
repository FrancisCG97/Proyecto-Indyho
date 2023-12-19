/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { doc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../db/firebase-config';

// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from "@mui/material";


const Preview = () => {

  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newPrice, setNewPrice] = useState("");


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

  const deleteProduct = async (j) => {
    await deleteDoc(collection(db, "new-products"));
  }





  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {data.map((newData, index) => (

        <TabContext key={index.toString()} value={index.toString()}>
          <TabPanel key={index.toString()} value={index.toString()} sx={{ p: 0 }}>

            {editMode === index ? (
              <Grid>
                <TextField
                  id="productName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  id="description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <TextField
                  id="provider"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                />
                <TextField
                  id="price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
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
              onClick={deleteProduct}
            >
              Eliminar producto
            </Button>

          </TabPanel>
        </TabContext>

      ))}

    </Card >
  )
}

export default Preview;