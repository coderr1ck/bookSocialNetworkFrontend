import { useState,useEffect } from "react";
import booksApi from "../utils/api";

const useBook = (id,event,feedBackEvent) => {   
 const [book, setBook] = useState(null);
 const [feedback,setFeedback] = useState(null);
 const fetchBookById = async (id) => {
       try {
         const res = await booksApi.get(`/books/${id}`);
         if(res?.status === 200){
           setBook(res?.data);
         }
       } catch (err) {
         console.error("Error fetching book:", err);
       }
     }

      const fetchBookFeedbacks = async (id) => {
       try {
         const res = await booksApi.get(`/feedback/${id}`);
         if(res?.status === 200){
           setFeedback(res?.data);
         }
       } catch (err) {
         console.error("Error fetching feedbacks:", err);
       }
     }
 
 
   useEffect(() => {
    console.log("exec useEff");
     fetchBookById(id);
     }, [id,event]);

    useEffect(()=>{
      fetchBookFeedbacks(id);
    },[id,feedBackEvent])

     console.log(id,event,book,feedback);
  return [book,feedback];
}

export default useBook