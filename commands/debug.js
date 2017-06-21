const util = require('util');

module.exports = {
  "name":"debug",
  "description": "beep boop",
  "usage": "",
  "run": function(ctx) {
    ctx.screen.awaitFn = function (ctx2) {
      ctx2.panes.output.add(`You said: ${ctx2.input}`)
      delete ctx.screen.awaitFn
      ctx.panes.input.focus()
    }
    ctx.panes.output.add('Henlo! Please write somthing...')
    ctx.panes.input.focus()
  }
}
