import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { createContext, useEffect, useState } from "react";

import { api } from "../services/api";



export interface IUser {
    accessToken: string,
    user: User,
  }
  
  export interface User {
    id: string,
    name: string,
    email: string,
  }
  

export interface IUserRegisterForm{
    email: string,
    password: string,
    name: string,
    confirmPassword?: string
}

export interface IUserLoginForm{
    email: string,
    password: string
}

export interface IDefaultProviderProps{
    children: React.ReactNode   
}


interface IUsercontext{
    user: IUser | null,
    userRegister: (dataRegister: IUserRegisterForm) => Promise<void>,
    userLogin: (dataLogin: IUserLoginForm) => Promise<void>,
    userLogout: () => void
}

export const UserContext = createContext({} as IUsercontext)

export const UserProvider = ({children}: IDefaultProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const id = localStorage.getItem('@id')
        if(id){
            const userLoad = async() => {
                const token = localStorage.getItem('@token')
                try{
                    const response = await api.get(`/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(response.data)
                    navigate('/shop')                   
                }
                catch(error){
                    console.error(error)
                }
            }
            userLoad()
        }

    }, [])

    const userRegister = async(dataRegister: IUserRegisterForm) => {
            try{
                await api.post("/users", dataRegister)              
                toast.success("Conta criada com sucesso!", {
                    hideProgressBar: true,
                    autoClose: 500,
                  });
                  setTimeout(() => {
                    navigate(`/`);
                  }, 1000);
            }
            catch(error){
                toast.error("Esse email já foi cadastrado!", {
                    hideProgressBar: true,
                    autoClose: 1000,
                  });
            }
    }

    const userLogin = async(dataLogin: IUserLoginForm) => {
        try{
            const response = await api.post("/login", dataLogin)
            setUser(response.data.user)
            localStorage.setItem("@token", response.data.accessToken)
            localStorage.setItem("@id", JSON.stringify(response.data.user.id))          
            navigate('/shop')
        }
        catch(error){
            toast.error("Email ou senha incorretos", {
                hideProgressBar: true,
                autoClose: 1000,
              });
        }
    }   

    const userLogout = () => {
        setUser(null)
        localStorage.removeItem("@token")
        localStorage.removeItem("@id")
        localStorage.removeItem("@productsInCart")       
        navigate("/")
    }


    return(
       <UserContext.Provider value={{
        user,
        userRegister,
        userLogin,
        userLogout
       }}>
            {children}
       </UserContext.Provider>
    )
}