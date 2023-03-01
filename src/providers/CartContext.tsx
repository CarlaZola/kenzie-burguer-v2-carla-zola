import { createContext, useEffect, useState } from 'react';

import { IDefaultProviderProps } from './UserContext'
import { api } from '../services/api';


export type IProduct = Product[]

export interface Product {
  id: number
  name: string
  category: string
  price: number
  img: string
}


export const CartContext = createContext(null)

export const CartProvider = ({children}: IDefaultProviderProps) => {

    const [products, setProducts] = useState<IProduct>([])
    // const [productsInLocal, setProductsInLocal] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getProducst = async() => {
            const token = localStorage.getItem('@token')
            try{
                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }) 
                // const responseIfQuantities = response.data.map((item) => {
				// 	const filterAddItem = JSON.parse(productsInLocal)?.filter((product) => product.id === item.id)[0];
				// 	if (filterAddItem) {
				// 		return {
				// 			...filterAddItem,
				// 			quantities: Number(filterAddItem.quantities)
				// 		}
				// 	} else{
				// 		return { ...item, quantities: 0 }
				// 	}
				// });
                
                setProducts(response.data)
            }
            catch(error){
                console.error(error)
            }

        }
        getProducst()
    }, [])


    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }


    return(
        <CartContext.Provider value={{
            products, 
            openModal,
            closeModal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider