module.exports = {
  "name":"exit",
  "description": "leave I guess",
  "usage": "",
  "run": function(ctx) {
    ctx.socket.end('Bye!\r\n')
  }
}
