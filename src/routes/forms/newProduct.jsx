import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../db/firebase-config';


export const addNewProduct = () => {

    const productCollectionRef = collection(db, "new-products");

    const addProduct = async ({
        charge,
        itemType,
        productName,
        description,
        provider,
        price
    }) => {

        await addDoc(productCollectionRef, {
            charge,
            productID: "",
            itemType,
            productName,
            description,
            provider,
            price,
            created: serverTimestamp(),
        });

    };

    return { addProduct }

};
