module.exports = {
  "name":"ping",
  "description": "PONG!",
  "usage": "",
  "run": function(ctx) {
    ctx.panes.output.add('Pong!')
  }
}
