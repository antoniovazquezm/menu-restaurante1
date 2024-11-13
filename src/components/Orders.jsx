import React, {useEffect, useState} from 'react'
import { getOrders } from '../services/orderService'


export const Orders = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const history = await getOrders();
                console.log("Historial de órdenes:", history);
                setOrderHistory(history);
            } catch (error) {
                console.error("Error al obtener el historial de ordenes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6 text-center">Historial de Ordenes</h1>
            {loading ? (
                <p className="text-center text-xl text-gray-500">Cargando...</p>
            ) : (
                <div>
                    {orderHistory.map((order) => (
                        <div key={order.id} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Orden: {order.id}</h2>
                            {order.items && Array.isArray(order.items) ? ( // Verifica que items sea un array
                                order.items.map((item, index) => (
                                    <div key={index} className="mb-3 p-3 border-b border-gray-300"> 
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-700">{item.name}</span>
                                            <span className="text-gray-500">Precio: ${item.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-600">Cantidad: {item.quantity}</span>
                                            <span className="text-gray-800 font-semibold">
                                                Total: ${item.price * item.quantity}
                                            </span>
                                        </div>
        
                                    </div>
                                    
                                      
                                ))
                                

                            ) : (
                                <p className="text-center text-gray-500">Datos no disponibles</p>
                            )}
                        </div>
                        
                    ))}
                </div>
            )}
        </div>
    );
};
