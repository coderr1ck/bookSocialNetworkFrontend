import React, { useState,useRef } from 'react'
import PageLayout from '../components/PageLayout'
import OtpInput from '../components/OtpInput';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { activateAccount } from '../utils/api';
import Loader from '../components/Loader';
import { ERR_MSG } from '../utils/util';
import { toast } from 'react-toastify';

const OtpVerification = () => {
    
    const[loading,setLoading] = useState(false);
    const toggleLoading = ()=>{setLoading(prev=>!prev)} 
    const navigate = useNavigate();

    const params = useParams();
    const inputBoxRef = useRef([]);
    const [inputCode,setInputCode] = useState(new Array(6).fill(''));

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            toggleLoading();
            let code = inputCode.reduce((acc,curr)=>{
                return acc+=curr;
            },"")
            code = Number(code);
            const res = await activateAccount.get(`${code}`);
            if(res?.status === 200){
                toast.success(res?.data?.message);
                navigate("/");
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

    const onChangeHandler = (e,idx)=>{
        const {value} = e.target;
        if(value == null || value == ''){
            return;
        }
        let updatedArr = inputCode;
        let valuee = value.slice(value.length-1);
        if(!"0123456789".includes(valuee)){
            return;
        }
        updatedArr[idx] = valuee;
        setInputCode([...updatedArr]);
        if(idx<inputCode.length-1) inputBoxRef.current[(idx+1)].focus();
    }

    const handleKeyDown = (e,idx) => {
        if(e.key === "Backspace" && idx>0){
            inputBoxRef.current[idx-1].focus();
        }
    }

  return (
    <PageLayout>
        <form onSubmit={handleSubmit} className='m-auto flex flex-col text-xl bg-white shadow-xl rounded-md min-h-2/4  items-center justify-center gap-6 p-16'>
        <div className='text-3xl text-center'>Please enter the verification code <br></br> sent on your email</div>
        <div className='text-2xl font-light underline '>{`${params?.email}`}</div>
        <OtpInput handleKeyDown={handleKeyDown} inputCode={inputCode} inputBoxRef={inputBoxRef} onChangeHandler={onChangeHandler}/>
        <Button  text={loading ? <Loader type={"small"} />:"Submit"} style={"w-full !bg-black text-white !border-black "} type={"submit"}></Button>
        </form>
    </PageLayout>
  )
}

export default OtpVerification