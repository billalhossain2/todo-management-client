import { useEffect, useState } from "react"
import { createContext } from "react";
export const authContext = createContext();


import app from "../firebase/firebase.config";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth"
const auth = getAuth(app);


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  //signup for a new user
  const registerWithEmailAndPwd = (email, password)=>createUserWithEmailAndPassword(auth, email, password)
  const loginWithEmailAndPwd = (email, password)=>signInWithEmailAndPassword(auth, email, password)
  const updateUser = (updateInfo)=>updateProfile(auth.currentUser, updateInfo)
  const userInfo = {
    user,
    registerWithEmailAndPwd,
    loginWithEmailAndPwd,
    updateUser
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
    })
    return ()=>unSubscribe();
  }, [])

  return(
    <authContext.Provider value={userInfo}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider