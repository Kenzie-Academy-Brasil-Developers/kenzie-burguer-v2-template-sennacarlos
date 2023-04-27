import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { all } from "axios";

interface ICartProviderProps {
    children: React.ReactNode
}

interface ICartProps {
    modalOpen: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    allProducts: IAllProducts[]
    productCart: IAllProducts[]
    setProductCart: React.Dispatch<React.SetStateAction<IAllProducts[]>>
}

export interface IAllProducts {
    id: number
    name: string
    category: string
    price: number
    img: string
}


export const CartContext = createContext({} as ICartProps)

export const CartProvider = ({children}: ICartProviderProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [allProducts, setAllProducts] = useState<IAllProducts[]>([])
    const [productCart, setProductCart] = useState<IAllProducts[]>([])
    
    useEffect(() => {
        const loadAllProducts = async () => {
            const token = localStorage.getItem("@HambKenzie:Token")

            try {
                const { data} = await api.get<IAllProducts[]>("/products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAllProducts(data)
            } catch (error) {
                console.log(error)
            }
        }
        loadAllProducts()
    }, [])
    

    return (
        <CartContext.Provider value={{ modalOpen, setModalOpen, allProducts, 
        productCart, setProductCart }}>
            {children}
        </CartContext.Provider>
    )
}