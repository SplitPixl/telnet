const blessed = require('blessed');
const quotes = ['no u', 'don\'t leave me', 'y', 'come back soon!', 'please']

module.exports = {
  "name":"overlay",
  "description": "Tests out an overlay box",
  "usage": "",
  "run": function(ctx) {
    let form = blessed.form({
      parent: ctx.screen,
      shadow: true,
      left: 'center',
      top: 'center',
      width: '90%',
      height: '90%',
      style: {
        bg: 'green',
      },
      border: 'line',
      content: 'yes?'
    })

    var ok = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      right: 2,
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

    var cancel = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      right: 'ok'.length + 6,
      bottom: 1,
      shrink: true,
      name: 'cancel',
      content: 'cancel',
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

    ok.focus()

    ok.on('press', () => {
      form.destroy()
      ctx.screen.render()
      ctx.panes.input.focus()
    })

    cancel.on('press', () => {
      let rand = quotes[Math.floor(Math.random()*quotes.length)];
      form.content = (rand)
      ctx.screen.render()
    })
  }
}
