const net = require('net');
const chalk = require('chalk');
const config = require('./config.json');
const exec = require('child_process').exec
let commands
require('./loader.js')(cmds => {
  commands = cmds
  console.log(`Telnet server started on :${config.port}\r\nLoaded ${Object.keys(commands).length} commands.`)
})

function command(socket, data) {
  socket.cmdcount++
	let ctx = {
    data: data,
    cmd: {
      raw: data,
      clean: data.toString().replace(/(\r\n|\n|\r)/gm,""),
      args:  data.toString().replace(/(\r\n|\n|\r)/gm,"").split(' ')
    },
    socket: socket
  }

  if (ctx.socket.awaitFn) {
    ctx.socket.awaitFn(ctx)
  } else {
    if (Object.keys(commands).includes(ctx.cmd.args[0].toLowerCase())) {
      commands[ctx.cmd.args[0].toLowerCase()].run(ctx)
    } else if (!Object.keys(commands).includes(ctx.cmd.args[0].toLowerCase()) && socket.cmdcount > 1) {
      socket.write(chalk.red('Command not found.\r\n'))
    } else {
      return ;
    }
    if (!ctx.socket.awaitFn) {
      try {
        ctx.socket.write('>>> ')
      } catch(err) {}
    }
  }
}

function newSocket(socket) {
  socket.cmdcount = 0
  socket.ip = socket.address().address
  console.log(`New connection from ${socket.ip}`)
  exec('clear', (err, stdout, stderr) => {
    socket.write(stdout)
    socket.write([`${chalk.cyan(' ▒')}${chalk.bgCyan.black(' Welcome to Splixl\'s Telnet Thing! ')}${chalk.cyan('▒ ')}`,
                  ` ${chalk.yellow('This assumes you use a 80 x 24 term.')}`,
                  `      Try ${chalk.green('help')} to see commands.`,
                  `>>> `].join('\r\n'));
  })
/*
 ▒ Welcome to Splixl's Telnet Thing! ▒
 This assumes you us e a 80 x 24 term.
      Try help to see commands.
*/
	socket.on('data', (data) => {
		command(socket, data);
	})
  socket.on('close',() => {
    console.log(`Connection from ${socket.ip} closed.`)
  })
  socket.on("error", (err) => {
    console.log(`Socket error:\n${err.stack}`)
  })
}

// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);

// Listen on port 8888
server.listen(config.port);
