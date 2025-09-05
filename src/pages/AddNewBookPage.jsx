import React,{useEffect, useState,useRef} from 'react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import booksApi from '../utils/api'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { ERR_MSG } from '../utils/util'

const AddNewBookPage = ({data,text,api}) => {

  
  const FORM_STATE_CONFIG = {
  "title": "",
  "authorName": "",
  "isbn": "",
  "synopsis": "",
  "sharable": ""
  };

  const [file,setFile] = useState(null);
   const fileRef = useRef();
  const[loading,setLoading] = useState(false);
  const toggleLoading = ()=>{setLoading(prev=>!prev)} 
  const [formState,setFormState] = useState({...FORM_STATE_CONFIG,...data});  
  const [formErrors,setFormErrors] = useState({...FORM_STATE_CONFIG,file:""});

  
  console.log("DATA",data,formState); 

  useEffect(()=>{
    if(data){
      setFormState({...data});
    }
  },[data])


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


   const handleUpload = async (bookId) => {

    if(!file) return;

    const formData = new FormData();
    formData.append("file", file); 

    try {
      const res = await booksApi.post(
        `/books/upload/cover/${bookId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if(res?.status === 202){
        toast.success("Book Cover Uploaded Successfully");
      }
    } catch (err) {
      if(e?.status === 400){
          toast.error(e?.response?.data?.message);
      }else{
          console.log(e);
          toast.error(ERR_MSG);
      }
    }
  };


   const handleSubmit = async (e) => {
        e.preventDefault();
        toggleLoading();
        try{
        const errors = validateErrors();
         if(Object.values(errors).every(value=> value === "" || value === null)){
            if(api){  
              const {title,isbn,authorName,synopsis,sharable} = formState;
              const res = await booksApi.put(api,{
                title : title,
                isbn : isbn,
                authorName : authorName,
                synopsis : synopsis,
                sharable : sharable
              });
               if(res?.status === 201){
                  toast.success("Book Updated Successfully.");
                  const bookId = res?.headers["location"];
                  if(bookId !== null && bookId !== ""){
                    await handleUpload(bookId);
                  }
                }
            }else{
              const res = await booksApi.post("/books",formState);
                if(res?.status === 201){
                  toast.success("Book Created Successfully.");
                  const bookId = res?.headers["location"];
                  if(bookId !== null && bookId !== ""){
                    await handleUpload(bookId);
                  }
                }
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
            {!data && setFormState(FORM_STATE_CONFIG)};
            setFile(null);
            fileRef.current.value = "";
        }
    }


    const validateErrors = () => {
      let errors = {}
      const {authorName,isbn,sharable,synopsis,title} = formState;
      if(authorName === null || isbn === ""){
        errors = {...errors,authorName:"Book Author Name cannot be empty."};
      } 
      if(isbn === null || isbn === ""){
        errors = {...errors,isbn:"Book ISBN cannot be empty."};
      }
      
      if(title === null || title === ""){
        errors = {...errors,title:"Book Title cannot be empty."};
      }
      
      if(synopsis === null || synopsis === ""){
        errors = {...errors,synopsis:"Book Synopsis cannot be empty."};
      }
      if(file === null || !file){
        if(!data || data === null){
          errors = {...errors,file:"Book cover is required."}
        }
      }
      if(file){
        const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const fileExtension = String(file?.name);
        const ext = file.name.split(".").pop()?.toLowerCase();
        if(!validExtensions.includes(ext)){
          errors = {...errors,file:"File extension should be "+validExtensions.join(" ,")}
        }
        if(!file?.type?.startsWith("image/")){
          errors = {...errors,file:"Please provide an image file."}  
        }
      }
      return errors;
    }

  const handleChange = (e) => {
        const {name,value} = e.target;
        setFormState({...formState,[name] : value})
  }

  const handleCheckBoxChange = (e) =>{
    const{name,checked} = e.target;
    setFormState({...formState,[name]:checked});
  }

   const handleFocus = (e) => {
        const {name,value} = e.target;
        setFormErrors({...formErrors,[name] : ""})
    }

    // console.log(formState);

  return (
   <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-6 m-auto p-6 bg-white rounded-xl shadow-lg text-xl md:w-3/5 lg:w-2/5'>
    <div className='text-2xl text-center md:col-span-2'>{text ? text :"Create New Book"}</div>
    <div>
    <InputBox value={formState?.title} label={"Title"} name={"title"} placeholderTxt={"Enter Book Title"} onFocus={handleFocus} onChange={handleChange} error={formErrors?.title}/>
    </div>
    
    <div>
      <InputBox value={formState?.authorName} label={"Author Name"} name={"authorName"} placeholderTxt={"Enter Book Author Name"} onFocus={handleFocus} onChange={handleChange} error={formErrors?.authorName}/>
    </div>
    
    <div>
    <InputBox value={formState?.isbn} disabled={data} label={"Book ISBN"} name={"isbn"} placeholderTxt={"Enter Book ISBN"} onFocus={handleFocus} onChange={handleChange} error={formErrors?.isbn}/>
    </div>

    <div>
    <InputBox value={formState?.synopsis} label={"Book Synopsis"} name={"synopsis"} placeholderTxt={"Enter Book Synopsis"} onFocus={handleFocus} onChange={handleChange} error={formErrors?.synopsis}/>
    </div>
    <div className='flex items-center gap-4'>
        <InputBox type={"checkbox"} checked={formState?.sharable} label={" Book Shareble ?"} name={"sharable"} style={"!size-6 "} onFocus={handleFocus} onChange={handleCheckBoxChange}/>
    </div>

      <div>
        <InputBox type={"file"} ref={fileRef} accept={"image/*"} label={"Book Cover"} name={"file"} value={file?.filename} style={"text-sm text-gray-500 file:mr-2 file:py-2 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"} onFocus={handleFocus} onChange={handleFileChange} error={formErrors?.file}/>
      </div>
    
    <Button text={loading ? <Loader type={"small"}/>:"Submit"} type={"submit"} style={"md:col-span-2"}></Button>

   </form>
  )
}

export default AddNewBookPage