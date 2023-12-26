/* eslint-disable no-undef */
import { doc, collection, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../db/firebase-config';
import { useEffect, useState, forwardRef } from 'react';


//Actualizar datos
function updateProduct(index, data, newName, newDesc, newProvider, newPrice, setEditMode) {

    const editProduct = data[index];
    const productRef = doc(db, "new-products", editProduct);

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
function deleteProduct(index, data) {
    const deleteProd = data[index];
    const productRef = doc(db, "new-products", deleteProd.id);

    deleteDoc(productRef)

        .then(() => {
            console.log("Producto eliminado!");
        })
        .catch((error) => {
            console.error("Se produjo un error al eliminar: ", error);
        });
}

export { updateProduct, deleteProduct };