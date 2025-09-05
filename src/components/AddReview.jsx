import React, { useState } from 'react'
import RatingComponent from './RatingComponent';
import InputBox from './InputBox';
import Button from './Button';
import booksApi from '../utils/api';
import useLoading from '../customHooks/useLoading';
import Loader from './Loader';
import { toast } from 'react-toastify';

const AddReview = ({bookId,togglefeedEvent,setVisible}) => {
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [loading,toggleLoading] = useLoading();

  const handleSubmit = async(e)=> {
    e.preventDefault();
    try{
    toggleLoading();
    const res  = await booksApi.post("/feedback",{
        bookId : bookId,
        note : rating,
        comment : comment
    })
    if(res?.status === 201){
      toast.success("Feedback Added Successfully.");
    }
    }catch(err){
      if(err?.status === 400){
        toast.error(err?.response?.data?.message);
        if(err?.response?.data?.comment || err?.response?.data?.comment){
          toast.error(err?.response?.data?.comment);
          toast.error(err?.response?.data?.note);
        }
      }
      console.log(err);
    }finally{
        toggleLoading();
        togglefeedEvent();
        setVisible(false);
        setComment("");
        setRating(0);
    }
  }


  // console.log(comment,rating);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-52">
        <h1 className="text-center text-xl">Add Review</h1>
            <div className="grid gap-2 py-2 ">
                <div>Rating</div>
                <RatingComponent rating={rating} onChange={setRating}/>
            </div>
            <div>
            <InputBox label={"Comment"} value={comment} onChange={(e)=>setComment(e.target.value)}/>
            </div>
            <Button text={loading ? <Loader type={"small"}/>:"Submit"} type={"submit"}/>
    </form>
  )
}

export default AddReview