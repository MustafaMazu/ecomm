import { createContext, useEffect, useState } from "react"

export const authContext = createContext()

   




const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState (null )

    useEffect( () => {
        if (localStorage.getItem("tkn") !== null ) {
         setToken(localStorage.getItem("tkn"))    
        }
    } , [])
  return (
    < authContext.Provider value={{token , setToken}}>
  <div> {children}</div>
  </authContext.Provider>
  )
}

export default AuthContextProvider