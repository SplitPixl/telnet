const chalk = require('chalk')
const cat = [
  '  █         █ ',
  ' █ █       █ █',
  ' █  ███████  █',
  ' █           █',
  ' █           █',
  '  █         █ ',
  '   █████████  '
].join('\r\n')

module.exports = {
  "name":"cat",
  "description": "Draws a cat!",
  "usage": "",
  "run": function(ctx) {
    ctx.socket.write(cat + '\r\n')
  }
}
