/**
 * Filename: index.js
 * Author: Bayang
 * Description: Main application file
 */

import Head from "next/head";
import Image from "next/image";
import SamCard from "../cards/sam";
import UserCard from "../cards/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("")
  const [counter, setCounter] = useState(0)
  const [messages, setMessages] = useState([])
  const [startChat, setStartChat] = useState(false);
  const [sources, setSources] = useState([
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6525/6525478_sd.jpg;maxHeight=2000;maxWidth=2000"
  ]);
  
  const handlePopup = () => { setStartChat(!startChat); }
  /**
   * Handle Search function.
   * @param {event}  - event object.
   */
  const handleSearch = (e) => {

    // add user question to the list of messages
    e.preventDefault();
    let _messages = messages;
    _messages.push({"role": "user", "message": query});
    setMessages(_messages);

    // add sam answer to the list of messages
    _messages.push({"role": "sam", "message": "Certainly! The most affordable iPhone 14 with at least 128GB of RAM and in gray color is the iPhone 14 Mini Gray Edition, priced at $699. It boasts a 5.4-inch Super Retina XDR display and is powered by the A16 Bionic chip, providing a blend of performance, style, and budget-friendliness."});
    setMessages(_messages);
    // to update the UI component
    setCounter(counter + 1)
  }
  const handleQuery = (e) => { setQuery(e.target.value); }
  return (
   <div className="w-full h-screen flex relative">
    <Head>
      <title>Sam AI</title>
    </Head>
    {/* --------------- Iframe of the website --------------- */}
    <div className={"h-screen w-full "}>
      <Image src={"/bg.png"} alt="bg" width={1700} height={900} className="w-full"/>
    </div>

    <div className={"h-[900px] w-full absolute duration-500 transform "+ (startChat ? "bg-[#000000a4]": "")}>
    </div>
    {/* ---------------  -------------------  ----------------- */}
    
    {
      startChat ?
      <div className={"bg-white absolute bottom-5 right-16 rounded-2xl shadow-xl rounded-4xl shadow-[#00000024] overflow-auto flex flex-col " 
                    +(startChat ? "w-[40%] h-[85%] transition-transform duration-500 transform  ": "")}>
        {/* top bar */}
        <div className="w-full h-[75px] bg-[#0046BE] flex justify-between items-center">

          {/* left side: title of the bot */}
          <div className="ml-5 text-white text-xl">
            {"Sam AI Chatbot Powered by PALM"}
          </div>

          {/* right side: close button*/}
          <div onClick={handlePopup} className=" mr-5 hover:cursor-pointer hover:scale-110 transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <div className="w-full flex-1 relative overflow-auto">
          {/* middle part*/}
          {
            messages.map((messages, index) => {
              if(messages.role === "user") {
                return <UserCard key={index} query={messages.message}/>
              } else {  
                return <SamCard key={index} answer={messages.message} img={sources[0]}/>
              }
            })
          }

          <div className="h-[90px]"></div>

        </div>
        {/* input box */}
        <div className=" w-full absolute bottom-0 h-[80px] bg-white ">
            <div className="border-t mx-auto w-[92%] bg-white -mt-1 h-1 "></div>
            <div className="flex items-center mx-auto w-[92%] h-full">
              <div className="w-[90%] h-full flex items-center">
                <input onSubmit={handleSearch} value={query} onChange={handleQuery} className="w-full h-[80%] placeholder:font-light font-light outline-none" placeholder="Enter your message"/>
              </div>
              <div className="w-[10%] flex items-center justify-center">
                <div onClick={handleSearch} className="rounded-full flex items-center justify-center p-3 bg-gradient-to-br from-[#2347E2] to-[#0BA6F7]
                                shadow-2xl hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="w-6 h-6">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
      </div>
      :
      <div onClick={handlePopup} className=" w-[90px] h-[90px] absolute bottom-5 right-16 rounded-full shadow-xl 
                        rounded-4xl bg-[#0046BE] shadow-[#0046be8c] overflow-auto
                       transform duration-300 hover:scale-110 hover:cursor-pointer flex items-center justify-center ">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fff" viewBox="0 0 256 256">
            <path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM160,152H96a8,8,0,1,1,0-16h64a8,8,0,1,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
          </svg>
      </div>
    }
   </div>
  )
}
