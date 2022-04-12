const User = require('../services/users');
describe('user test',()=>{


test('addUser should add new user', () => {
   User.addUser( {id: 1, name: "name" });
  expect(User.getUser().length).toBe(1);
});

test('getUser should return an array', () => {
    User.addUser( {id: 1, name: "name" });
    User.addUser( {id: 2, name: "name" });
    let arr=User.getUser();
   expect(arr.length).toBeGreaterThan(1)
 });


 test('deleteUser should return a smaller array', () => {
    User.addUser( {id: 1, name: "name" });
    User.addUser( {id: 2, name: "name" });
    User.addUser( {id: 3, name: "name" });
    User.deleteUser()
    let arr=User.getUser();
   expect(arr.length).toBe(6);
 })
})