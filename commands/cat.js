const chalk = require('chalk')
const cat = [
  '  █         █ ',
  ' █ █       █ █',
  ' █  ███████  █',
  ' █           █',
  ' █           █',
  '  █         █ ',
  '   █████████  '
]

module.exports = {
  "name":"cat",
  "description": "Draws a cat!",
  "usage": "",
  "run": function(ctx) {
    cat.forEach(line => {
      ctx.panes.output.add(line)
    })
    ctx.panes.input.focus()
  }
}
