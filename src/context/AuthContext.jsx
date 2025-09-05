import React, { createContext, useContext, useEffect, useState ,useRef} from 'react'
import { authApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/util';
import { toast } from 'react-toastify';
import { ERR_MSG } from '../utils/util';


const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const navigate  = useNavigate();
  const logoutTimerRef = useRef(null);
  const[isLoggedIn,setIsLoggedIn]  = useState(false);
  const[user,setUser] = useState(null);
  const[authLoading,setAuthLoading] = useState(true);
  const toggleLoading = () => setAuthLoading(prev=>!prev);

  const login = async (data) =>{
    const res = await authApi.post("/login",data);
    if(res?.status === 200){
      localStorage.setItem("token", res?.data?.token);
      setUser(getUserFromToken(res?.data?.token));
      console.log("Token saved ");                // toast
      setIsLoggedIn(true);
      navigate("/");
      toast.success("Logged in Successfully.")
    }else{
      toast.error(ERR_MSG);
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
  }

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      console.log("Clearing auto logout ");
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const sessionExpired =()=>{
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();
    toast.error("Session Expired , Please Login to continue...",{position:"bottom-center"});
  }
  // console.log(user,isLoggedIn,authLoading);

  const checkAuth = () =>{
  //  console.log("called once");
   const token = localStorage.getItem("token");
   if(!token){
    sessionExpired();
    return;
   }
   const user = getUserFromToken(token);
   if(!user){
    sessionExpired();
    return;
   }
   setIsLoggedIn(true);
   setUser(user);
  }

  useEffect(()=>{
   checkAuth();
   setAuthLoading(false);
  },[])

  const setAutoLogout = () => {
    clearLogoutTimer();
    // console.log("called once Timer with user",user);
    if(!user) return;

    const expTime = (user?.exp * 1000) - Date.now();
    // console.log("Setting auto-logout timer for", expTime / 1000, "seconds");
    
    logoutTimerRef.current = setTimeout(()=>{
      sessionExpired();
    },expTime) 
  }

  useEffect(()=>{  
    setAutoLogout();
    return () => {
      clearLogoutTimer();
    }
  },[user])

  // console.log(logoutTimerRef);


  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,login,logout,user,authLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

export function useAuth(){
  return useContext(AuthContext);
}