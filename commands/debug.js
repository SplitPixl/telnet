const util = require('util');

module.exports = {
  "name":"debuk",
  "description": "beep boop",
  "usage": "",
  "run": function(ctx) {
    ctx.socket.awaitFn = function (ctx2) {
      ctx2.socket.write(`You said: ${ctx2.cmd.clean}\r\n>>> `)
      delete ctx.socket.awaitFn

    }
    ctx.socket.write('Henlo! Please write somthing...\r\n>> ')

  }
}
