import { useEffect, useState } from "react"
import { createContext } from "react";
export const authContext = createContext();


import app from "../firebase/firebase.config";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut} from "firebase/auth"
const auth = getAuth(app);


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //signup for a new user
  const registerWithEmailAndPwd = (email, password)=>createUserWithEmailAndPassword(auth, email, password)
  const loginWithEmailAndPwd = (email, password)=>signInWithEmailAndPassword(auth, email, password)
  const updateUser = (updateInfo)=>updateProfile(auth.currentUser, updateInfo)
  const logOutUser = ()=>signOut(auth);
  const userInfo = {
    user,
    loading,
    registerWithEmailAndPwd,
    loginWithEmailAndPwd,
    updateUser,
    logOutUser
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
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