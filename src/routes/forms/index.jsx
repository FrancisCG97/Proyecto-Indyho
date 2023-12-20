import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
 
// ** Icon Imports
import Icon from '../../@core/components/icon';
// ** Custom Component Import
import CustomTextField from '../../@core/components/mui/text-field';
import { addNewProduct } from './newProduct';
import { useNavigate } from 'react-router-dom';
 
const FormLayoutsIcons = () => {
  const [option, setOption] = useState('product');
  const [charge, setCharge] = useState('charge');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
 
  const handleChange = (event) => {
    setOption(event.target.value);
  };
 
  const handleCharge = (event) => {
    setCharge(event.target.value);
  };
 
  const { addProduct } = addNewProduct();
 
  const onSubmit = (e) => {
    e.preventDefault();
 
    addProduct({
      charge:
        charge === 'encargadoCompras' ||
        'finanzas' ||
        'subGerente' ||
        'gerenteArea' ||
        'gerenteGeneral',
      itemType: option === 'product' ? 'Producto' : 'Servicio',
      productName,
      description,
      provider,
      price,
    });
    navigate("/preview");
  };
 
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Card>
        <CardContent>
          <Typography variant="h5" marginBottom={5}>
            Datos solicitante
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                select
                label="Cargo"
                id="default"
                value={charge}
                onChange={handleCharge}
              >
                <MenuItem value="encargadoCompras">
                  Encargado de compras
                </MenuItem>
                <MenuItem value="finanzas">Encargado de finanzas </MenuItem>
                <MenuItem value="subGerente">Sub gerente </MenuItem>
                <MenuItem value="gerenteArea">Gerente compras </MenuItem>
                <MenuItem value="gerenteGeneral">Gerente general </MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Nombre del solicitante"
                placeholder="..."
              />
            </Grid>
          </Grid>
 
          <Typography variant="h5" marginY={5}>
            Añadir producto/servicio
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} marginBottom={5}>
              <CustomTextField
                fullWidth
                select
                label="Seleccionar producto o servicio"
                id="default"
                value={option}
                onChange={handleChange}
              >
                <MenuItem value="product"> Producto </MenuItem>
                <MenuItem value="service"> Servicio </MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>
          {option === 'product' && (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Nombre del producto"
                  placeholder="..."
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Descripción del producto"
                  placeholder="..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
 
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Proveedor"
                  placeholder="..."
                  onChange={(e) => setProvider(e.target.value)}
                />
              </Grid>
 
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  multiline
                  label="Precio"
                  placeholder="$"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
 
          {option === 'service' && (
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Nombre del servicio"
                  placeholder="..."
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Descripción del servicio"
                  placeholder="..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
 
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Proveedor"
                  placeholder="..."
                  onChange={(e) => setProvider(e.target.value)}
                />
              </Grid>
 
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  multiline
                  label="Precio"
                  placeholder="$"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
 
          <Grid marginTop={5} item xs={12}>
            <Button
              onClick={onSubmit}
              type="button"
              variant="contained"
            >
              Enviar
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
 
export default FormLayoutsIcons;