export default function UserCard(props) {
    const {query} = props;
    return (
        <div className="w-full rounded-md flex justify-end">
            <div className="border rounded-lg min-w-[70%] max-w-[80%] p-3 bg-gradient-to-r from-[#2347E2] to-[#0BA6F7] mr-[4%]">
              <p className="text-white">{query}</p>
            </div>
          </div>
    )
}