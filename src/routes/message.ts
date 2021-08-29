const router_message = require("express").Router();

router_message.route("/:channelId/messages")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})

router_message.route("/:channelId/messages/:messageId")
  .get(() => {console.log("げっとうえー")})
  .patch(() => {console.log("ぱっちうえー")})
  .delete(() => {console.log("でりーとうえー")})

module.exports = router_message;