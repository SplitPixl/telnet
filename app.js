const blessed = require('blessed');
const telnet = require('telnet2');

let commands
require('./loader.js')(cmds => {
  commands = cmds
  console.log(`Telnet server started on :${''}\r\nLoaded ${Object.keys(commands).length} commands.`)
})

telnet({ tty: true }, function(client) {
  client.on('term', function(terminal) {
    screen.terminal = terminal;
    screen.render();
  });

  client.on('size', function(width, height) {
    client.columns = width;
    client.rows = height;
    client.emit('resize');
  });

  let screen = blessed.screen({
    smartCSR: true,
    input: client,
    output: client,
    terminal: 'xterm-256color',
    fullUnicode: true
  });

  client.on('close', function() {
    if (!screen.destroyed) {
      screen.destroy();
    }
  });

  let output = new blessed.log({
    screen: screen,
    top: 0,
    left: 0,
    width: '100%',
    bottom: 2,
    scrollOnInput: true
  })
  screen.append(output);

  screen.append(new blessed.box({
    screen: screen,
    height: 1,
    bottom: 1,
    left: 0,
    width: '100%',
    type: 'line',
    ch: '='
  }));

  let input = new blessed.textbox({
    screen: screen,
    bottom: 0,
    height: 1,
    width: '100%',
    inputOnFocus: true
  });
  screen.append(input);
  input.focus();

  output.setContent('Hello!')
  output.add(blessed.helpers.parseTags('Type {bold}help{/bold} to see commands.'))

  // Quit on Escape or Control-C.
  screen.key(['escape', 'C-c'], function(ch, key) {
    screen.destroy();
    client.end()
  });

  let panes = {
    output: output,
    input: input
  }

  input.on('submit', function(line) {
    output.add(line)
    command(client, screen, panes, line)
    input.clearValue();
    if (!input.focused) {
//      input.focus();
    }
  });

  let welcome = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: 'shrink',
    height: 'shrink',
    content: blessed.helpers.parseTags('{cyan-bg}{black-fg}▒ Welcome to Splixl\'s Telnet Thing! ▒{/black-fg}{/cyan-bg}'),
    border: {
      type: 'line'
    },
  })

  screen.render();

  setTimeout(() => {
    welcome.destroy()
    screen.render()
  }, 2000)

}).listen(2323);

function command(client, screen, panes, line) {
	let ctx = {
    client: client,
    screen: screen,
    panes: panes,
    input: line,
    args: line.split(' ')
  }

  if (ctx.screen.awaitFn) {
    ctx.screen.awaitFn(ctx)
  } else {
    if (Object.keys(commands).includes(ctx.args[0].toLowerCase())) {
      commands[ctx.args[0].toLowerCase()].run(ctx)
    } else {
      ctx.panes.output.add(blessed.helpers.parseTags(`{red-fg}Command {bold}${ctx.args[0]}{/bold} not found.{/red-fg}`))
      ctx.panes.output.add(' ')
      ctx.panes.input.focus()

    }
  }
}
