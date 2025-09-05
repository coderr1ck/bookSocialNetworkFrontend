import React,{useRef} from 'react'
import Button from './Button'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from 'react-icons/gr';


const Pagination = ({totalPages,currPage,setCurrPage}) => {
  let noOfPages = totalPages;  
  console.log(currPage);
  return (
    <>
    <div className='flex felx-row'>
        <Button text={<GrPrevious/>} style={"!rounded-r-none aspect-square"} disabled={currPage === 0} onClick={(e)=>setCurrPage(currPage-1)}></Button>
        {new Array(totalPages || 0).fill(0).map((e,idx)=>{
            return <Button key={idx} text={idx+1} style={"aspect-square !rounded-none "} disabled={idx === currPage} onClick={(e)=>setCurrPage(idx)}/>
        })}
        <Button text={<GrNext/>} style={"!rounded-l-none aspect-square"} disabled={currPage === totalPages-1} onClick={(e)=>setCurrPage(currPage+1)}></Button>
    </div>
    </>
  )
}

export default Pagination