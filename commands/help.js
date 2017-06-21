const blessed = require('blessed');
let commands
require('../loader.js')(cmds => {
  commands = cmds
})

module.exports = {
  "name":"help",
  "description": "Show this message",
  "usage": "[command]",
  "run": function(ctx) {
    let outline = blessed.box({
      parent: ctx.screen,
      top: 'center',
      left: 'center',
      width: '100%',
      height: '100%',
    })
    let help = blessed.table({
      parent: outline,
      top: 3,
      left: 'center',
      data: null,
      border: 'line',
      align: 'center',
      tags: true,
      width: '90%',
      style: {
        border: {
          fg: 'yellow'
        },
        header: {
          fg: 'blue',
          bold: true
        },
        cell: {
          fg: 'white'
        }
      }
    })
    var ok = blessed.button({
      parent: outline,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 'center',
      bottom: 1,
      shrink: true,
      name: 'ok',
      content: 'ok',
      style: {
        bg: 'blue',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    });

    let helptable = [['Command', 'Args', 'Description']]
    Object.keys(commands).forEach((name) => {
      let command = commands[name]
      let cmd = [name, command.usage, command.description]
      helptable.push(cmd)
    })
    help.setData(helptable)

    ok.focus()

    ok.on('press', () => {
      outline.destroy()
      ctx.screen.render()
      ctx.panes.input.focus()
    })
  }
}
