import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./button";

export default function SamCard(props) {
    const {answer, img} = props;
    let illusion = false
    const [completedTyping, setCompletedTyping] = useState(!illusion) // RUNNING ONLY ONE TIME
    const [displayAnswer, setDisplayAnswer] = useState("")
    useEffect(() => {

      if(!completedTyping) { setDisplayAnswer(answer); return }
      const wait = () => {
          let i = 0;
          const intervalId = setInterval(() => {
              setDisplayAnswer(answer.slice(0, i) + "|");
              i++;
              if (i > answer.length) {
                  setDisplayAnswer(answer.slice(0, i))
                  clearInterval(intervalId)
                  setCompletedTyping(true)
                }
          }, 20);
          return () => clearInterval(intervalId)
      }

      setTimeout(() =>  wait(), 1200)
      

  }, [answer])
    return (
        <div className="w-full rounded-md flex flex-col mt-2">
          <div className=" rounded-lg min-w-[70%] max-w-[80%] p-3 bg-[#F0F2F6] ml-[4%] mr-[4%]">
            <p className="">{displayAnswer}</p>
            <p className="text-xs mt-2 text-[#2347E2] underline">Producs</p>
          </div>
          {
            answer.length === displayAnswer.length ?
            <div className="ml-[4%] mr-[4%] mt-3 flex gap-3">
              <Image src={img} alt="image product" width={902 * 0.3} height={1110 * 0.3}></Image>
            </div>
            :
            <div className="mt-1 ml-[4%] mr-[4%] w-[80%] flex flex-wrap gap-2 animate-pulse">
              < Button/>
            </div>
          }
          
        </div>
    )
}