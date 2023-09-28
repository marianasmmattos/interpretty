const {
  TOKEN_MAP,
  translateFile
} = require('./rinha')

class Translator {
  constructor(current) {
    this.current = current
  }

  parse() {
    if(!!this.current['expression']) {
      return this.transformFile(this.current)
    }

    return this.translate()
  }

  transformFile() {
    return translateFile(this.current)
  }

  translate() {
    const translator = TOKEN_MAP[this.current.kind]
    const translated = translator(this.current)

    return translated
  }
}

module.exports = { Translator }