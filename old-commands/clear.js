const exec = require('child_process').exec

module.exports = {
  "name":"clear",
  "description": "Clear the screen",
  "usage": "",
  "run": function(ctx) {
    exec('clear', (err, stdout, stderr) => {
      ctx.socket.write(stdout)
      ctx.socket.write('>>> ');
    })
  }
}
