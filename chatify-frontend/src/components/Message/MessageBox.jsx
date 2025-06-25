import SendChat from "./SendChat"
function MessageBox({message,roomId}) {
  return (
    <div className=" border-blue-400 mb-4 flex-grow">
  <div className="space-y-3 flex-grow">
    {message.map((msg, index) => (
      <div key={index} className="flex items-start gap-2">
        <div id="profile" className="bg-blue-400 w-8 h-8 rounded-full flex-shrink-0"></div>
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg max-w-xs break-words">
          {msg.message}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-4">
    <SendChat roomId={roomId} />
  </div>
</div>

  )
}

export default MessageBox