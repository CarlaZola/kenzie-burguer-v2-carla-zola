import { toast } from 'react-toastify';
/* eslint-disable no-param-reassign */


import { createContext, useEffect, useState } from 'react';

import { IDefaultProviderProps } from './UserContext'
import { api } from '../services/api';
import { ISearch } from '../components/Header/SearchForm';




export type IProduct = Product[] 

type ISearchProduct = Product[] | null | undefined

export interface Product {
  id: number,
  name: string,
  category: string,
  price: number,
  img: string,
  quantities: number
}

export interface ICartContext{
    products: IProduct | null,
    currentSale: IProduct,
    searchProducts: ISearchProduct,
    showModal: boolean,
    openModal: () => void,
    closeModal: () => void,
    addProductsInCart: (product: Product) => void,
    clearCart: () => void,
    removeProductsInCart(product: Product): void,
    changeQuantityInCart(product: Product): void,
    removeAllPrductsSame(product: Product): void,
    itemTotal: (item: Product) => number
    totalCart: number,
    totalItemsInCart: number,
    selectedItems: (data: ISearch) => void    
}


export const CartContext = createContext({} as ICartContext)

export const CartProvider = ({children}: IDefaultProviderProps) => {

    const productsInCartLocalStorage = localStorage.getItem("@productsInCart")

    const [products, setProducts] = useState<IProduct | null>(null)
    const [searchProducts, setSeachProducts] = useState<ISearchProduct>(null)
    const [showModal, setShowModal] = useState(false)
    const [currentSale, setCurrentSale] = useState<IProduct>(productsInCartLocalStorage ? JSON.parse(productsInCartLocalStorage) : [])

    useEffect(() => {
        const getProducst = async() => {
            const token = localStorage.getItem('@token')
            try{
                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }) 
                const responseIfQuantities = response.data.map((item: Product) => {
					const filterAddItem = productsInCartLocalStorage?JSON.parse(productsInCartLocalStorage)?.filter((product: Product) => product.id === item.id)[0] : null
					if (filterAddItem) {
						return {
							...filterAddItem,
							quantities: Number(filterAddItem.quantities)
						}
					}
					return { ...item, quantities: 0 }					
				})
                
                setProducts(responseIfQuantities)
                setSeachProducts(responseIfQuantities)
            }
            catch(error){
                console.error(error)
            }

        }
        getProducst()
    }, [])

    useEffect(() => {		
		localStorage.setItem("@productsInCart", JSON.stringify(currentSale));
	}, [currentSale])


    const addProductsInCart = (product: Product) => {
		if (!currentSale.some((currentProduct) => currentProduct.id === product.id)) {
			product.quantities = 1;
			setCurrentSale([...currentSale, product]);
            toast.success("Produto adicionado ao carrinho!", {
                theme: `colored`,
                autoClose: 500,
                position: "bottom-right",
                hideProgressBar: true,
                
            })
		} else {
			const response = currentSale.map((current) => {
				if (current.id === product.id) {			
					product.quantities += 1;
					return product;
                    
				}
				return current;
			});			
			setCurrentSale(response);	
            toast("Quantidade alterada no carrinho!",{
				position: "bottom-right",
				autoClose: 500,
                hideProgressBar: true,
				
			})			
		}
	}

    const removeProductsInCart = (product: Product) => {
		if (product.quantities > 1) {
			if (currentSale.some((currentProduct) => currentProduct.id === product.id)) {
				product.quantities -= 1;
				setCurrentSale([...currentSale]);
               
			}
		} else {
			const newCurrentSale = currentSale.filter((currentProduct) => currentProduct.id !== product.id);
			setCurrentSale([...newCurrentSale]);
		}
	}

    const changeQuantityInCart = (product: Product) =>{
		if(currentSale.map((sale) => product.id === sale.id)){
			product.quantities += 1
			setCurrentSale([...currentSale])
		}
	}

    const removeAllPrductsSame = (product: Product) => {
		const newCurrentSale = currentSale.filter((currentProduct) => currentProduct.id !== product.id);
		setCurrentSale([...newCurrentSale]);
	}


    const clearCart = () => {
		setCurrentSale([]);
	}

    const totalCart = currentSale.reduce((acummulador, currentValue) =>  acummulador + (currentValue.price * currentValue.quantities), 0)
	
	const totalItemsInCart = currentSale.reduce((acummulador, currentValue) =>  acummulador + currentValue.quantities,  0)

	const itemTotal = (item: Product) => {
		const totalValue = currentSale.filter((sale) => sale.id === item.id)
		.reduce((acummulador, currentValue) =>  acummulador + currentValue.price * currentValue.quantities, 0)  
		 
		return totalValue
	}

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const selectedItems = (data: ISearch) => {
        const items = products?.filter((product) => product.name.toLowerCase().includes(data.product.trim().toLowerCase()) || product.category.toLowerCase().includes(data.product.trim().toLowerCase()))
        setSeachProducts(items)   
    }

    return(
        <CartContext.Provider value={{
            products, 
            showModal,
            currentSale,
            openModal,
            closeModal,
            addProductsInCart,
            clearCart,
            removeProductsInCart,
            changeQuantityInCart,
            removeAllPrductsSame,
            itemTotal,
            totalCart,
            totalItemsInCart,
            searchProducts,
            selectedItems
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider