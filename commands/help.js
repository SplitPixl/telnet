let commands
require('../loader.js')(cmds => {
  commands = cmds
})

module.exports = {
  "name":"help",
  "description": "Show this message",
  "usage": "[command]",
  "run": function(ctx) {
    if(ctx.cmd.args[1]) {

    } else {
      let message = ['List of Commands:']
      Object.keys(commands).forEach(label => {
        let command = commands[label]
        message.push(`┌${command.name} ${command.usage}\r\n│${command.description}\r\n└${'─'.repeat(command.name.length)}`)
      })
      ctx.socket.write(message.join('\r\n') + '\r\n')
    }
  }
}
