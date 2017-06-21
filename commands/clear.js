module.exports = {
  "name":"clear",
  "description": "Clear the screen.",
  "usage": "",
  "run": function(ctx) {
    ctx.panes.output.setContent('')
    ctx.panes.input.focus()
  }
}
