const Message = {
    user:"",
    message:""
}
const Messages= []

exports.addMessage = (message) =>{

   Messages.push(message)
}

exports.deleteMessage = () =>{
Messages=[]
      return Messages
}
exports.getMessage=()=>{
  return Messages
}
  

