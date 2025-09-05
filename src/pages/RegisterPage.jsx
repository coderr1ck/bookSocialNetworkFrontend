import React,{useState} from 'react'
import PageLayout from '../components/PageLayout'
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { validateEmail,validatePassword,fakeApi, ERR_MSG } from '../utils/util';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const navigate = useNavigate();
    const[loading,setLoading] = useState(false);
    const toggleLoading = ()=>{ setLoading(prev=>!prev)} ;

    const [formState,setFormState] = useState({
            "firstName":"",
            "lastName":"",
            "password":"",
            "dob":"",
            "confirmPassword":"",
            "email" : ""
        });
        const [formErrors,setFormErrors] = useState({
            "password":"",
            "confirmPassword":"",
            "email" : ""
        })
        {console.log(formState)}
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            toggleLoading();
            try{
            const errors = validateErrors();
            if(Object.values(errors).every(value=> value === "" || value === null)){
                const request = await authApi.post('/register',formState);
                    if(request?.status === 200){
                        toast.success("User Registerd Successfully ");
                        navigate(`/verify/${formState?.email}`);
                    }
            }else{
                setFormErrors(errors);
            }
            }catch(e){
                if(e?.status === 400){
                    toast.error(e?.response?.data?.message);
                }else{
                    console.log(e);
                    toast.error(ERR_MSG);
                }
            }finally{
                toggleLoading();
            }

        }

        const validateErrors = () => {
            const {email,password,confirmPassword} = formState;
            let  errors = {};
            if(!validateEmail(email)){
                errors = { email : "Email is Invalid" } 
            }
            if(!validatePassword(password)){
                errors = {...errors,password:"Password must contain at least One Uppercase, Lowercase ,Number & Special Character."}
            }
            if(password !== confirmPassword){
                errors = {...errors,confirmPassword:"Password and Confirm Password did not match."}
            }
            return errors;
        }
        

    

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormState({...formState,[name] : value})
    }
    const handleFocus = (e) => {
        const {name,value} = e.target;
        setFormErrors({...formErrors,[name] : ""})
    }
  return (
    <PageLayout>
        <form onSubmit={handleSubmit} className='flex flex-col items-start text-xl rounded-md justify-center gap-6 bg-white m-auto p-12 shadow-md max-w-[580px]'>
            <div className='text-3xl m-auto font-semibold'>Register</div>
            <section className='grid md:grid-cols-2 gap-4 w-full'>
            <div className='flex flex-col w-full ' >
                <InputBox label={"Firstname"} name={"firstName"} onChange={handleChange}/>
            </div>
            <div className='flex flex-col w-full'>
                <InputBox label={"Lastname"} name={"lastName"} onChange={handleChange}/>
            </div>
            <div className='flex flex-col w-full'>
                <InputBox type={"date"} label={"Date of Birth"} name={"dob"} onChange={handleChange}/>
            </div>
            <div className='flex flex-col w-full'>
                <InputBox label={"Email"} name={"email"} onChange={handleChange} error={formErrors?.email} onFocus={handleFocus}/>
            </div>
            <div className='flex flex-col w-full'>
                <InputBox type={"password"} label={"Password"} name={"password"} onChange={handleChange} error={formErrors?.password} onFocus={handleFocus}/>
            </div>
            
            <div className='flex flex-col w-full'>
                <InputBox type={"password"} label={"Confirm Password"} name={"confirmPassword"} onChange={handleChange} error ={formErrors?.confirmPassword} onFocus={handleFocus}/>
            </div>
            </section>
            <Button text={loading ? <Loader type={"small"}/> :"Register"} type={"submit"} style={"w-full"}/>
            <div className='w-full text-center cursor-pointer'><Link to={"/login"}>Already Registered ? <span className='text-blue-600 underline'>Sign In</span></Link></div>
        </form>
    </PageLayout>
  )
}

export default RegisterPage