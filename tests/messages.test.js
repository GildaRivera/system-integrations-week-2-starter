const Message = require('../services/messages');

test('addMessage should add new message', () => {
  Message.addMessage( {user: "user1", message: "m1" });
  expect(Message.getMessage().length).toBe(1);
});

test('getMessage should return an array', () => {
    Message.addMessage( {user: "user1", message: "m1" });
    Message.addMessage( {user: "user1", message: "m1" });
    let arr=Message.getMessage()
   expect(arr.length).toBeGreaterThan(1)
 });
 test('deleteMessage should return a smaller array', () => {
    Message.addMessage( {user: "user1", message: "m1" });
    Message.addMessage( {user: "user1", message: "m1" });
    Message.addMessage( {user: "user1", message: "m1" });
    Message.deleteMessage()
    let arr=Message.getMessage()
   expect(arr.length).toBe(0);
 })