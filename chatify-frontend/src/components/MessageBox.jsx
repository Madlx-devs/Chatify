
function MessageBox({message}) {
  return (

    <div className='w-auto h-auto border-2px border-blue-400' >
      {
        message.map((msg,index)=>( 
          <li key={index}>{msg.message}</li>
        ))
      }
    </div>
  )
}

export default MessageBox