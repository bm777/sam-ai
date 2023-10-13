import { useRouter } from "next/router";
import { Airplay, Ticket, CheckFat } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";




export default function Status(props) {
  
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        // download all tickets, which are static for the moment

    }, [])
  
  return (
   <div className="w-full h-screen bg-gradient-to-b from-[#749DF0]  to-[#F8C8F2] flex justify-center items-center">
      <div className="w-[80vw] h-[80vh] bg-gradient-to-r from-[#000052] via-[#310f75]
                     to-[#5900B5] shadow-2xl shadow-[#7501a7bc] rounded-lg relative
                     ">

        <div className="h-[10%] flex items-center justify-between">
          <div className="flex items-center gap-2 ml-4">
            <Airplay size={32} weight="fill" color="#E3E0F5"/>
            <p className="flex text-[#E3E0F5] text-xl font-medium "><Link href={"/"}>drip</Link></p>
          </div>
        </div>

        <div className="h-[80%]  justify-center mt-20">
          <div className="flex items-center justify-center">
            <div className="h-[150px] w-[150px] border border-[#95c93a] rounded-full 
                        flex items-center justify-center
                        bg-[#b96587f6]
            ">
              <CheckFat size={40} weight="fill" color="#95c93a"/>
            </div>
          </div>
          
          <p className=" mt-32 text-3xl text-white text-center">Success</p>
          <p className=" mt-7 text-blue-500 text-center">
            <Link className=" text-blue-500" href={"/ticket/ae7k4hvbKdtcKkwt"} >Ticket</Link>
          </p>
          

        </div>
    

        <div className="justify-center absolute bottom-0 w-full h-[12%]">
          <div className="h-5 w-[80%] border-t-2 border-[#003A84] rounded-full mx-auto">

          </div>
          <div className="flex justify-center items-center gap-2">
            <Ticket size={40} weight="fill" color="#95c93a"/>
            <p className="flex text-[#E3E0F5] text-lg font-medium ">Confirmation</p>
          </div>
        </div>
      </div>
   </div>
  )
}
