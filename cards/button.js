import Image from "next/image"

export default function Button(props) {

    return (
        <div className=" border w-full border-[#94949418] bg-[#94949410] p-1 flex items-center rounded-md gap-[6px] hover:cursor-pointer animate-pulse">
            <div className=" flex w-[100%] py-1 items-center">
                <div className="h-5 w-5 border ml-1 rounded-full bg-[#94949458]"  />
                <div className="mr-1 w-full hover:cursor-pointer ml-2 flex-1 h-4 bg-[#94949431] rounded-full"></div>
            </div>
        </div>
    )
}