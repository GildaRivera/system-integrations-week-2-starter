const User = {
    id: 0,
    name:""
}
const Users = []
let counter=0
exports.addUser = (user) =>{

   Users.push(user)
   counter=counter+1
}

exports.deleteUser = id =>{
    let user = searchUser(id);
    if (!user) {
        return null
      }
      let index = searchUserIndex(id)
      Users.splice(index, 1);
      return Users
}
exports.getUser=()=>{
  return Users
}
  
const searchUser = (id) => {
    let user = Users.find((element) => element.id == id);
    return user;
  };

  const searchUserIndex = (id) => {
    let i=0
    let u= Users.find((element,index) =>
     {  if(element.id == id){
        i=index
        return true
    }
    });
    return i
  };