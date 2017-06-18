const fs = require('fs');

module.exports = function(callback) {
  let totals = 0;
  let commandDB = {}
  fs.readdir("./commands", function(err, files) {
    if (err && !files) {
      throw new Error("Files are in invalid state: Make sure that the `commands` directory exists and that it contains command files.")
    } else {
      files.forEach(function(file) {
        if (file.endsWith(".js")) {
          let content = require(`./commands/${file}`);
          totals++
          commandDB[content.name] = content
        } else {
          console.log(`Skipping non-command entity ${file}.`)
        }
      });
      callback(commandDB);
    }
  })
}

// Credit to @LivingAutoMode
