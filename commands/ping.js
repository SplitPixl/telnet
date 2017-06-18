module.exports = {
  "name":"ping",
  "description": "PONG!",
  "usage": "",
  "run": function(ctx) {
    ctx.socket.write('Pong!\r\n')
  }
}
