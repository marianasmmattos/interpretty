const { Format } = require('./format')

class Translator {
  constructor(current, formatter = new Format()) {
    this.current = current
    this.formatter = formatter
  }

  parse() {
    if(!!this.current['expression']) {
      return this.formatter.translateFile(this.current)
    }

    return this.translate()
  }

  transformFile() {
    return translateFile(this.current)
  }

  translate() {
    return this.formatter.execute(this.current)
  }
}

module.exports = { Translator }