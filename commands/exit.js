module.exports = {
  "name":"exit",
  "description": "Leave the session",
  "usage": "",
  "run": function(ctx) {
    ctx.screen.destroy()
    ctx.client.end()
  }
}
