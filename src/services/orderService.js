
import { collection, addDoc, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";

// ADD NEW ORDER
export const addOrder = async (orderData) => {
    try {
        await addDoc(collection(db, "Orders"), orderData);
    } catch (error) {
        console.error("Error adding order:", error);
    }
};



// READ ALL ORDERS
const getOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        const dataList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return dataList;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};



export {getOrders};