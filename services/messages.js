const Message = {
    user:"",
    message:""
}
let Messages= []

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
  

