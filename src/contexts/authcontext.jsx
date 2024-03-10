import { useContext, useState, useEffect } from "react"
import { auth } from "../config/firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            }
        )
    }, [])


    const value ={
        currentUser
    }

    retrun (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}