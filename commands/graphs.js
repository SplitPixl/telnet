const blessed = require('blessed')
const contrib = require('blessed-contrib')

module.exports = {
  "name":"graphs",
  "description": "Show some random graphs!",
  "usage": "",
  "run": function(ctx) {
    var line = contrib.line({
      style:{
        line: "yellow",
        text: "green",
        baseline: "black"
      },
      xLabelPadding: 3,
      xPadding: 5,
      showLegend: true,
      wholeNumbersOnly: false,
      label: 'Graphs!'
    })
    let series1 = {
      title: 'dataset one',
      x: ['t1', 't2', 't3', 't4'],
      y: [getRandom(0, 10), getRandom(0, 10), getRandom(0, 10), getRandom(0, 10)],
      style: {line: 'yellow'}
    }
    let series2 = {
      title: 'dataset two',
      x: ['t1', 't2', 't3', 't4'],
      y: [getRandom(0, 10), getRandom(0, 10), getRandom(0, 10), getRandom(0, 10)],
      style: {line: 'blue'}
    }
    ctx.screen.append(line) //must append before setting data
    line.setData([series1, series2])
    ctx.screen.render()
    let random = setInterval(() => {
      let serie1 = {
        title: 'dataset one',
        x: ['t1', 't2', 't3', 't4'],
        y: [getRandom(0, 10), getRandom(0, 10), getRandom(0, 10), getRandom(0, 10)],
        style: {line: 'yellow'}
      }
      let serie2 = {
        title: 'dataset two',
        x: ['t1', 't2', 't3', 't4'],
        y: [getRandom(0, 10), getRandom(0, 10), getRandom(0, 10), getRandom(0, 10)],
        style: {line: 'blue'}
      }
      ctx.screen.append(line) //must append before setting data
      line.setData([serie1, serie2])
      ctx.screen.render()
    }, 2500)

    var ok = blessed.button({
      parent: line,
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
      name: 'quit',
      content: 'quit',
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
      line.destroy()
      ok.destroy()
      clearInterval(random)
      ctx.screen.render()
      ctx.panes.input.focus()
    })
  }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
