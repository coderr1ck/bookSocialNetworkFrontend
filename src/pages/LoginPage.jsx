import React, { useState } from 'react'
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import Loader from '../components/Loader';
import InputBox from '../components/InputBox';
import { FaRegEyeSlash } from "react-icons/fa";
import { validateEmail,validatePassword,fakeApi } from '../utils/util';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const {login}  = useAuth();
    const [passVisible,setPassVisible] = useState(false);
    const togglePassVisiblity = ()=> setPassVisible(prev=>!prev);
    const[loading,setLoading] = useState(false);
    const toggleLoading = ()=>{setLoading(prev=>!prev)} 
    const [formState,setFormState] = useState({
        "email":"",
        "password":""
    });
    const [formErrors,setFormErrors] = useState({
        "email":"",
        "password":""
    })

    const fakeApi = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve({ message: "Hello from fake API!" });
            }, 3500); // 1.5s delay
        });
    };  



    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleLoading();
        try{
         const errors = validateErrors();
         if(Object.values(errors).every(value=> value === "" || value === null)){
            await login(formState);
         }else{
            setFormErrors(errors);
         }
        }catch(e){
            alert(e?.message);
            if(e?.status === 400){
                toast.error(e?.response?.data?.message);
            }else{
                console.log(e);
                toast.error(ERR_MSG);
            }
        }finally{
            toggleLoading();
        }
        console.log(formState);
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormState({...formState,[name] : value})
    }
    const handleFocus = (e) => {
        const {name,value} = e.target;
        setFormErrors({...formErrors,[name] : ""})
    }


    const validateErrors = () => {
        const {email,password} = formState;
        let errors = {};
        if(!validateEmail(email)){
            errors = { email : "Email is Invalid" } 
        }
        if(!validatePassword(password)){
            errors = {...errors,password:"Password must contain at least One Uppercase, Lowercase ,Number & Special Character."}
        }
        return errors;
    }




    console.log(formState);
  return (
    <PageLayout>
        <form onSubmit={handleSubmit} className=' flex flex-col  items-start text-xl rounded-md justify-center gap-6 bg-white m-auto p-12 md:px-24 md:py-16 shadow-md max-w-[432px] '>
            <div className='text-3xl m-auto font-semibold'>Login</div>
            {/* <InputBox/> */}
            <div className='flex flex-col gap-2 w-full'>
                <InputBox label={"Email"} type={"email"} name={"email"} value={formState?.email} error={formErrors?.email} onFocus={handleFocus} onChange={handleChange} placeholderTxt={"Enter your email"} />
            </div>
            <div className='flex flex-col gap-2 '>
            <div className='relative'>
            <FaRegEyeSlash className={`absolute end-3 bottom-2 cursor-pointer ${passVisible ? "text-red-500":""}`} onClick={togglePassVisiblity}/>
            <label htmlFor="password">Password</label>
            <input id='password' name='password' value={formState?.password} onFocus={handleFocus} onChange={handleChange} placeholder='Enter your password' type={passVisible?"text":"password"} className='border rounded-sm px-4 py-1 border-black/30 focus:outline-black/35 w-full'/>
            </div>
            <div className='text-sm text-red-500 '>{formErrors?.password && formErrors.password}</div>
            </div>
            <Button text={loading ? <Loader type={"small"}/> :"Login"} style={"w-full !bg-black text-white !border-black my-4"} type={"submit"}/>
            <div className='w-full text-center cursor-pointer'><Link to={"/register"}>Did not have an account ? <span className='text-blue-600 underline'>Sign Up</span></Link></div>
        
        </form>
    </PageLayout>
  )
}

export default LoginPage