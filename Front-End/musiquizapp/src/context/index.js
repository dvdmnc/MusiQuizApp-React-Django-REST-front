import { createContext } from "react";

export const TokenContext = createContext()

export const TokenContextProvider = ({children}) => {

    function VerifyToken(){
        if(localStorage.getItem("accessToken") || localStorage.getItem("refreshToken")){
            return fetch("http://127.0.0.1:8000/api/token/verify/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"token": localStorage.getItem("accessToken")}),
            })
            .then((response) => {
                if (response.status === 200) {
                    return true
            }
                localStorage.removeItem("accessToken")
                return fetch("http://127.0.0.1:8000/api/token/refresh/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"refresh": localStorage.getItem("refreshToken")}),
                })
                .then((response) => {
                    if (response.status === 200) {
                    return response.json()
                    .then(data => {
                        localStorage.setItem("accessToken", data.access)
                        localStorage.setItem("refreshToken", data.refresh)
                        return true     
                    })
                }
                localStorage.removeItem("refreshToken")
                return false
                })
                
            })
        }
        return false

    }

    return(
        <TokenContext.Provider value={{VerifyToken}}>
            {children}
        </TokenContext.Provider>
    )
}