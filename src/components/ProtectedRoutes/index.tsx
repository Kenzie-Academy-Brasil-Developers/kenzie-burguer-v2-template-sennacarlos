import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"
import { CartProvider } from "../../providers/CartContext"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("@HambKenzie:Token")

    return token ? <CartProvider> <Outlet/> </CartProvider> : <Navigate to="/"/>
}