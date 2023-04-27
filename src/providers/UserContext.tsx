import React, { createContext, useEffect, useState } from "react"
import { TRegisterFormValues } from "../components/Form/RegisterForm/registerFormSchema"
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/Form/LoginForm/loginFormSchema";

interface IUserProviderProps {
    children: React.ReactNode;
 }

interface IUserContext {
    user: IUser | null
    userRegister: (formData: TRegisterFormValues) => Promise<void>
    userLogin: (formData: TLoginFormValues) => Promise<void>
    userLogout: () => void
}

interface IUser {
    id: string,
    name: string,
    email: string
}

interface IUserRegisterResponse {
    accessToken: string,
    user: IUser,
}

interface IUserLoginResponse { 
    accessToken: string
    user: IUser
}

export const UserContext = createContext({} as IUserContext)

export const UserProvider = ({ children }: IUserProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("@HambKenzie:Token")
        const userId = localStorage.getItem("@HambKenzie:UserId")

        const userAutoLogin = async () => {
            try {
                const { data } = await api.get<IUser>(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(data)
                
                if (window.location.pathname !== "/shop") {
                    navigate("/shop")
                }

            } catch (error) {
                console.log(error)
                localStorage.removeItem("@HambKenzie:Token")
                localStorage.removeItem("@HambKenzie:UserId")
            }
        }

        if (token) {
            userAutoLogin()
        }
    })

    const userRegister = async (formData: TRegisterFormValues) => {
        try {
            await api.post<IUserRegisterResponse>("/users", formData)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const userLogin = async (formData: TLoginFormValues) => {
        try {
            const { data } = await api.post<IUserLoginResponse>("/login", formData)
            localStorage.setItem("@HambKenzie:Token", data.accessToken)
            localStorage.setItem("@HambKenzie:UserId", data.user.id)
            setUser(data.user)
            navigate("/shop")
        } catch (error) {
            console.log(error)
        }
    }

    const userLogout = () => {
        localStorage.removeItem("@HambKenzie:Token")
        localStorage.removeItem("@HambKenzie:UserId")
        setUser(null)
        navigate("/")
    }

    return (
        <UserContext.Provider value={{ user, userRegister, userLogin, userLogout }}>
            {children}
        </UserContext.Provider>
    )
}