/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { addNewProduct } from './newProduct';


// ** MUI Imports
import { Box } from '@mui/material';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from '../../@core/components/mui/text-field'

// ** Icon Imports
import Icon from '../../@core/components/icon'

const FormLayoutsIcons = () => {
    const [option, setOption] = useState('product');
    const [charge, setCharge] = useState('charge')
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [provider, setProvider] = useState('');
    const [price, setPrice] = useState(0);


    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleCharge = (event) => {
        setCharge(event.target.value)
    };

    const { addProduct } = addNewProduct();

    const onSubmit = (e) => {
        e.preventDefault()

        addProduct({
            charge: charge === 'encargadoCompras' || 'finanzas' || 'subGerente' || 'gerenteArea' || 'gerenteGeneral',
            itemType: option === 'product' ? 'Producto' : 'Servicio',
            productName,
            description,
            provider,
            price,
        });
    };


    return (
        <Card>
            <CardHeader title='Datos solicitante' />
            <CardContent>

                <form onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={5}>

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                            }}
                        >

                            <Grid
                                sx={{
                                    width: "80%",
                                    mb: "10px",
                                }}
                            >
                                <CustomTextField fullWidth select label='Cargo' id='default' value={charge} onChange={handleCharge}>
                                    <MenuItem value='encargadoCompras'> Encargado de compras </MenuItem>
                                    <MenuItem value='finanzas'> Encargado de finanzas </MenuItem>
                                    <MenuItem value='subGerente'> Sub gerente </MenuItem>
                                    <MenuItem value='gerenteArea'> Gerente compras </MenuItem>
                                    <MenuItem value='gerenteGeneral'> Gerente general </MenuItem>
                                </CustomTextField>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                />

                                <CustomTextField
                                    fullWidth
                                    label='Nombre del solicitante'
                                    placeholder='...'
                                />
                            </Grid>

                        </Box>



                        <CardHeader title='Añadir producto/servicio' />

                        <Box
                            sx={{
                                width: "100%",
                                mb: "20px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                            }}
                        >
                            <Grid
                                sx={{
                                    width: "80%"
                                }}
                            >
                                <CustomTextField fullWidth select label='Seleccionar producto o servicio' id='default' value={option} onChange={handleChange}>
                                    <MenuItem value='product'> Producto </MenuItem>
                                    <MenuItem value='service'> Servicio </MenuItem>
                                </CustomTextField>
                            </Grid>
                        </Box>

                        {option === 'product' && (

                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Nombre del producto'
                                        placeholder='...'
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Descripción del producto'
                                        placeholder='...'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Proveedor'
                                        placeholder='...'
                                        onChange={(e) => setProvider(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        multiline
                                        label='Precio'
                                        placeholder='$'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Grid>
                            </Box>
                        )}



                        {option === 'service' && (

                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Nombre del servicio'
                                        placeholder='...'
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Descripción del servicio'
                                        placeholder='...'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        label='Proveedor'
                                        placeholder='...'
                                        onChange={(e) => setProvider(e.target.value)}
                                    />
                                </Grid>

                                <Grid
                                    sx={{
                                        width: "80%",
                                        mb: "10px",
                                    }}
                                >
                                    <CustomTextField
                                        fullWidth
                                        multiline
                                        label='Precio'
                                        placeholder='$'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Grid>
                            </Box>
                        )}




                        <Grid item xs={12}>

                            <Button
                                // sx={{ ml: "8%" }}
                                onClick={onSubmit} type='button' variant='contained'>
                                Enviar
                            </Button>

                        </Grid>
                    </Grid>

                </form>
            </CardContent>
        </Card >
    )
}

export default FormLayoutsIcons;

