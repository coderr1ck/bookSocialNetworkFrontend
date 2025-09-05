import React from 'react'
import RatingComponent from './RatingComponent'
import { MessageSquareText } from 'lucide-react'
import { User } from 'lucide-react'

const ReviewCard = ({user,note,comment}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg ">
        <div className="flex justify-between pr-4 mb-3">
            <div className="flex flex-row gap-2 items-center">
                  <div><User className="text-gray-600"/></div>
                  <div>{user? user : "username"}</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <div><RatingComponent rating={note ? note : 0}/></div>
            </div>
        </div>
        <div className="flex flex-row gap-2 ">
            <div className=""><MessageSquareText className=" text-gray-600 "/></div>
            <div className="md:max-h-24 max-h-10 overflow-auto ">{comment ? comment :"User comment on book"} </div>
        </div>
    </div>
  )
}

export default ReviewCard