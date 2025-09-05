import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import booksApi from "../utils/api";
import FullScreenLoader from "../components/FullScreenLoader";
import RatingComponent from "../components/RatingComponent";
import { BookOpen, User, Archive, Share2, ArrowLeft, Book ,BookUp,BookCheck, Trash2,CirclePlus} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useLoading from "../customHooks/useLoading";
import useBook from "../customHooks/useBook";
import { ERR_MSG } from "../utils/util";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";
import Button from "../components/Button";
import PopupComponent from "../components/PopupComponent";
import AddReview from "../components/AddReview"
import { MdOutlineFeedback } from "react-icons/md";


const BookDescription = () => {
  const {user} = useAuth();
  const { id } = useParams();
  // const [loading,toggleLoading] = useLoading();
  const [event,setEvent] = useState(true);
  const [feedBackEvent,setFeedBackEvent] = useState(true);
  const [visible,setVisible] = useState(false);
  const [book,feedback] = useBook(id,event,feedBackEvent);
  const toggleEvent = ()=>setEvent(prev=>!prev);
  const togglefeedEvent = ()=>setFeedBackEvent(prev=>!prev);
  const navigate = useNavigate();

  // console.log(book);

  const deleteBook = async () =>{
    try{
      const res = await booksApi.delete(`/books/${book?.id}`);
      if(res?.status === 204){
        toast.warn("Book Deleted Successfully");
        navigate("/books/owner");
      }
    }catch(err){
      if(err?.status === 400){
          toast.error(e?.response?.data?.message);
      }else{
          console.log(err);
          toast.error(ERR_MSG);
      }
    }
  }

  const borrowBook = async () =>{
    try{
      const res = await booksApi.post(`/books/borrow/${book?.id}`);
      if(res?.status === 201){
        toast.info("Book Borrowed Successfully");
        toggleEvent();
      }
    }catch(err){
      if(err?.status === 400){
          toast.error(e?.response?.data?.message);
      }else{
        console.log(err);
        toast.error(ERR_MSG);
      }
    }
  }
  const returnBook = async () =>{
    try{
      const res = await booksApi.post(`/books/return/borrowed/${book?.id}`);
      if(res?.status === 201){
        toast.success("Book Return Requested Successfully");
        toggleEvent();
      }
    }catch(err){
      if(err?.status === 400){
        toast.error(e?.response?.data?.message);
      }else{
          console.log(err);
          toast.error(ERR_MSG);
      }
      console.log(err);
    }
  }

  
  const approveBookReturn = async () =>{
    try{
      const res = await booksApi.post(`/books/approve/return/borrowed/${book?.id}`)
      if(res?.status === 204){
        toast.success("Book Return Approved Successfully");
        toggleEvent();
      }
    }catch(err){
      if(err?.status === 400){
          toast.error(e?.response?.data?.message);
      }else{
          console.log(err);
          toast.error(ERR_MSG);
      }
    }
  }


  if (!book) {
    // console.log("exec",book);
    return <FullScreenLoader loading={true}/>;
  } 
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 h-full w-full ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button onClick={()=>navigate("/")} className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Library</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Column - Book Cover */}
            <div className="md:w-1/3 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="sticky top-8">
                {book?.cover ? (
                  <img
                    src={`data:image/jpeg;base64,${book?.cover}`}
                    alt={book?.title}
                    className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
                    style={{ aspectRatio: '3/4' }}
                  />
                ) : (
                  <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl shadow-lg flex items-center justify-center text-gray-600" style={{ aspectRatio: '3/4' }}>
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <span className="text-lg font-medium">No Cover Available</span>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {(!book?.borrowed && (book?.ownerEmail !== user?.email)) &&
                  <button onClick={()=>borrowBook()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                    <BookOpen className="w-5 h-5" />
                    <span>Borrow Book</span>
                  </button>
                  }
                  {(book?.borrowed && !book?.returnRequested && book?.borrower && (book?.ownerEmail !== user?.email)) && <button onClick={()=>returnBook()} className="cursor-pointer w-full border bg-green-300 border-green-300 hover:bg-green-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <BookUp className="w-5 h-5" />
                    <span>Return Book</span>
                  </button>}

                  {(book?.borrowed && book?.returnRequested && (book?.ownerEmail === user?.email)) && <button onClick={()=>approveBookReturn()} className="disabled:bg-gray-300 disabled:border-gray-400 cursor-pointer w-full border bg-green-300 border-green-300 hover:bg-green-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <BookCheck className="w-5 h-5" />
                    <span>Approve Return</span>
                  </button>}

                  {(book?.ownerEmail && (book?.ownerEmail === user?.email)) && <button onClick={()=>navigate(`/books/edit/${book?.id}`)} className="disabled:bg-gray-300 disabled:border-gray-400 cursor-pointer w-full border bg-green-300 border-green-300 hover:bg-green-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <BookCheck className="w-5 h-5" />
                    <span>Edit Book</span>
                  </button>}
                  
                  {(!book?.borrowed && !book?.returnRequested) && (book?.ownerEmail === user?.email) && <button onClick={()=>deleteBook()} className=" cursor-pointer w-full border bg-red-300 border-red-300 hover:bg-red-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Trash2 className="w-5 h-5" />
                    <span>Delete Book</span>
                  </button>}

                </div>
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="md:w-2/3 p-8">
              {/* Title and Author */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {book?.title}
                </h1>
                <div className="flex items-center space-x-2 text-xl text-blue-600 mb-4">
                  <User className="w-5 h-5" />
                  <span>by {book?.authorName}</span>
                </div>
                
                {/* Rating */}
                <div className="mb-4">
                  <RatingComponent rating={book?.rate} readOnly={true}/>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Synopsis</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book?.synopsis}
                </p>
              </div>

              {/* Book Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Book Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Book className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">ISBN:</span>
                        <span className="ml-2 text-gray-800">{book?.isbn}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Owner:</span>
                        <span className="ml-2 text-gray-800">{book?.owner}</span>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Status
                  </h3>
                  
                  <div className="space-y-3">
                    
                    
                    <div className="flex items-center space-x-3">
                      <Archive className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                          book?.archived 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {book?.borrowed ? (book.returnRequested ? "Return Requested" : "Borrowed") : "Available" }
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Share2 className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="font-medium text-gray-600">Sharing:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                          book?.sharable 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {book?.sharable ? "Shareable" : "Private"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Tab */}
        
        <div className="bg-white rounded-2xl shadow-xl overflow-auto mt-6 p-8">
           <div className="flex flex-row justify-between items-center border-b border-gray-300 pb-2 mb-3">
           <h3 className="text-2xl font-semibold text-gray-800 ">
               {"Book Reviews"}
          </h3>
          <div className="flex gap-2">
            <h1>Add Review</h1>
            <Button text={<CirclePlus/>} style={"!p-0 !bg-white !border-none"} onClick={()=>setVisible(true)}/>
            <PopupComponent visible={visible} setVisible={setVisible} component={<AddReview bookId={id} togglefeedEvent={togglefeedEvent} setVisible={setVisible}/>}/>
          </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-h-80 overflow-auto">
           { (feedback && Array.isArray(feedback?.content) && (feedback?.content?.length > 0)) ?
            feedback?.content?.map((feedback,idx)=>{
            return <ReviewCard key={idx} note={feedback?.note} comment={feedback?.comment} user={feedback?.user} /> 
          })
          : <div className="flex items-center justify-center col-span-2 md:text-2xl gap-4 py-6">
            <MdOutlineFeedback size={28}/>
            <h1>Book has no reviews ...</h1>
          </div>
          }
          </div>         
        </div>
        
      </div>
    </div>

  );
};

export default BookDescription;