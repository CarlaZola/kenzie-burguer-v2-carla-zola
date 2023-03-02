import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    user: User | null,
    userRegister: (dataRegister: IUserRegisterForm) => Promise<void>,
    userLogin: (dataLogin: IUserLoginForm) => Promise<void>,
    userLogout: () => void
}


export const UserContext = createContext({} as IUsercontext)

export const UserProvider = ({children}: IDefaultProviderProps) => {

    const [user, setUser] = useState<User | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const id = localStorage.getItem('@id')
        if(id){
            const userLoad = async() => {
                const token = localStorage.getItem('@token')
                try{
                    const response = await api.get<User>(`/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(response.data)
                    navigate('/shop')                   
                }
                catch(error){
                    if(axios.isAxiosError(error)){
                       toast.error(`${error.message}`, {
                            hideProgressBar: true,
                            autoClose: 500,                     
                       })
                    }
                }
            }
            userLoad()
        }

    }, [])

    const userRegister = async(dataRegister: IUserRegisterForm) => {
            try{
                await api.post<IUser>("/users", dataRegister)              
                toast.success("Conta criada com sucesso!", {
                    hideProgressBar: true,
                    autoClose: 500,
                  });
                  setTimeout(() => {
                    navigate(`/`);
                  }, 1000);
            }
            catch(error){
                if(axios.isAxiosError(error)){
                    toast.error("Esse email já foi cadastrado!", {
                        hideProgressBar: true,
                        autoClose: 1000,
                      });
                }              
            }
    }

    const userLogin = async(dataLogin: IUserLoginForm) => {
        try{
            const response = await api.post<IUser>("/login", dataLogin)
            
            localStorage.setItem("@token", response.data.accessToken)
            localStorage.setItem("@id", JSON.stringify(response.data.user.id)) 
            setUser(response.data.user)         
            navigate('/shop')
        }
        catch(error){
            if(axios.isAxiosError(error)){
                toast.error("Email ou senha incorretos", {
                    hideProgressBar: true,
                    autoClose: 1000,
                  });
            }           
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